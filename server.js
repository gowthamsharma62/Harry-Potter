const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const videoUploadsDir = path.join(__dirname, 'uploads', 'videos');
const dataDir = path.join(__dirname, 'data');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(videoUploadsDir)) fs.mkdirSync(videoUploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Metadata file paths
const metadataPath = path.join(dataDir, 'images.json');
const videoMetadataPath = path.join(dataDir, 'videos.json');

// Initialize metadata files if not exists
if (!fs.existsSync(metadataPath)) {
  fs.writeFileSync(metadataPath, JSON.stringify([], null, 2));
}

if (!fs.existsSync(videoMetadataPath)) {
  fs.writeFileSync(videoMetadataPath, JSON.stringify([], null, 2));
}

// Storage limit: 1GB
const STORAGE_LIMIT = 1 * 1024 * 1024 * 1024; // 1GB in bytes

// Helper functions for image metadata
function readMetadata() {
  try {
    const data = fs.readFileSync(metadataPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMetadata(data) {
  fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));
}

// Helper functions for video metadata
function readVideoMetadata() {
  try {
    const data = fs.readFileSync(videoMetadataPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeVideoMetadata(data) {
  fs.writeFileSync(videoMetadataPath, JSON.stringify(data, null, 2));
}

// Calculate total storage used by local uploads
function calculateStorageUsed() {
  try {
    const files = fs.readdirSync(uploadsDir);
    let totalSize = 0;
    
    for (const file of files) {
      if (file === '.gitkeep') continue;
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        totalSize += stats.size;
      }
    }
    
    return totalSize;
  } catch {
    return 0;
  }
}

// Get storage info
function getStorageInfo() {
  const used = calculateStorageUsed();
  return {
    used,
    limit: STORAGE_LIMIT,
    available: STORAGE_LIMIT - used,
    usedPercentage: ((used / STORAGE_LIMIT) * 100).toFixed(2)
  };
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for allowed formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, and WEBP formats are allowed!'), false);
  }
};

// File size limit: 10MB per file (no limit on number of files)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Multiple files upload handler
const uploadMultiple = upload.array('images');

// Video storage configuration
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoUploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// Video file filter for allowed formats
const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only MP4, WebM, and OGG video formats are allowed!'), false);
  }
};

// Video upload: 100MB per file limit
const videoUpload = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
});

// Multiple video files upload handler
const uploadMultipleVideos = videoUpload.array('videos');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadsDir));
app.use('/uploads/videos', express.static(videoUploadsDir));

// API Routes

// Get all images
app.get('/api/images', (req, res) => {
  const images = readMetadata();
  const sortBy = req.query.sort || 'date';
  const order = req.query.order || 'desc';

  images.sort((a, b) => {
    if (sortBy === 'size') {
      return order === 'desc' ? b.fileSize - a.fileSize : a.fileSize - b.fileSize;
    } else {
      return order === 'desc' 
        ? new Date(b.uploadedAt) - new Date(a.uploadedAt)
        : new Date(a.uploadedAt) - new Date(b.uploadedAt);
    }
  });

  res.json(images);
});

// Get storage info endpoint
app.get('/api/storage', (req, res) => {
  res.json(getStorageInfo());
});

// Upload multiple image files
app.post('/api/upload', (req, res) => {
  // First check storage before accepting files
  const storageInfo = getStorageInfo();
  
  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'One or more files exceed the 10MB limit!' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }
    
    // Calculate total size of uploaded files
    const totalUploadSize = req.files.reduce((sum, file) => sum + file.size, 0);
    
    // Check if this upload would exceed the storage limit
    if (storageInfo.used + totalUploadSize > STORAGE_LIMIT) {
      // Delete the uploaded files since they exceed the limit
      req.files.forEach(file => {
        const filePath = path.join(uploadsDir, file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      
      const availableMB = (storageInfo.available / (1024 * 1024)).toFixed(2);
      const uploadSizeMB = (totalUploadSize / (1024 * 1024)).toFixed(2);
      return res.status(400).json({ 
        error: `Upload would exceed 1GB storage limit! Available: ${availableMB}MB, Upload size: ${uploadSizeMB}MB`,
        storageInfo: getStorageInfo()
      });
    }
    
    // Process all uploaded files
    const uploadedImages = [];
    const images = readMetadata();
    
    req.files.forEach(file => {
      const imageData = {
        id: uuidv4(),
        fileName: file.originalname,
        storedName: file.filename,
        fileSize: file.size,
        mimeType: file.mimetype,
        uploadedAt: new Date().toISOString(),
        source: 'upload',
        url: `/uploads/${file.filename}`
      };
      
      images.push(imageData);
      uploadedImages.push(imageData);
    });
    
    writeMetadata(images);
    
    res.json({ 
      success: true, 
      images: uploadedImages,
      count: uploadedImages.length,
      storageInfo: getStorageInfo()
    });
  });
});

// Add image from URL
app.post('/api/add-url', async (req, res) => {
  const { url, fileName } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const imageData = {
    id: uuidv4(),
    fileName: fileName || `Image from ${new URL(url).hostname}`,
    storedName: null,
    fileSize: 0,
    mimeType: 'image/jpeg',
    uploadedAt: new Date().toISOString(),
    source: url.includes('unsplash') ? 'unsplash' : 'external',
    url: url,
    isExternal: true
  };

  const images = readMetadata();
  images.push(imageData);
  writeMetadata(images);

  res.json({ success: true, image: imageData });
});

// Delete image
app.delete('/api/images/:id', (req, res) => {
  const { id } = req.params;
  let images = readMetadata();
  const image = images.find(img => img.id === id);

  if (!image) {
    return res.status(404).json({ error: 'Image not found' });
  }

  // Delete file if it's a local upload
  if (image.storedName) {
    const filePath = path.join(uploadsDir, image.storedName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  images = images.filter(img => img.id !== id);
  writeMetadata(images);

  res.json({ success: true });
});

// ============================================
// VIDEO API ROUTES
// ============================================

// Get all videos
app.get('/api/videos', (req, res) => {
  const videos = readVideoMetadata();
  const order = req.query.order || 'desc';

  videos.sort((a, b) => {
    return order === 'desc' 
      ? new Date(b.uploadedAt) - new Date(a.uploadedAt)
      : new Date(a.uploadedAt) - new Date(b.uploadedAt);
  });

  res.json(videos);
});

// Upload multiple video files
app.post('/api/videos/upload', (req, res) => {
  uploadMultipleVideos(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'One or more videos exceed the 100MB limit!' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No video files provided' });
    }
    
    // Process all uploaded videos
    const uploadedVideos = [];
    const videos = readVideoMetadata();
    
    req.files.forEach(file => {
      const videoData = {
        id: uuidv4(),
        fileName: file.originalname,
        storedName: file.filename,
        fileSize: file.size,
        mimeType: file.mimetype,
        uploadedAt: new Date().toISOString(),
        url: `/uploads/videos/${file.filename}`
      };
      
      videos.push(videoData);
      uploadedVideos.push(videoData);
    });
    
    writeVideoMetadata(videos);
    
    res.json({ 
      success: true, 
      videos: uploadedVideos,
      count: uploadedVideos.length
    });
  });
});

// Delete video
app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  let videos = readVideoMetadata();
  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  // Delete video file
  if (video.storedName) {
    const filePath = path.join(videoUploadsDir, video.storedName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  videos = videos.filter(v => v.id !== id);
  writeVideoMetadata(videos);

  res.json({ success: true });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'One or more files exceed the 10MB limit per file!' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field' });
    }
  }
  console.error('Server error:', error);
  res.status(500).json({ error: error.message });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✨ Magical Gallery Server running at http://localhost:${PORT}`);
  console.log(`🏰 Welcome to Hogwarts Image Archive!\n`);
});


