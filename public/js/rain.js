/**
 * Magical Rain Effect System
 * Creates an atmospheric animated rain overlay
 */

(function() {
  'use strict';

  class MagicalRain {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      this.options = {
        dropCount: options.dropCount || 150,
        minSpeed: options.minSpeed || 0.8,
        maxSpeed: options.maxSpeed || 1.5,
        minOpacity: options.minOpacity || 0.2,
        maxOpacity: options.maxOpacity || 0.5,
        wind: options.wind || 10, // degrees of tilt
        ...options
      };
      
      this.drops = [];
      this.isActive = true;
      
      this.init();
    }

    init() {
      if (!this.container) {
        console.warn('Rain container not found');
        return;
      }

      // Clear existing drops
      this.container.innerHTML = '';
      
      // Create rain drops
      for (let i = 0; i < this.options.dropCount; i++) {
        this.createDrop(i);
      }

      // Add mist overlay
      this.createMist();
    }

    createDrop(index) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      
      // Randomize properties
      const left = Math.random() * 100;
      const height = 15 + Math.random() * 25;
      const duration = this.options.minSpeed + Math.random() * (this.options.maxSpeed - this.options.minSpeed);
      const delay = Math.random() * duration;
      const opacity = this.options.minOpacity + Math.random() * (this.options.maxOpacity - this.options.minOpacity);
      const wind = (Math.random() - 0.5) * this.options.wind;
      
      drop.style.cssText = `
        left: ${left}%;
        height: ${height}px;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
        transform: rotate(${wind}deg);
      `;
      
      this.container.appendChild(drop);
      this.drops.push(drop);
    }

    createMist() {
      // Create subtle mist layers
      const mistLayers = 3;
      
      for (let i = 0; i < mistLayers; i++) {
        const mist = document.createElement('div');
        mist.className = 'rain-mist';
        mist.style.cssText = `
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(174, 194, 224, ${0.01 + i * 0.005}) ${30 + i * 10}%,
            transparent 100%
          );
          pointer-events: none;
          animation: mist-drift ${15 + i * 5}s ease-in-out infinite;
          animation-delay: -${i * 3}s;
        `;
        this.container.appendChild(mist);
      }

      // Add mist animation to head if not exists
      if (!document.getElementById('mist-animation-style')) {
        const style = document.createElement('style');
        style.id = 'mist-animation-style';
        style.textContent = `
          @keyframes mist-drift {
            0%, 100% {
              opacity: 0.5;
              transform: translateX(-5%);
            }
            50% {
              opacity: 0.8;
              transform: translateX(5%);
            }
          }
        `;
        document.head.appendChild(style);
      }
    }

    setActive(active) {
      this.isActive = active;
      this.container.classList.toggle('rain-active', active);
    }

    destroy() {
      this.drops.forEach(drop => drop.remove());
      this.drops = [];
    }

    // Update rain intensity
    setIntensity(intensity) {
      // intensity: 0-1
      const targetCount = Math.floor(intensity * 200);
      
      // Add or remove drops
      while (this.drops.length < targetCount) {
        this.createDrop(this.drops.length);
      }
      
      while (this.drops.length > targetCount) {
        const drop = this.drops.pop();
        drop.remove();
      }
    }
  }

  // Lightning effect class
  class MagicalLightning {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.isActive = true;
      this.minInterval = 15000; // Min time between strikes
      this.maxInterval = 45000; // Max time between strikes
      
      this.init();
    }

    init() {
      if (!this.container) return;

      // Add lightning style
      if (!document.getElementById('lightning-style')) {
        const style = document.createElement('style');
        style.id = 'lightning-style';
        style.textContent = `
          .lightning-flash {
            position: fixed;
            inset: 0;
            background: radial-gradient(
              ellipse at 50% 0%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(200, 200, 255, 0.1) 40%,
              transparent 70%
            );
            pointer-events: none;
            z-index: 999;
            opacity: 0;
          }
          
          .lightning-flash.active {
            animation: lightning-strike 0.2s ease-out;
          }
          
          @keyframes lightning-strike {
            0% { opacity: 0; }
            10% { opacity: 0.8; }
            20% { opacity: 0.3; }
            30% { opacity: 0.7; }
            40% { opacity: 0.1; }
            50% { opacity: 0.5; }
            100% { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      // Create flash element
      this.flash = document.createElement('div');
      this.flash.className = 'lightning-flash';
      this.container.appendChild(this.flash);
      
      this.scheduleNextStrike();
    }

    scheduleNextStrike() {
      if (!this.isActive) return;
      
      const delay = this.minInterval + Math.random() * (this.maxInterval - this.minInterval);
      
      setTimeout(() => {
        this.strike();
        this.scheduleNextStrike();
      }, delay);
    }

    strike() {
      if (!this.isActive || !this.flash) return;
      
      this.flash.classList.remove('active');
      // Trigger reflow
      void this.flash.offsetWidth;
      this.flash.classList.add('active');
      
      // Remove class after animation
      setTimeout(() => {
        this.flash.classList.remove('active');
      }, 200);
    }

    setActive(active) {
      this.isActive = active;
    }
  }

  // Initialize rain effect when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.magicalRain = new MagicalRain('rain-container', {
      dropCount: 120,
      minSpeed: 0.6,
      maxSpeed: 1.2,
      minOpacity: 0.15,
      maxOpacity: 0.35,
      wind: 8
    });
    
    // Optional: Add lightning (can be intense, so off by default)
    // window.magicalLightning = new MagicalLightning('rain-container');
  });

  // Expose classes globally
  window.MagicalRain = MagicalRain;
  window.MagicalLightning = MagicalLightning;
})();



