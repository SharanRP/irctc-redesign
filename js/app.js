/**
 * IRCTC Redesign - Main Application Entry Point
 * Wires all components together
 */

// ========================================
// LOAD ORDER
// 1. Core (store.js)
// 2. Components (toast.js, autocomplete.js, stepManager.js)
// 3. Data (data.js)
// 4. Features (search.js, trainList.js, trainDetail.js, payment.js, confirmation.js)
// 5. Main (app.js)

// The script imports below need to be loaded in this order in HTML

// ========================================
// INITIALIZATION
// ========================================

class App {
  constructor() {
    this.components = {};
    this.features = {};
    this.initialized = false;
    this.toast = null;
    this.stepManager = null;
    this.store = null;
    this.i18n = null;
  }
  
  async init() {
    if (this.initialized) return;
    
    console.log('🚀 Initializing IRCTC Redesign...');
    
    try {
      // Initialize core
      this.store = new Store({
        currentStep: 1,
        journeyType: 'one-way',
        fromStation: '',
        toStation: '',
        travelDate: '',
        travelClass: 'ALL',
        quota: 'GN',
        selectedTrain: null,
        selectedClass: null,
        passengerCount: 1,
        passengers: [{ name: '', age: '', gender: '', idProof: '', idNumber: '' }],
        paymentMethod: 'upi'
      });
      window.store = this.store;
      
      // Initialize Toast
      this.toast = new Toast();
      window.toast = this.toast;
      
      // Initialize Step Manager
      this.stepManager = new StepManager({
        totalSteps: 5,
        initialStep: 1,
        onStepChange: (step) => console.log(`📍 Step: ${step}`)
      });
      window.stepManager = this.stepManager;
      
      // Initialize i18n (language)
      this.i18n = new I18n();
      window.i18n = this.i18n;
      
      // Initialize features
      this.features.search = new SearchFeature();
      this.features.trainList = new TrainListFeature();
      this.features.trainDetail = new TrainDetailFeature();
      this.features.payment = new PaymentFeature();
      this.features.confirmation = new ConfirmationFeature();
      
      // Wait for DOM
      await this.waitForDOM();
      
      // Initial render
      this.features.trainList.render();
      
      this.initialized = true;
      console.log('✅ App initialized successfully');
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
    }
  }
  
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
  }
  
  // Helper to get component
  getComponent(name) {
    return this.components[name];
  }
  
  // Helper to get feature
  getFeature(name) {
    return this.features[name];
  }
  
  // Reset app for new booking
  reset() {
    this.store.reset();
    this.stepManager.goToStep(1);
    
    // Reset features
    if (this.features.search) {
      utils.$('#fromStation').value = '';
      utils.$('#toStation').value = '';
    }
    
    toast.success('Ready for new booking');
  }
}

// ========================================
// AUTO-INITIALIZE
// ========================================

const app = new App();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Export to global
window.IRCTC.app = app;
window.IRCTC.version = '2.0.0';
window.IRCTC.i18n = i18n;

// ========================================
// DEBUG HELPERS
// ========================================

window.debug = {
  // Log state
  state: () => console.log('State:', store.getState()),
  
  // Reset
  reset: () => app.reset(),
  
  // Go to step
  goTo: (step) => stepManager.goToStep(step),
  
  // Show toast
  toast: (msg, type) => toast.show(msg, type),
  
  // Get data
  data: () => DATA,
  
  // Language
  lang: (l) => i18n.setLanguage(l)
};

console.log('%c🚂 IRCTC Redesign v2.0.0', 'font-size: 16px; font-weight: bold; color: #1A237E;');
console.log('%cType debug.state() to see state', 'color: #666;');
console.log('%cType debug.goTo(1-5) to navigate', 'color: #666;');