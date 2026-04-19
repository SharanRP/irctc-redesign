/**
 * IRCTC - Confirmation Feature Component
 */

class ConfirmationFeature {
  constructor() {
    this.init();
  }
  
  init() {
    // Book return button
    utils.$('#bookReturn')?.addEventListener('click', () => this.bookReturn());
    
    // Resend ticket
    utils.$('#resendTicket')?.addEventListener('click', () => {
      toast.success('E-ticket resent to your email');
    });
    
    // Add to wallet
    utils.$('#addToWallet')?.addEventListener('click', () => {
      toast.success('Added to wallet');
    });
  }
  
  bookReturn() {
    // Swap stations
    const fromInput = utils.$('#fromStation');
    const toInput = utils.$('#toStation');
    
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    
    // Update state
    const state = store.getState();
    store.setState({
      fromStation: state.toStation,
      toStation: state.fromStation
    });
    
    // Go to search
    stepManager.goToStep(1);
    toast.info('Return journey - select date and search');
  }
  
  // Generate PNR (mock)
  generatePNR() {
    return Math.floor(4000 + Math.random() * 1000) + '-' + 
           Math.floor(300 + Math.random() * 100) + '-' + 
           Math.floor(1000 + Math.random() * 1000);
  }
}

const confirmationFeature = new ConfirmationFeature();

// Export
window.IRCTC.ConfirmationFeature = ConfirmationFeature;