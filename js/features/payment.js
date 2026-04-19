/**
 * IRCTC - Payment Feature Component
 */

class PaymentFeature {
  constructor() {
    this.method = 'upi';
    
    this.init();
  }
  
  init() {
    // Back button
    utils.$('#backToSelect')?.addEventListener('click', () => {
      stepManager.goToStep(3);
    });
    
    // Payment method selection
    utils.$$('.payment-method').forEach(method => {
      method.addEventListener('click', () => this.selectMethod(method.dataset.method));
    });
    
    // Pay button
    utils.$('#payNowBtn')?.addEventListener('click', () => this.process());
  }
  
  selectMethod(method) {
    this.method = method;
    
    utils.$$('.payment-method').forEach(m => {
      m.classList.toggle('payment-method-active', m.dataset.method === method);
    });
    
    const upiSection = utils.$('#upiSection');
    if (method === 'upi') {
      upiSection.classList.add('upi-section-active');
    } else {
      upiSection.classList.remove('upi-section-active');
    }
    
    store.setState({ paymentMethod: method });
  }
  
  process() {
    const btn = utils.$('#payNowBtn');
    
    // Show loading
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" style="width: 18px; height: 18px;"></span><span>Processing...</span>';
    
    // Simulate payment (in production, call API)
    setTimeout(() => {
      // Populate confirmation
      const state = store.getState();
      
      utils.$('#confirmTrainName').textContent = state.selectedTrain?.name || 'Rajdhani Express';
      utils.$('#confirmFromStation').textContent = `${state.fromStation || 'New Delhi'} (${state.selectedTrain?.from || 'NDLS'})`;
      utils.$('#confirmToStation').textContent = `${state.toStation || 'Mumbai'} (${state.selectedTrain?.to || 'BSDT'})`;
      utils.$('#confirmDeparture').textContent = state.selectedTrain?.departureTime || '16:55';
      utils.$('#confirmArrival').textContent = state.selectedTrain?.arrivalTime || '08:20';
      utils.$('#confirmPassenger').textContent = 
        utils.$(`#passenger0Name`)?.value || 'Passenger 1';
      utils.$('#confirmSeat').textContent = (state.selectedClass || '3A') + '-9, LB';
      
      // Go to confirmation
      stepManager.goToStep(5);
      
      // Reset button
      btn.disabled = false;
      btn.innerHTML = '<span class="pay-amount">Pay ₹1,344</span><span class="pay-text">Secure Payment</span>';
      
      toast.success('Payment successful! Booking confirmed.');
    }, CONFIG.LOADING_DELAY);
  }
}

const paymentFeature = new PaymentFeature();

// Export
window.IRCTC.PaymentFeature = PaymentFeature;