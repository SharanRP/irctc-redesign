/**
 * IRCTC - Toast Component
 */

class Toast {
  constructor(containerId = 'toast-container') {
    this.container = document.getElementById(containerId) || this.createContainer(containerId);
    this.activeToast = null;
    this.queue = [];
    this.processing = false;
  }
  
  createContainer(containerId) {
    const container = utils.createElement(
      `<div id="${containerId}" class="toast-container"></div>`
    );
    document.body.appendChild(container);
    return container;
  }
  
  show(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
    // Queue if already showing
    if (this.activeToast) {
      this.queue.push({ message, type, duration });
      return;
    }
    
    this.display(message, type, duration);
  }
  
  display(message, type, duration) {
    const toast = utils.createElement(
      `<div class="toast toast-${type}">
        <span>${message}</span>
      </div>`
    );
    
    this.container.appendChild(toast);
    this.activeToast = toast;
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    
    // Auto dismiss
    this.timeout = setTimeout(() => {
      this.dismiss();
    }, duration);
  }
  
  dismiss() {
    if (!this.activeToast) return;
    
    clearTimeout(this.timeout);
    const toast = this.activeToast;
    
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      toast.remove();
      this.activeToast = null;
      
      // Process queue
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.display(next.message, next.type, next.duration);
      }
    }, 300);
  }
  
  // Convenience methods
  success(message) { return this.show(message, 'success'); }
  error(message) { return this.show(message, 'error'); }
  warning(message) { return this.show(message, 'warning'); }
  info(message) { return this.show(message, 'info'); }
}

// Export
window.IRCTC.Toast = Toast;