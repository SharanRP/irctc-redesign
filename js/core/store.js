/**
 * IRCTC Redesign - Core Modules
 * Event Bus, Store, Utilities
 */

// ========================================
// EVENT BUS - Pub/Sub Pattern
// ========================================

class EventBus {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    if (!this.events.has(event)) return;
    this.events.get(event).delete(callback);
  }
  
  emit(event, data) {
    if (!this.events.has(event)) return;
    
    this.events.get(event).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event "${event}":`, error);
      }
    });
  }
  
  // One-time listener
  once(event, callback) {
    const unsubscribe = this.on(event, (data) => {
      unsubscribe();
      callback(data);
    });
    return unsubscribe;
  }
}

const events = new EventBus();

// ========================================
// STATE STORE - Reactive State
// ========================================

class Store {
  constructor(initialState = {}) {
    this._state = initialState;
    this._listeners = new Map();
    this._history = [];
    this._historyIndex = -1;
    this._maxHistory = 50;
  }
  
  getState() {
    return { ...this._state };
  }
  
  setState(updates, options = {}) {
    const prevState = { ...this._state };
    const silent = options.silent;
    
    // Update state
    this._state = { ...this._state, ...updates };
    
    // Add to history for undo
    if (options.undo !== false) {
      this._addToHistory(prevState);
    }
    
    // Notify listeners
    if (!silent) {
      this._notify(prevState);
    }
    
    // Emit event
    events.emit('state:change', { state: this._state, prevState, updates });
  }
  
  subscribe(keys, callback) {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    
    keyArray.forEach(key => {
      if (!this._listeners.has(key)) {
        this._listeners.set(key, new Set());
      }
      this._listeners.get(key).add(callback);
    });
    
    // Return unsubscribe
    return () => {
      keyArray.forEach(key => {
        if (this._listeners.has(key)) {
          this._listeners.get(key).delete(callback);
        }
      });
    };
  }
  
  get(key, defaultValue) {
    return this._state[key] ?? defaultValue;
  }
  
  _notify(prevState) {
    // Notify specific key listeners
    Object.keys(this._state).forEach(key => {
      if (prevState[key] !== this._state[key]) {
        if (this._listeners.has(key)) {
          this._listeners.get(key).forEach(callback => {
            callback(this._state[key], prevState[key]);
          });
        }
      }
    });
    
    // Notify global listeners
    events.emit('state:updated', { state: this._state, prevState });
  }
  
  _addToHistory(state) {
    // Remove any redo history
    this._history = this._history.slice(0, this._historyIndex + 1);
    
    // Add to history
    this._history.push({ ...state });
    
    // Limit history size
    if (this._history.length > this._maxHistory) {
      this._history.shift();
    } else {
      this._historyIndex++;
    }
  }
  
  undo() {
    if (this._historyIndex > 0) {
      this._historyIndex--;
      this._state = { ...this._history[this._historyIndex] };
      this._notify({});
      events.emit('state:change', { state: this._state, prevState: this._state });
    }
  }
  
  redo() {
    if (this._historyIndex < this._history.length - 1) {
      this._historyIndex++;
      this._state = { ...this._history[this._historyIndex] };
      this._notify({});
      events.emit('state:change', { state: this._state, prevState: this._state });
    }
  }
  
  reset() {
    this._history = [];
    this._historyIndex = -1;
    this._state = {};
    events.emit('state:reset');
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

const utils = {
  /**
   * Debounce function
   */
  debounce(fn, delay = 300) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },
  
  /**
   * Throttle function
   */
  throttle(fn, limit = 300) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  /**
   * Format currency
   */
  formatCurrency(amount) {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  },
  
  /**
   * Format date for display
   */
  formatDate(dateStr, format = 'long') {
    const date = new Date(dateStr);
    
    if (format === 'short') {
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    }
    
    if (format === 'full') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    return date.toLocaleDateString('en-IN');
  },
  
  /**
   * Format time
   */
  formatTime(timeStr) {
    return timeStr;
  },
  
  /**
   * Parse duration to minutes
   */
  parseDuration(duration) {
    const match = duration?.match(/(\d+)h\s*(\d+)?m?/);
    if (match) {
      return parseInt(match[1]) * 60 + (parseInt(match[2]) || 0);
    }
    return 0;
  },
  
  /**
   * Get total available seats
   */
  getTotalAvailable(classes) {
    return Object.values(classes || {}).reduce((sum, cls) => sum + cls.available, 0);
  },
  
  /**
   * Generate unique ID
   */
  generateId() {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },
  
  /**
   * Create element from HTML string
   */
  createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  },
  
  /**
   * Query selector shorthand
   */
  $(selector, context = document) {
    return context.querySelector(selector);
  },
  
  $$(selector, context = document) {
    return context.querySelectorAll(selector);
  },
  
  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  /**
   * Copy to clipboard
   */
  copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
  },
  
  /**
   * Download file
   */
  downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
  
  /**
   * Local storage with expiry
   */
  storage: {
    set(key, value, expiryMs) {
      const item = {
        value,
        expiry: expiryMs ? Date.now() + expiryMs : null
      };
      localStorage.setItem(key, JSON.stringify(item));
    },
    
    get(key) {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      const { value, expiry } = JSON.parse(item);
      if (expiry && Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    },
    
    remove(key) {
      localStorage.removeItem(key);
    }
  }
};

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  API_BASE: '/api/v1',
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3500,
  LOADING_DELAY: 2000,
  MAX_PASSENGERS: 6,
  MAX_RECENT_SEARCHES: 5,
  ANIMATION_DURATION: 300
};

// Export
window.IRCTC = window.IRCTC || {};
Object.assign(window.IRCTC, {
  EventBus: events,
  Store,
  utils,
  CONFIG
});