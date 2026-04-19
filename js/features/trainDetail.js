/**
 * IRCTC - Train Detail Feature Component
 */

class TrainDetailFeature {
  constructor() {
    this.selectedClass = null;
    
    this.init();
  }
  
  init() {
    // Back button
    utils.$('#backToResults')?.addEventListener('click', () => {
      stepManager.goToStep(2);
    });
    
    // Continue button
    utils.$('#continueToPayment')?.addEventListener('click', () => {
      if (!this.validate()) return;
      stepManager.goToStep(4);
    });
    
    // Add passenger button
    utils.$('#addPassengerBtn')?.addEventListener('click', () => {
      this.addPassenger();
    });
    
    // Listen for train selection
    events.on('train:select', (train) => this.render(train));
  }
  
  render(train) {
    // Detail card
    utils.$('#trainDetailCard').innerHTML = `
      <div class="detail-header">
        <div>
          <h2 class="detail-title">${train.name}</h2>
          <span class="detail-meta">Train No. ${train.number}</span>
        </div>
        <span class="on-time-badge" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: var(--color-success-bg); border-radius: 20px; font-size: 12px; font-weight: 600; color: var(--color-success);">
          ${train.onTimePercent}% On-time
        </span>
      </div>
      
      <div class="detail-route">
        <div class="detail-route-point">
          <span class="detail-route-time" style="font-size: 24px; font-weight: 700;">${train.departureTime}</span>
          <span class="detail-route-station">${train.from}</span>
        </div>
        <div class="detail-route-arrow">
          <span class="detail-route-duration" style="font-size: 12px; color: var(--color-text-tertiary);">${train.duration}</span>
          <div class="detail-route-line"></div>
        </div>
        <div class="detail-route-point">
          <span class="detail-route-time" style="font-size: 24px; font-weight: 700;">${train.arrivalTime}</span>
          <span class="detail-route-station">${train.to}</span>
        </div>
      </div>
    `;
    
    // Class options
    const classGrid = utils.$('#classOptions');
    classGrid.innerHTML = Object.entries(train.classes)
      .map(([code, data]) => {
        const statusText = data.status === 'available' ? `${data.available} seats` :
                       data.status === 'waitlist' ? `Waitlist (${data.available})` : 'Not Available';
        return `
          <div class="class-option ${data.status === 'unavailable' ? 'class-option-disabled' : ''}" 
               data-class="${code}" 
               onclick="trainDetailFeature.selectClass('${code}', ${JSON.stringify(data).replace(/"/g, '&quot;')})">
            <div class="class-option-header">
              <span class="class-option-name">${DATA.classNames[code]}</span>
              <span class="class-option-price">${utils.formatCurrency(data.price)}</span>
            </div>
            <span class="badge badge-${data.status === 'available' ? 'success' : data.status === 'waitlist' ? 'warning' : 'error'}">
              ${statusText}
            </span>
          </div>
        `;
      })
      .join('');
    
    // Render passenger form
    this.renderPassengers();
  }
  
  selectClass(code, data) {
    if (data.status === 'unavailable') {
      toast.error('This class is not available');
      return;
    }
    
    // Update UI
    utils.$$('.class-option').forEach(option => {
      option.classList.remove('class-option-selected');
      if (option.dataset.class === code) {
        option.classList.add('class-option-selected');
      }
    });
    
    this.selectedClass = code;
    
    // Update fare
    const passengerCount = store.getState().passengerCount;
    const baseFare = data.price * passengerCount;
    const superfast = 40 * passengerCount;
    const gst = Math.round(baseFare * 0.05);
    const total = baseFare + superfast + gst;
    
    utils.$('#baseFare').textContent = utils.formatCurrency(baseFare);
    utils.$('#totalFare').textContent = utils.formatCurrency(total);
    
    store.setState({ selectedClass: code });
    
    toast.success(`Selected ${DATA.classNames[code]} - ${utils.formatCurrency(data.price)}`);
  }
  
  renderPassengers() {
    const state = store.getState();
    const container = utils.$('#passengerForm');
    
    container.innerHTML = state.passengers.map((p, i) => `
      <div class="passenger-card">
        <div class="passenger-card-header">
          <span class="passenger-card-number">Passenger ${i + 1}</span>
          <span class="passenger-card-type">(Adult)</span>
        </div>
        
        <div class="form-row form-row-cols-2">
          <div class="input-group">
            <label class="input-label">Full Name</label>
            <input type="text" class="input" 
                   id="passenger${i}Name" 
                   placeholder="As per ID"
                   value="${p.name}">
          </div>
          
          <div class="input-group">
            <label class="input-label">Age</label>
            <input type="number" class="input" 
                   id="passenger${i}Age" 
                   placeholder="Age"
                   min="5" value="${p.age}">
          </div>
        </div>
        
        <div class="form-row form-row-cols-2">
          <div class="input-group">
            <label class="input-label">Gender</label>
            <select class="input select" id="passenger${i}Gender">
              <option value="">Select</option>
              <option value="M" ${p.gender === 'M' ? 'selected' : ''}>Male</option>
              <option value="F" ${p.gender === 'F' ? 'selected' : ''}>Female</option>
              <option value="O" ${p.gender === 'O' ? 'selected' : ''}>Other</option>
            </select>
          </div>
          
          <div class="input-group">
            <label class="input-label">ID Proof</label>
            <select class="input select" id="passenger${i}IdProof">
              <option value="AADHAR" ${p.idProof === 'AADHAR' ? 'selected' : ''}>Aadhar Card</option>
              <option value="PAN" ${p.idProof === 'PAN' ? 'selected' : ''}>PAN Card</option>
              <option value="VOTER" ${p.idProof === 'VOTER' ? 'selected' : ''}>Voter ID</option>
              <option value="PASSPORT" ${p.idProof === 'PASSPORT' ? 'selected' : ''}>Passport</option>
            </select>
          </div>
        </div>
        
        <div class="input-group">
          <label class="input-label">ID Number</label>
          <input type="text" class="input" 
                 id="passenger${i}IdNumber" 
                 placeholder="Enter ID number"
                 value="${p.idNumber}">
        </div>
      </div>
    `).join('');
  }
  
  addPassenger() {
    const state = store.getState();
    
    if (state.passengerCount >= CONFIG.MAX_PASSENGERS) {
      toast.error(`Maximum ${CONFIG.MAX_PASSENGERS} passengers allowed`);
      return;
    }
    
    const newCount = state.passengerCount + 1;
    const newPassengers = [...state.passengers, { name: '', age: '', gender: '', idProof: '', idNumber: '' }];
    
    store.setState({ passengerCount: newCount, passengers: newPassengers });
    this.renderPassengers();
    
    toast.success(`Added Passenger ${newCount}`);
  }
  
  validate() {
    const state = store.getState();
    
    if (!this.selectedClass) {
      toast.error('Please select a class');
      return false;
    }
    
    for (let i = 0; i < state.passengerCount; i++) {
      const name = utils.$(`#passenger${i}Name`)?.value;
      const age = utils.$(`#passenger${i}Age`)?.value;
      const gender = utils.$(`#passenger${i}Gender`)?.value;
      
      if (!name || !age || !gender) {
        toast.error(`Please fill all details for Passenger ${i + 1}`);
        return false;
      }
      
      if (parseInt(age) < 5) {
        toast.error('Child must be 5+ years for booking');
        return false;
      }
    }
    
    return true;
  }
}

const trainDetailFeature = new TrainDetailFeature();

// Export
window.IRCTC.TrainDetailFeature = TrainDetailFeature;