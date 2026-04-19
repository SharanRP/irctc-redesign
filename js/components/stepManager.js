/**
 * IRCTC - Step Navigator Component
 */

class StepManager {
  constructor(options = {}) {
    this.options = {
      totalSteps: 5,
      initialStep: 1,
      onStepChange: () => {},
      ...options
    };
    
    this.currentStep = this.options.initialStep;
    this.stepElements = [];
    this.progressElements = [];
    
    this.init();
  }
  
  init() {
    // Get all step elements
    this.stepElements = Array.from(document.querySelectorAll('.step'));
    this.progressElements = Array.from(document.querySelectorAll('.progress-step'));
    
    // Go to initial step
    this.goToStep(this.currentStep);
    
    // Listen for browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state?.step) {
        this.goToStep(e.state.step);
      }
    });
  }
  
  goToStep(stepNumber) {
    const step = Math.max(1, Math.min(stepNumber, this.options.totalSteps));
    
    // Hide all steps
    this.stepElements.forEach(el => {
      el.classList.remove('step-active');
    });
    
    // Show target step
    const targetIndex = step - 1;
    if (this.stepElements[targetIndex]) {
      this.stepElements[targetIndex].classList.add('step-active');
    }
    
    // Update progress
    this.updateProgress(step);
    
    // Update state
    this.currentStep = step;
    
    // Callback
    this.options.onStepChange(step);
    
    // Update browser history
    if (window.history?.replaceState) {
      window.history.replaceState({ step }, '', `#step-${step}`);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Emit event
    events.emit('step:change', step);
  }
  
  updateProgress(step) {
    this.progressElements.forEach((el, index) => {
      const isActive = index + 1 <= step;
      el.classList.toggle('progress-step-active', isActive);
      
      // Update indicator
      const indicator = el.querySelector('.progress-indicator');
      if (indicator) {
        indicator.textContent = index + 1;
        indicator.style.background = isActive 
          ? 'var(--color-primary-600)' 
          : 'var(--color-slate-300)';
      }
      
      // Update line
      const line = el.nextElementSibling;
      if (line?.classList.contains('progress-line')) {
        line.classList.toggle('progress-line-active', index < step);
        line.style.background = index < step
          ? 'linear-gradient(90deg, var(--color-primary-600), var(--color-primary-700))'
          : 'var(--color-border)';
      }
    });
  }
  
  next() {
    if (this.currentStep < this.options.totalSteps) {
      this.goToStep(this.currentStep + 1);
    }
  }
  
  prev() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }
  
  getCurrentStep() {
    return this.currentStep;
  }
  
  isFirstStep() {
    return this.currentStep === 1;
  }
  
  isLastStep() {
    return this.currentStep === this.options.totalSteps;
  }
}

// Export
window.IRCTC.StepManager = StepManager;