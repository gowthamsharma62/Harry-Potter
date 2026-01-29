/**
 * Hogwarts Magical Gallery - Main Application
 * A Harry Potter-themed image gallery with magical effects
 */

// ============================================
// Application State
// ============================================

const state = {
  images: [],
  currentImageIndex: 0,
  videos: [],
  currentVideoIndex: 0,
  effects: {
    rain: true,
    particles: true,
    candles: true,
    glow: true,
    animations: true,
    night: false,
    storm: true
  },
  music: {
    isPlaying: false,
    hasInteracted: false
  }
};

// ============================================
// DOM Elements
// ============================================

const elements = {
  // Navigation
  navLinks: document.querySelectorAll('.nav-link'),
  navbarToggle: document.querySelector('.navbar-toggle'),
  navbarMenu: document.querySelector('.navbar-menu'),
  
  // Sections
  sections: document.querySelectorAll('.section'),
  
  // Gallery
  galleryGrid: document.getElementById('gallery-grid'),
  galleryEmpty: document.getElementById('gallery-empty'),
  galleryLoading: document.getElementById('gallery-loading'),
  sortSelect: document.getElementById('sortSelect'),
  imageCount: document.getElementById('imageCount'),
  
  // Upload
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('fileInput'),
  uploadPreview: document.getElementById('uploadPreview'),
  previewGrid: document.getElementById('previewGrid'),
  previewCount: document.getElementById('previewCount'),
  previewTotalSize: document.getElementById('previewTotalSize'),
  clearPreview: document.getElementById('clearPreview'),
  uploadBtn: document.getElementById('uploadBtn'),
  storageInfo: document.getElementById('storageInfo'),
  storageUsed: document.getElementById('storageUsed'),
  storageUsedText: document.getElementById('storageUsedText'),
  imageUrl: document.getElementById('imageUrl'),
  imageName: document.getElementById('imageName'),
  addUrlBtn: document.getElementById('addUrlBtn'),
  uploadStatus: document.getElementById('uploadStatus'),
  
  // Lightbox
  lightbox: document.getElementById('lightbox'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxTitle: document.getElementById('lightboxTitle'),
  lightboxDate: document.getElementById('lightboxDate'),
  lightboxSize: document.getElementById('lightboxSize'),
  lightboxSource: document.getElementById('lightboxSource'),
  lightboxClose: document.querySelector('.lightbox-close'),
  lightboxPrev: document.querySelector('.lightbox-prev'),
  lightboxNext: document.querySelector('.lightbox-next'),
  lightboxLoading: document.querySelector('.lightbox-loading'),
  
  // Effects containers
  rainContainer: document.getElementById('rain-container'),
  particlesContainer: document.getElementById('particles-container'),
  candlesContainer: document.getElementById('candles-container'),
  stormContainer: document.getElementById('storm-container'),
  
  // Effect toggles
  toggleRain: document.getElementById('toggleRain'),
  toggleParticles: document.getElementById('toggleParticles'),
  toggleCandles: document.getElementById('toggleCandles'),
  toggleGlow: document.getElementById('toggleGlow'),
  toggleAnimations: document.getElementById('toggleAnimations'),
  toggleNight: document.getElementById('toggleNight'),
  toggleStorm: document.getElementById('toggleStorm'),
  
  // Toast
  toastContainer: document.getElementById('toastContainer'),
  
  // Music
  bgMusic: document.getElementById('bgMusic'),
  musicToggle: document.getElementById('musicToggle'),
  
  // Video Gallery
  videoGalleryGrid: document.getElementById('video-gallery-grid'),
  videoGalleryEmpty: document.getElementById('video-gallery-empty'),
  videoGalleryLoading: document.getElementById('video-gallery-loading'),
  videoCount: document.getElementById('videoCount'),
  
  // Video Upload
  videoDropzone: document.getElementById('videoDropzone'),
  videoFileInput: document.getElementById('videoFileInput'),
  videoUploadPreview: document.getElementById('videoUploadPreview'),
  videoPreviewGrid: document.getElementById('videoPreviewGrid'),
  videoPreviewCount: document.getElementById('videoPreviewCount'),
  videoPreviewTotalSize: document.getElementById('videoPreviewTotalSize'),
  clearVideoPreview: document.getElementById('clearVideoPreview'),
  videoUploadBtn: document.getElementById('videoUploadBtn'),
  videoUploadStatus: document.getElementById('videoUploadStatus'),
  
  // Video Lightbox
  videoLightbox: document.getElementById('videoLightbox'),
  fullscreenVideo: document.getElementById('fullscreenVideo'),
  videoLightboxTitle: document.getElementById('videoLightboxTitle'),
  videoLightboxDate: document.getElementById('videoLightboxDate'),
  videoLightboxSize: document.getElementById('videoLightboxSize'),
  videoLightboxClose: document.querySelector('.video-lightbox-close'),
  videoLightboxOverlay: document.querySelector('.video-lightbox-overlay')
};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initUpload();
  initLightbox();
  initEffects();
  loadImages();
  initParticles();
  initCandles();
  initLightningStorm();
  initBackgroundMusic();
  initBackgroundVideo();
  initWandSparkles();
  
  // Video Gallery
  initVideoUpload();
  initVideoLightbox();
  loadVideos();
  
  // Load saved effect preferences
  loadEffectPreferences();
  
  // Handle URL hash navigation
  handleHashNavigation();
});

// ============================================
// Wand Cursor Sparkle Effect
// ============================================

function initWandSparkles() {
  document.addEventListener('click', createSparkle);
}

function createSparkle(e) {
  const colors = ['#d4af37', '#ffd700', '#fff8dc', '#f4d03f', '#ffffff'];
  const sparkleCount = 8;
  
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'wand-sparkle';
    
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / sparkleCount;
    const velocity = Math.random() * 60 + 30;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    sparkle.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      box-shadow: 0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color};
      animation: sparkle-burst 0.6s ease-out forwards;
      --tx: ${tx}px;
      --ty: ${ty}px;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 600);
  }
}

// ============================================
// Background Video (Home Page Only)
// ============================================

function initBackgroundVideo() {
  const video = document.getElementById('bgVideo');
  if (!video) {
    console.log('Video element not found');
    return;
  }
  
  console.log('Initializing background video...');
  
  // Ensure video attributes are set
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.autoplay = true;
  video.preload = 'auto';
  
  // Force load the video
  video.load();
  
  // Try to play video
  const playVideo = () => {
    const homeSection = document.getElementById('home');
    if (homeSection && homeSection.classList.contains('active')) {
      video.play().then(() => {
        console.log('🎬 Background video playing successfully');
      }).catch((error) => {
        console.log('Video autoplay blocked:', error.message);
      });
    }
  };
  
  // Play when video is ready
  video.addEventListener('canplay', () => {
    console.log('Video can play');
    playVideo();
  });
  
  video.addEventListener('loadeddata', () => {
    console.log('Video data loaded');
    playVideo();
  });
  
  video.addEventListener('error', (e) => {
    console.error('Video error:', e);
  });
  
  // Play on user interaction (for browsers that block autoplay)
  const playOnInteraction = () => {
    const homeSection = document.getElementById('home');
    if (homeSection && homeSection.classList.contains('active')) {
      video.play().catch(() => {});
    }
  };
  
  document.addEventListener('click', playOnInteraction, { once: true });
  document.addEventListener('touchstart', playOnInteraction, { once: true });
  document.addEventListener('scroll', playOnInteraction, { once: true });
  
  // Attempt immediate play
  setTimeout(playVideo, 500);
  
  // Restart if ended (backup for loop)
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });
  
  // Store reference for navigation control
  window.bgVideo = video;
}

// Control video based on active section
function updateVideoPlayback(sectionId) {
  const video = window.bgVideo || document.getElementById('bgVideo');
  if (!video) return;
  
  if (sectionId === 'home') {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

// ============================================
// Navigation
// ============================================

function initNavigation() {
  // Nav link clicks
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      navigateToSection(section);
      
      // Close mobile menu
      elements.navbarMenu.classList.remove('active');
      elements.navbarToggle.classList.remove('active');
    });
  });
  
  // Hero and other section buttons
  document.querySelectorAll('[data-section]').forEach(btn => {
    if (!btn.classList.contains('nav-link')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const section = btn.dataset.section;
        navigateToSection(section);
      });
    }
  });
  
  // Mobile menu toggle
  elements.navbarToggle.addEventListener('click', () => {
    elements.navbarToggle.classList.toggle('active');
    elements.navbarMenu.classList.toggle('active');
  });
  
  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      elements.navbarMenu.classList.remove('active');
      elements.navbarToggle.classList.remove('active');
    }
  });
}

function navigateToSection(sectionId) {
  // Update nav links
  elements.navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
  
  // Update sections
  elements.sections.forEach(section => {
    section.classList.toggle('active', section.id === sectionId);
  });
  
  // Show candles only on home page
  if (sectionId === 'home') {
    elements.candlesContainer.classList.remove('candles-hidden');
  } else {
    elements.candlesContainer.classList.add('candles-hidden');
  }
  
  // Control video playback - only play on home page
  updateVideoPlayback(sectionId);
  
  // Handle video gallery auto-play
  if (sectionId === 'videos') {
    startVideoGalleryAutoplay();
  } else {
    stopVideoGalleryAutoplay();
  }
  
  // Update URL hash
  history.pushState(null, null, `#${sectionId}`);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make navigateToSection available globally for onclick handlers
window.navigateToSection = navigateToSection;

function handleHashNavigation() {
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    navigateToSection(hash);
  } else {
    // Default to home - ensure candles are visible
    elements.candlesContainer.classList.remove('candles-hidden');
  }
  
  // Handle back/forward navigation
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1) || 'home';
    navigateToSection(hash);
  });
}

// ============================================
// Image Gallery
// ============================================

async function loadImages() {
  elements.galleryLoading.classList.remove('hidden');
  elements.galleryGrid.innerHTML = '';
  elements.galleryEmpty.classList.add('hidden');
  
  try {
    const sortValue = elements.sortSelect.value;
    const [sortBy, order] = sortValue.split('-');
    
    const response = await fetch(`/api/images?sort=${sortBy}&order=${order}`);
    const images = await response.json();
    
    state.images = images;
    elements.galleryLoading.classList.add('hidden');
    
    if (images.length === 0) {
      elements.galleryEmpty.classList.remove('hidden');
      elements.imageCount.textContent = '0';
      return;
    }
    
    elements.imageCount.textContent = images.length;
    renderGallery(images);
    
  } catch (error) {
    console.error('Failed to load images:', error);
    elements.galleryLoading.classList.add('hidden');
    showToast('Failed to summon images from the archive', 'error');
  }
}

function renderGallery(images) {
  elements.galleryGrid.innerHTML = '';
  
  images.forEach((image, index) => {
    const card = createGalleryCard(image, index);
    elements.galleryGrid.appendChild(card);
  });
}

function createGalleryCard(image, index) {
  const card = document.createElement('div');
  card.className = 'gallery-card loading';
  card.dataset.index = index;
  
  const formattedDate = formatMagicalDate(image.uploadedAt);
  const formattedSize = formatFileSize(image.fileSize);
  
  card.innerHTML = `
    <img 
      class="gallery-card-image lazy" 
      data-src="${image.url}" 
      alt="${image.fileName}"
      loading="lazy"
    >
    <div class="gallery-card-overlay">
      <h3 class="gallery-card-title">${image.fileName}</h3>
      <div class="gallery-card-meta">
        <span>🕐 ${formattedDate}</span>
        <span>📊 ${formattedSize}</span>
      </div>
    </div>
    <button class="gallery-card-delete" data-id="${image.id}" title="Remove from archive">🗑️</button>
  `;
  
  // Lazy load image
  const img = card.querySelector('.gallery-card-image');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        img.onload = () => {
          img.classList.add('loaded');
          card.classList.remove('loading');
        };
        img.onerror = () => {
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%231a1a24" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23d4af37" font-size="30"%3E✨%3C/text%3E%3C/svg%3E';
          img.classList.add('loaded');
          card.classList.remove('loading');
        };
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  
  observer.observe(img);
  
  // Click to open lightbox
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('gallery-card-delete')) {
      openLightbox(index);
    }
  });
  
  // Delete button
  const deleteBtn = card.querySelector('.gallery-card-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteImage(image.id);
  });
  
  return card;
}

async function deleteImage(id) {
  if (!confirm('Are you sure you want to remove this image from the archive?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/images/${id}`, { method: 'DELETE' });
    const data = await response.json();
    
    if (data.success) {
      showToast('Image vanished from the archive! ✨', 'success');
      loadImages();
    } else {
      showToast(data.error || 'Failed to delete image', 'error');
    }
  } catch (error) {
    console.error('Delete failed:', error);
    showToast('The spell failed! Could not delete image.', 'error');
  }
}

// Sort change handler
elements.sortSelect.addEventListener('change', loadImages);

// ============================================
// Image Upload (Multiple Files Support)
// ============================================

let selectedFiles = [];
let storageInfo = { used: 0, limit: 1073741824, available: 1073741824, usedPercentage: 0 };

function initUpload() {
  // Fetch initial storage info
  fetchStorageInfo();
  
  // Dropzone click
  elements.dropzone.addEventListener('click', () => {
    elements.fileInput.click();
  });
  
  // File input change (multiple files)
  elements.fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) handleFilesSelection(files);
  });
  
  // Drag and drop
  elements.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.dropzone.classList.add('dragover');
  });
  
  elements.dropzone.addEventListener('dragleave', () => {
    elements.dropzone.classList.remove('dragover');
  });
  
  elements.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.dropzone.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) handleFilesSelection(files);
  });
  
  // Clear preview
  elements.clearPreview.addEventListener('click', clearFileSelection);
  
  // Upload button
  elements.uploadBtn.addEventListener('click', uploadFiles);
  
  // URL upload
  elements.addUrlBtn.addEventListener('click', addImageFromUrl);
}

// Fetch and display storage info
async function fetchStorageInfo() {
  try {
    const response = await fetch('/api/storage');
    storageInfo = await response.json();
    updateStorageDisplay();
  } catch (error) {
    console.error('Failed to fetch storage info:', error);
  }
}

function updateStorageDisplay() {
  const storageUsedEl = document.getElementById('storageUsed');
  const storageUsedTextEl = document.getElementById('storageUsedText');
  
  if (storageUsedEl && storageUsedTextEl) {
    const usedMB = (storageInfo.used / (1024 * 1024)).toFixed(2);
    const percentage = parseFloat(storageInfo.usedPercentage);
    
    storageUsedEl.style.width = `${percentage}%`;
    storageUsedTextEl.textContent = `${usedMB} MB`;
    
    // Add warning/danger classes based on usage
    storageUsedEl.classList.remove('warning', 'danger');
    if (percentage >= 90) {
      storageUsedEl.classList.add('danger');
    } else if (percentage >= 70) {
      storageUsedEl.classList.add('warning');
    }
  }
}

function handleFilesSelection(files) {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB per file
  
  let validFiles = [];
  let errors = [];
  
  files.forEach(file => {
    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid format (only JPG, PNG, WEBP allowed)`);
    } else if (file.size > maxSize) {
      errors.push(`${file.name}: Exceeds 10MB limit`);
    } else {
      validFiles.push(file);
    }
  });
  
  if (errors.length > 0) {
    showUploadStatus(errors.join('<br>'), 'error');
  }
  
  if (validFiles.length === 0) return;
  
  // Add to existing selection
  selectedFiles = [...selectedFiles, ...validFiles];
  
  // Check total size against available storage
  const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > storageInfo.available) {
    showUploadStatus(`Total selection (${formatFileSize(totalSize)}) exceeds available storage (${formatFileSize(storageInfo.available)})`, 'error');
  } else {
    hideUploadStatus();
  }
  
  updatePreviewGrid();
}

function updatePreviewGrid() {
  const previewGrid = document.getElementById('previewGrid');
  const previewCount = document.getElementById('previewCount');
  const previewTotalSize = document.getElementById('previewTotalSize');
  
  if (!previewGrid) return;
  
  previewGrid.innerHTML = '';
  
  selectedFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';
    
    const img = document.createElement('img');
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-item';
    removeBtn.innerHTML = '✕';
    removeBtn.title = `Remove ${file.name}`;
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFile(index);
    });
    
    item.appendChild(img);
    item.appendChild(removeBtn);
    item.title = `${file.name} (${formatFileSize(file.size)})`;
    previewGrid.appendChild(item);
  });
  
  // Update summary
  const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  previewCount.textContent = `${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''} selected`;
  previewTotalSize.textContent = formatFileSize(totalSize);
  
  // Show/hide preview and enable/disable upload button
  if (selectedFiles.length > 0) {
    elements.uploadPreview.classList.remove('hidden');
    elements.uploadBtn.disabled = false;
  } else {
    elements.uploadPreview.classList.add('hidden');
    elements.uploadBtn.disabled = true;
  }
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  updatePreviewGrid();
  
  if (selectedFiles.length === 0) {
    hideUploadStatus();
  }
}

function clearFileSelection() {
  selectedFiles = [];
  elements.fileInput.value = '';
  elements.uploadPreview.classList.add('hidden');
  elements.uploadBtn.disabled = true;
  hideUploadStatus();
}

async function uploadFiles() {
  if (selectedFiles.length === 0) return;
  
  const fileCount = selectedFiles.length;
  elements.uploadBtn.disabled = true;
  elements.uploadBtn.textContent = `Casting spell on ${fileCount} image${fileCount !== 1 ? 's' : ''}...`;
  
  const formData = new FormData();
  selectedFiles.forEach(file => {
    formData.append('images', file);
  });
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      const count = data.count || data.images.length;
      showUploadStatus(`✨ ${count} image${count !== 1 ? 's' : ''} successfully stored in the magical archive!`, 'success');
      showToast(`${count} new image${count !== 1 ? 's' : ''} added to the gallery!`, 'success');
      clearFileSelection();
      loadImages();
      
      // Update storage info
      if (data.storageInfo) {
        storageInfo = data.storageInfo;
        updateStorageDisplay();
      } else {
        fetchStorageInfo();
      }
    } else {
      showUploadStatus(data.error || 'Upload spell failed!', 'error');
      // Update storage info even on error
      if (data.storageInfo) {
        storageInfo = data.storageInfo;
        updateStorageDisplay();
      }
    }
  } catch (error) {
    console.error('Upload failed:', error);
    showUploadStatus('The spell backfired! Upload failed.', 'error');
  }
  
  elements.uploadBtn.disabled = false;
  elements.uploadBtn.innerHTML = '<span class="btn-glow"></span>Cast Upload Spell';
}

async function addImageFromUrl() {
  const url = elements.imageUrl.value.trim();
  const name = elements.imageName.value.trim();
  
  if (!url) {
    showUploadStatus('Please enter an image URL', 'error');
    return;
  }
  
  elements.addUrlBtn.disabled = true;
  elements.addUrlBtn.textContent = 'Summoning...';
  
  try {
    const response = await fetch('/api/add-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, fileName: name })
    });
    
    const data = await response.json();
    
    if (data.success) {
      showUploadStatus('Image summoned from the magical web! ✨', 'success');
      showToast('New image added to the gallery!', 'success');
      elements.imageUrl.value = '';
      elements.imageName.value = '';
      loadImages();
    } else {
      showUploadStatus(data.error || 'Summoning spell failed!', 'error');
    }
  } catch (error) {
    console.error('URL add failed:', error);
    showUploadStatus('Failed to summon image from URL', 'error');
  }
  
  elements.addUrlBtn.disabled = false;
  elements.addUrlBtn.innerHTML = '<span class="btn-glow"></span>Summon Image';
}

function showUploadStatus(message, type) {
  elements.uploadStatus.textContent = message;
  elements.uploadStatus.className = `upload-status ${type}`;
  elements.uploadStatus.classList.remove('hidden');
  
  if (type === 'success') {
    setTimeout(hideUploadStatus, 5000);
  }
}

function hideUploadStatus() {
  elements.uploadStatus.classList.add('hidden');
}

// ============================================
// Lightbox
// ============================================

function initLightbox() {
  // Close button
  elements.lightboxClose.addEventListener('click', closeLightbox);
  
  // Overlay click
  document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  
  // Navigation
  elements.lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  elements.lightboxNext.addEventListener('click', () => navigateLightbox(1));
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!elements.lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox(-1);
        break;
      case 'ArrowRight':
        navigateLightbox(1);
        break;
    }
  });
}

function openLightbox(index) {
  state.currentImageIndex = index;
  const image = state.images[index];
  
  if (!image) return;
  
  // Show loading
  elements.lightboxLoading.classList.remove('hidden');
  
  // Set image
  elements.lightboxImage.src = '';
  elements.lightboxImage.src = image.url;
  
  elements.lightboxImage.onload = () => {
    elements.lightboxLoading.classList.add('hidden');
  };
  
  elements.lightboxImage.onerror = () => {
    elements.lightboxLoading.classList.add('hidden');
    elements.lightboxImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231a1a24" width="400" height="300"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy=".3em" fill="%23d4af37" font-size="40"%3E✨ Image not found%3C/text%3E%3C/svg%3E';
  };
  
  // Set info
  elements.lightboxTitle.textContent = image.fileName;
  elements.lightboxDate.textContent = `🕐 ${formatMagicalDate(image.uploadedAt)}`;
  elements.lightboxSize.textContent = image.fileSize ? `📊 ${formatFileSize(image.fileSize)}` : '';
  elements.lightboxSource.textContent = `🔮 ${image.source || 'Archive'}`;
  
  // Show lightbox
  elements.lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  elements.lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  let newIndex = state.currentImageIndex + direction;
  
  if (newIndex < 0) {
    newIndex = state.images.length - 1;
  } else if (newIndex >= state.images.length) {
    newIndex = 0;
  }
  
  openLightbox(newIndex);
}

// ============================================
// Magical Effects
// ============================================

function initEffects() {
  // Rain toggle
  elements.toggleRain.addEventListener('change', (e) => {
    state.effects.rain = e.target.checked;
    elements.rainContainer.classList.toggle('rain-active', e.target.checked);
    saveEffectPreferences();
  });
  
  // Particles toggle
  elements.toggleParticles.addEventListener('change', (e) => {
    state.effects.particles = e.target.checked;
    elements.particlesContainer.style.display = e.target.checked ? 'block' : 'none';
    saveEffectPreferences();
  });
  
  // Candles toggle
  elements.toggleCandles.addEventListener('change', (e) => {
    state.effects.candles = e.target.checked;
    elements.candlesContainer.style.display = e.target.checked ? 'block' : 'none';
    saveEffectPreferences();
  });
  
  // Glow toggle
  elements.toggleGlow.addEventListener('change', (e) => {
    state.effects.glow = e.target.checked;
    document.body.classList.toggle('no-glow', !e.target.checked);
    saveEffectPreferences();
  });
  
  // Animations toggle
  elements.toggleAnimations.addEventListener('change', (e) => {
    state.effects.animations = e.target.checked;
    document.body.classList.toggle('no-animations', !e.target.checked);
    saveEffectPreferences();
  });
  
  // Night mode toggle
  elements.toggleNight.addEventListener('change', (e) => {
    state.effects.night = e.target.checked;
    document.body.classList.toggle('night-mode', e.target.checked);
    saveEffectPreferences();
  });
  
  // Storm toggle
  elements.toggleStorm.addEventListener('change', (e) => {
    state.effects.storm = e.target.checked;
    elements.stormContainer.classList.toggle('storm-hidden', !e.target.checked);
    if (window.lightningStorm) {
      window.lightningStorm.setActive(e.target.checked);
    }
    saveEffectPreferences();
  });
}

function saveEffectPreferences() {
  localStorage.setItem('magicalEffects', JSON.stringify(state.effects));
}

function loadEffectPreferences() {
  const saved = localStorage.getItem('magicalEffects');
  if (saved) {
    const effects = JSON.parse(saved);
    Object.assign(state.effects, effects);
    
    // Apply saved preferences
    elements.toggleRain.checked = effects.rain;
    elements.toggleParticles.checked = effects.particles;
    elements.toggleCandles.checked = effects.candles;
    elements.toggleGlow.checked = effects.glow;
    elements.toggleAnimations.checked = effects.animations;
    elements.toggleNight.checked = effects.night;
    elements.toggleStorm.checked = effects.storm !== false; // default true
    
    // Apply effects
    elements.rainContainer.classList.toggle('rain-active', effects.rain);
    elements.particlesContainer.style.display = effects.particles ? 'block' : 'none';
    elements.candlesContainer.style.display = effects.candles ? 'block' : 'none';
    document.body.classList.toggle('no-glow', !effects.glow);
    document.body.classList.toggle('no-animations', !effects.animations);
    document.body.classList.toggle('night-mode', effects.night);
    elements.stormContainer.classList.toggle('storm-hidden', effects.storm === false);
    if (window.lightningStorm) {
      window.lightningStorm.setActive(effects.storm !== false);
    }
  }
}

// ============================================
// Particles System
// ============================================

function initParticles() {
  const container = elements.particlesContainer;
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random properties
  const x = Math.random() * 100;
  const size = 2 + Math.random() * 4;
  const duration = 10 + Math.random() * 20;
  const delay = Math.random() * duration;
  const hue = Math.random() > 0.7 ? 120 : 45; // Mostly gold, some green
  
  particle.style.cssText = `
    left: ${x}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: -${delay}s;
    background: hsl(${hue}, 70%, 50%);
    box-shadow: 0 0 ${size * 2}px hsl(${hue}, 70%, 50%);
  `;
  
  container.appendChild(particle);
}

// ============================================
// Floating Candles
// ============================================

function initCandles() {
  const container = elements.candlesContainer;
  const candleCount = 15;
  
  for (let i = 0; i < candleCount; i++) {
    createCandle(container, i);
  }
}

function createCandle(container, index) {
  const candle = document.createElement('div');
  candle.className = 'candle';
  
  // Random properties
  const x = 5 + Math.random() * 90;
  const y = 10 + Math.random() * 60;
  const delay = Math.random() * 8;
  const scale = 0.6 + Math.random() * 0.6;
  
  candle.style.cssText = `
    left: ${x}%;
    top: ${y}%;
    animation-delay: -${delay}s;
    transform: scale(${scale});
    opacity: ${0.4 + scale * 0.4};
  `;
  
  container.appendChild(candle);
}

// ============================================
// Lightning Storm System
// ============================================

function initLightningStorm() {
  const storm = new LightningStorm(elements.stormContainer);
  window.lightningStorm = storm;
}

class LightningStorm {
  constructor(container) {
    this.container = container;
    this.isActive = true;
    this.flash = container.querySelector('.lightning-flash');
    this.thunderGlow = container.querySelector('.thunder-glow');
    
    // Lightning timing - more frequent!
    this.minInterval = 1500;  // Min time between strikes (1.5s)
    this.maxInterval = 4500;  // Max time between strikes (4.5s)
    
    // Ambient flicker timing
    this.flickerMinInterval = 800;
    this.flickerMaxInterval = 2000;
    
    this.scheduleNextStrike();
    this.scheduleAmbientFlicker();
  }
  
  scheduleNextStrike() {
    if (!this.isActive) return;
    
    const delay = this.minInterval + Math.random() * (this.maxInterval - this.minInterval);
    
    this.timeout = setTimeout(() => {
      this.strike();
      this.scheduleNextStrike();
    }, delay);
  }
  
  scheduleAmbientFlicker() {
    if (!this.isActive) return;
    
    const delay = this.flickerMinInterval + Math.random() * (this.flickerMaxInterval - this.flickerMinInterval);
    
    this.flickerTimeout = setTimeout(() => {
      this.ambientFlicker();
      this.scheduleAmbientFlicker();
    }, delay);
  }
  
  ambientFlicker() {
    if (!this.isActive) return;
    
    // Create soft ambient glow - no circles, just soft light
    const glow = document.createElement('div');
    glow.className = 'glow-orb';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const width = 200 + Math.random() * 300;
    const height = 150 + Math.random() * 250;
    const angle = Math.random() * 360;
    
    glow.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${width}px;
      height: ${height}px;
      background: linear-gradient(
        ${angle}deg,
        rgba(160, 160, 200, 0.25) 0%,
        rgba(140, 140, 180, 0.1) 50%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
      filter: blur(60px);
      border-radius: 0;
    `;
    
    this.container.appendChild(glow);
    
    // Quick fade in/out
    glow.style.opacity = '0.5';
    setTimeout(() => {
      glow.style.transition = 'opacity 0.25s ease';
      glow.style.opacity = '0';
    }, 120);
    
    setTimeout(() => glow.remove(), 400);
  }
  
  strike() {
    if (!this.isActive) return;
    
    // Random glow type - distributed across screen
    const strikeType = Math.random();
    
    if (strikeType < 0.25) {
      // Single random glow orb
      this.createGlowOrb();
    } else if (strikeType < 0.5) {
      // Multiple glow orbs
      this.multipleGlowOrbs();
    } else if (strikeType < 0.75) {
      // Sheet lightning effect
      this.sheetLightning();
    } else {
      // Storm burst - multiple effects
      this.stormBurst();
    }
  }
  
  createGlowOrb(customX, customY) {
    const orb = document.createElement('div');
    orb.className = 'glow-orb';
    
    // Random position across entire screen
    const x = customX !== undefined ? customX : Math.random() * 100;
    const y = customY !== undefined ? customY : Math.random() * 100;
    const width = 300 + Math.random() * 500; // Wide spread
    const height = 200 + Math.random() * 400;
    
    // Soft blue-white color
    const hue = 210 + Math.random() * 30;
    const lightness = 80 + Math.random() * 15;
    
    orb.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${width}px;
      height: ${height}px;
      background: linear-gradient(
        ${Math.random() * 360}deg,
        hsla(${hue}, 40%, ${lightness}%, 0.4) 0%,
        hsla(${hue}, 30%, ${lightness - 10}%, 0.2) 50%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
    `;
    
    this.container.appendChild(orb);
    
    requestAnimationFrame(() => {
      orb.classList.add('active');
    });
    
    // Ambient screen flash
    this.thunderGlow.classList.remove('active');
    void this.thunderGlow.offsetWidth;
    this.thunderGlow.classList.add('active');
    
    // Cleanup
    setTimeout(() => orb.remove(), 700);
  }
  
  multipleGlowOrbs() {
    const count = 2 + Math.floor(Math.random() * 4); // 2-5 orbs
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (this.isActive) {
          this.createGlowOrb();
        }
      }, i * 80);
    }
  }
  
  sheetLightning() {
    // Create large ambient sheet effect - no circles
    const sheet = document.createElement('div');
    sheet.className = 'sheet-lightning';
    
    // Cover a large area with soft gradient
    const x = Math.random() * 100;
    const y = Math.random() * 80;
    const width = 500 + Math.random() * 600;
    const height = 400 + Math.random() * 500;
    const angle = Math.random() * 180;
    
    sheet.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${width}px;
      height: ${height}px;
      background: linear-gradient(
        ${angle}deg,
        rgba(180, 180, 220, 0.35) 0%,
        rgba(160, 160, 210, 0.2) 30%,
        rgba(140, 140, 200, 0.1) 60%,
        transparent 100%
      );
      transform: translate(-50%, -50%);
    `;
    
    this.container.appendChild(sheet);
    
    requestAnimationFrame(() => {
      sheet.classList.add('active');
    });
    
    // Full ambient glow
    this.flash.classList.remove('active');
    void this.flash.offsetWidth;
    this.flash.classList.add('active');
    
    this.thunderGlow.classList.remove('active');
    void this.thunderGlow.offsetWidth;
    this.thunderGlow.classList.add('active');
    
    setTimeout(() => {
      this.flash.classList.remove('active');
    }, 350);
    
    setTimeout(() => sheet.remove(), 600);
  }
  
  stormBurst() {
    // Create multiple effects across the screen
    const positions = [
      { x: 20, y: 30 },
      { x: 50, y: 50 },
      { x: 80, y: 40 },
      { x: 35, y: 70 },
      { x: 65, y: 20 }
    ];
    
    // Ambient flash
    this.flash.classList.remove('active');
    void this.flash.offsetWidth;
    this.flash.classList.add('active');
    
    // Create orbs at different positions
    positions.forEach((pos, i) => {
      setTimeout(() => {
        if (this.isActive) {
          this.createGlowOrb(pos.x + (Math.random() * 10 - 5), pos.y + (Math.random() * 10 - 5));
        }
      }, i * 60);
    });
    
    // Secondary flash
    setTimeout(() => {
      this.flash.classList.remove('active');
      void this.flash.offsetWidth;
      this.flash.classList.add('active');
    }, 200);
    
    // Sheet lightning
    setTimeout(() => {
      if (this.isActive) this.sheetLightning();
    }, 300);
    
    setTimeout(() => {
      this.flash.classList.remove('active');
    }, 450);
  }
  
  setActive(active) {
    this.isActive = active;
    
    if (active) {
      this.scheduleNextStrike();
      this.scheduleAmbientFlicker();
    } else {
      clearTimeout(this.timeout);
      clearTimeout(this.flickerTimeout);
    }
  }
}

// ============================================
// Background Music
// ============================================

function initBackgroundMusic() {
  if (!elements.bgMusic || !elements.musicToggle) return;
  
  const audio = elements.bgMusic;
  
  // Set initial audio properties
  audio.volume = 0.5;
  audio.loop = true;
  audio.preload = 'auto';
  
  // Check if user previously paused the music
  const savedMusicState = localStorage.getItem('hp-gallery-music');
  const shouldPlay = savedMusicState !== 'paused';
  
  // Set initial visual state
  if (shouldPlay) {
    elements.musicToggle.classList.add('playing');
    state.music.isPlaying = true;
  }
  
  // Toggle button click handler
  elements.musicToggle.addEventListener('click', toggleMusic);
  
  // Function to attempt playing audio
  const attemptPlay = () => {
    if (!shouldPlay || audio.paused === false) return;
    
    audio.play()
      .then(() => {
        console.log('🎵 Music started playing');
        state.music.isPlaying = true;
        state.music.hasInteracted = true;
        elements.musicToggle.classList.add('playing');
      })
      .catch((error) => {
        console.log('Autoplay blocked, waiting for interaction:', error.message);
      });
  };
  
  // Try to play when audio is loaded
  audio.addEventListener('canplaythrough', attemptPlay, { once: true });
  
  // Try to play when metadata is loaded
  audio.addEventListener('loadeddata', attemptPlay, { once: true });
  
  // Enable audio on user interaction (required by most browsers)
  const enableOnInteraction = (e) => {
    if (shouldPlay && !state.music.hasInteracted) {
      console.log('User interaction detected, starting music...');
      state.music.hasInteracted = true;
      
      audio.play()
        .then(() => {
          console.log('✨ Music playing after interaction');
          state.music.isPlaying = true;
          elements.musicToggle.classList.add('playing');
        })
        .catch((err) => {
          console.log('Play failed:', err.message);
        });
    }
  };
  
  // Add listeners for user interactions
  const interactionEvents = ['click', 'touchstart', 'keydown', 'mousedown'];
  interactionEvents.forEach(event => {
    document.addEventListener(event, enableOnInteraction, { once: true, passive: true });
  });
  
  // Handle audio ended (backup for loop attribute)
  audio.addEventListener('ended', () => {
    if (state.music.isPlaying) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  });
  
  // Sync state with actual audio events
  audio.addEventListener('play', () => {
    state.music.isPlaying = true;
    elements.musicToggle.classList.add('playing');
  });
  
  audio.addEventListener('pause', () => {
    state.music.isPlaying = false;
    elements.musicToggle.classList.remove('playing');
  });
  
  // Handle errors
  audio.addEventListener('error', (e) => {
    console.error('Audio error:', e.target.error);
    elements.musicToggle.classList.remove('playing');
  });
  
  // Force load the audio
  audio.load();
  
  // Initial play attempt
  setTimeout(attemptPlay, 100);
}

// Force play audio - simplified
function forcePlay() {
  if (!elements.bgMusic) return;
  
  const playPromise = elements.bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('✨ Auto-play successful');
        state.music.isPlaying = true;
        elements.musicToggle.classList.add('playing');
      })
      .catch((error) => {
        console.log('Auto-play blocked, waiting for user interaction...', error.message);
        // Keep the visual state ready
        elements.musicToggle.classList.add('playing');
      });
  }
}

function tryAutoPlay() {
  if (!elements.bgMusic) return;
  
  const playPromise = elements.bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        state.music.isPlaying = true;
        state.music.hasInteracted = true;
        elements.musicToggle.classList.add('playing');
        localStorage.setItem('hp-gallery-music', 'playing');
      })
      .catch((error) => {
        console.log('Autoplay blocked - waiting for user interaction');
        // Keep the button showing as "should be playing"
        // It will start on first interaction
      });
  }
}

function toggleMusic() {
  if (state.music.isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic(silent = false) {
  if (!elements.bgMusic) return;
  
  const playPromise = elements.bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        state.music.isPlaying = true;
        elements.musicToggle.classList.add('playing');
        localStorage.setItem('hp-gallery-music', 'playing');
        if (!silent) {
          showToast('🎵 Magical music playing...', 'success');
        }
      })
      .catch((error) => {
        console.log('Play prevented:', error);
        if (!silent) {
          showToast('Click anywhere to enable music', 'info');
        }
      });
  }
}

function pauseMusic() {
  if (!elements.bgMusic) return;
  
  elements.bgMusic.pause();
  state.music.isPlaying = false;
  elements.musicToggle.classList.remove('playing');
  localStorage.setItem('hp-gallery-music', 'paused');
  showToast('🔇 Music paused', 'info');
}

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✨' : '⚠️';
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ============================================
// Utility Functions
// ============================================

function formatMagicalDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return 'Unknown';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

// ============================================
// VIDEO GALLERY
// ============================================

let selectedVideoFiles = [];

async function loadVideos() {
  if (!elements.videoGalleryLoading) return;
  
  elements.videoGalleryLoading.classList.remove('hidden');
  elements.videoGalleryGrid.innerHTML = '';
  elements.videoGalleryEmpty.classList.add('hidden');
  
  try {
    const response = await fetch('/api/videos?order=desc');
    const videos = await response.json();
    
    state.videos = videos;
    elements.videoGalleryLoading.classList.add('hidden');
    
    if (videos.length === 0) {
      elements.videoGalleryEmpty.classList.remove('hidden');
      elements.videoCount.textContent = '0';
      return;
    }
    
    elements.videoCount.textContent = videos.length;
    renderVideoGallery(videos);
    
    // Start auto-play if currently on videos section
    const videosSection = document.getElementById('videos');
    if (videosSection && videosSection.classList.contains('active')) {
      startVideoGalleryAutoplay();
    }
    
  } catch (error) {
    console.error('Failed to load videos:', error);
    elements.videoGalleryLoading.classList.add('hidden');
    showToast('Failed to summon videos from the Pensieve', 'error');
  }
}

function renderVideoGallery(videos) {
  elements.videoGalleryGrid.innerHTML = '';
  
  videos.forEach((video, index) => {
    const card = createVideoCard(video, index);
    elements.videoGalleryGrid.appendChild(card);
  });
}

function createVideoCard(video, index) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.dataset.index = index;
  
  const formattedDate = formatMagicalDate(video.uploadedAt);
  const formattedSize = formatFileSize(video.fileSize);
  
  card.innerHTML = `
    <video 
      class="video-card-video" 
      muted 
      loop 
      playsinline 
      preload="metadata"
      data-src="${video.url}"
    >
      <source src="${video.url}" type="${video.mimeType}">
    </video>
    <div class="video-card-play">▶</div>
    <div class="video-card-overlay">
      <h3 class="video-card-title">${video.fileName}</h3>
      <div class="video-card-meta">
        <span>🕐 ${formattedDate}</span>
        <span>📊 ${formattedSize}</span>
      </div>
    </div>
    <button class="video-card-delete" data-id="${video.id}" title="Remove from Pensieve">🗑️</button>
  `;
  
  const videoEl = card.querySelector('.video-card-video');
  
  // Auto-play on hover
  card.addEventListener('mouseenter', () => {
    videoEl.play().catch(() => {});
    card.classList.add('playing');
  });
  
  card.addEventListener('mouseleave', () => {
    videoEl.pause();
    videoEl.currentTime = 0;
    card.classList.remove('playing');
  });
  
  // Click to open fullscreen
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('video-card-delete')) {
      openVideoLightbox(index);
    }
  });
  
  // Delete button
  const deleteBtn = card.querySelector('.video-card-delete');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteVideo(video.id);
  });
  
  return card;
}

async function deleteVideo(id) {
  if (!confirm('Are you sure you want to remove this video from the Pensieve?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    const data = await response.json();
    
    if (data.success) {
      showToast('Video vanished from the Pensieve! ✨', 'success');
      loadVideos();
    } else {
      showToast(data.error || 'Failed to delete video', 'error');
    }
  } catch (error) {
    console.error('Delete failed:', error);
    showToast('The spell failed! Could not delete video.', 'error');
  }
}

// Video Auto-play functionality
function startVideoGalleryAutoplay() {
  const videoCards = document.querySelectorAll('.video-card-video');
  videoCards.forEach(video => {
    video.muted = true;
    video.play().catch(() => {});
  });
}

function stopVideoGalleryAutoplay() {
  const videoCards = document.querySelectorAll('.video-card-video');
  videoCards.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

// ============================================
// VIDEO UPLOAD
// ============================================

function initVideoUpload() {
  if (!elements.videoDropzone) return;
  
  // Dropzone click
  elements.videoDropzone.addEventListener('click', () => {
    elements.videoFileInput.click();
  });
  
  // File input change
  elements.videoFileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) handleVideoFilesSelection(files);
  });
  
  // Drag and drop
  elements.videoDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.videoDropzone.classList.add('dragover');
  });
  
  elements.videoDropzone.addEventListener('dragleave', () => {
    elements.videoDropzone.classList.remove('dragover');
  });
  
  elements.videoDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.videoDropzone.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) handleVideoFilesSelection(files);
  });
  
  // Clear preview
  elements.clearVideoPreview.addEventListener('click', clearVideoSelection);
  
  // Upload button
  elements.videoUploadBtn.addEventListener('click', uploadVideos);
}

function handleVideoFilesSelection(files) {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const maxSize = 100 * 1024 * 1024; // 100MB per file
  
  let validFiles = [];
  let errors = [];
  
  files.forEach(file => {
    if (!allowedTypes.includes(file.type)) {
      errors.push(`${file.name}: Invalid format (only MP4, WebM, OGG allowed)`);
    } else if (file.size > maxSize) {
      errors.push(`${file.name}: Exceeds 100MB limit`);
    } else {
      validFiles.push(file);
    }
  });
  
  if (errors.length > 0) {
    showVideoUploadStatus(errors.join('<br>'), 'error');
  }
  
  if (validFiles.length === 0) return;
  
  // Add to existing selection
  selectedVideoFiles = [...selectedVideoFiles, ...validFiles];
  
  hideVideoUploadStatus();
  updateVideoPreviewGrid();
}

function updateVideoPreviewGrid() {
  if (!elements.videoPreviewGrid) return;
  
  elements.videoPreviewGrid.innerHTML = '';
  
  selectedVideoFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'video-preview-item';
    
    // Create video preview
    const video = document.createElement('video');
    video.muted = true;
    video.src = URL.createObjectURL(file);
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1; // Show frame at 1 second
    });
    
    const nameLabel = document.createElement('div');
    nameLabel.className = 'video-name';
    nameLabel.textContent = file.name;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-video';
    removeBtn.innerHTML = '✕';
    removeBtn.title = `Remove ${file.name}`;
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeVideoFile(index);
    });
    
    item.appendChild(video);
    item.appendChild(nameLabel);
    item.appendChild(removeBtn);
    item.title = `${file.name} (${formatFileSize(file.size)})`;
    elements.videoPreviewGrid.appendChild(item);
  });
  
  // Update summary
  const totalSize = selectedVideoFiles.reduce((sum, f) => sum + f.size, 0);
  elements.videoPreviewCount.textContent = `${selectedVideoFiles.length} video${selectedVideoFiles.length !== 1 ? 's' : ''} selected`;
  elements.videoPreviewTotalSize.textContent = formatFileSize(totalSize);
  
  // Show/hide preview and enable/disable upload button
  if (selectedVideoFiles.length > 0) {
    elements.videoUploadPreview.classList.remove('hidden');
    elements.videoUploadBtn.disabled = false;
  } else {
    elements.videoUploadPreview.classList.add('hidden');
    elements.videoUploadBtn.disabled = true;
  }
}

function removeVideoFile(index) {
  selectedVideoFiles.splice(index, 1);
  updateVideoPreviewGrid();
  
  if (selectedVideoFiles.length === 0) {
    hideVideoUploadStatus();
  }
}

function clearVideoSelection() {
  selectedVideoFiles = [];
  elements.videoFileInput.value = '';
  elements.videoUploadPreview.classList.add('hidden');
  elements.videoUploadBtn.disabled = true;
  hideVideoUploadStatus();
}

async function uploadVideos() {
  if (selectedVideoFiles.length === 0) return;
  
  const fileCount = selectedVideoFiles.length;
  elements.videoUploadBtn.disabled = true;
  elements.videoUploadBtn.textContent = `Storing ${fileCount} memor${fileCount !== 1 ? 'ies' : 'y'}...`;
  
  const formData = new FormData();
  selectedVideoFiles.forEach(file => {
    formData.append('videos', file);
  });
  
  try {
    const response = await fetch('/api/videos/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      const count = data.count || data.videos.length;
      showVideoUploadStatus(`✨ ${count} video${count !== 1 ? 's' : ''} successfully stored in the Pensieve!`, 'success');
      showToast(`${count} new video${count !== 1 ? 's' : ''} added to the Pensieve!`, 'success');
      clearVideoSelection();
      loadVideos();
    } else {
      showVideoUploadStatus(data.error || 'Storage spell failed!', 'error');
    }
  } catch (error) {
    console.error('Upload failed:', error);
    showVideoUploadStatus('The spell backfired! Upload failed.', 'error');
  }
  
  elements.videoUploadBtn.disabled = false;
  elements.videoUploadBtn.innerHTML = '<span class="btn-glow"></span>Store in Pensieve';
}

function showVideoUploadStatus(message, type) {
  elements.videoUploadStatus.innerHTML = message;
  elements.videoUploadStatus.className = `upload-status ${type}`;
  elements.videoUploadStatus.classList.remove('hidden');
  
  if (type === 'success') {
    setTimeout(hideVideoUploadStatus, 5000);
  }
}

function hideVideoUploadStatus() {
  if (elements.videoUploadStatus) {
    elements.videoUploadStatus.classList.add('hidden');
  }
}

// ============================================
// VIDEO LIGHTBOX
// ============================================

function initVideoLightbox() {
  const lightbox = document.getElementById('videoLightbox');
  const closeBtn = document.querySelector('.video-lightbox-close');
  const overlay = document.querySelector('.video-lightbox-overlay');
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');
  
  if (!lightbox) {
    console.log('Video lightbox not found');
    return;
  }
  
  // Close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeVideoLightbox();
    });
  }
  
  // Overlay click to close
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeVideoLightbox();
    });
  }
  
  // Fullscreen button click
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleVideoFullscreen();
    });
  }
  
  // Prevent clicks on video container from closing
  const videoContainer = lightbox.querySelector('.video-lightbox-container');
  if (videoContainer) {
    videoContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  // Prevent clicks on content area from closing
  const content = lightbox.querySelector('.video-lightbox-content');
  if (content) {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      e.preventDefault();
      closeVideoLightbox();
    }
    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleVideoFullscreen();
    }
  });
  
  // Handle fullscreen change event
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  
  console.log('Video lightbox initialized');
}

// Toggle video fullscreen mode
function toggleVideoFullscreen() {
  const video = document.getElementById('fullscreenVideo');
  const container = document.querySelector('.video-lightbox-container');
  
  if (!video) return;
  
  // Try to fullscreen the video element directly for best experience
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    // Enter fullscreen
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      // iOS Safari
      video.webkitEnterFullscreen();
    } else if (container.requestFullscreen) {
      container.requestFullscreen();
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// Handle fullscreen state change
function handleFullscreenChange() {
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');
  if (!fullscreenBtn) return;
  
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.title = 'Exit Full Screen';
  } else {
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.title = 'Enter Full Screen';
  }
}

function openVideoLightbox(index) {
  state.currentVideoIndex = index;
  const video = state.videos[index];
  
  if (!video) return;
  
  // Stop gallery autoplay
  stopVideoGalleryAutoplay();
  
  // Set video source
  const fullscreenVideo = elements.fullscreenVideo;
  if (!fullscreenVideo) {
    console.error('Fullscreen video element not found');
    return;
  }
  
  fullscreenVideo.innerHTML = `<source src="${video.url}" type="${video.mimeType}">`;
  fullscreenVideo.load();
  
  // Set info
  if (elements.videoLightboxTitle) {
    elements.videoLightboxTitle.textContent = video.fileName;
  }
  if (elements.videoLightboxDate) {
    elements.videoLightboxDate.textContent = `🕐 ${formatMagicalDate(video.uploadedAt)}`;
  }
  if (elements.videoLightboxSize) {
    elements.videoLightboxSize.textContent = `📊 ${formatFileSize(video.fileSize)}`;
  }
  
  // Show lightbox
  elements.videoLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.body.style.pointerEvents = 'auto';
  
  // Start playing the video
  setTimeout(() => {
    fullscreenVideo.play().catch(() => {});
  }, 300);
}

function closeVideoLightbox() {
  const fullscreenVideo = elements.fullscreenVideo;
  
  // Stop and clear the video completely
  if (fullscreenVideo) {
    fullscreenVideo.pause();
    fullscreenVideo.currentTime = 0;
    fullscreenVideo.innerHTML = ''; // Clear the source
    fullscreenVideo.load(); // Reset the video element
  }
  
  // Hide lightbox
  if (elements.videoLightbox) {
    elements.videoLightbox.classList.remove('active');
  }
  
  // Restore body scrolling and interaction
  document.body.style.overflow = '';
  document.body.style.pointerEvents = '';
  
  // Resume gallery autoplay if still on videos section
  const videosSection = document.getElementById('videos');
  if (videosSection && videosSection.classList.contains('active')) {
    setTimeout(() => {
      startVideoGalleryAutoplay();
    }, 100);
  }
}

