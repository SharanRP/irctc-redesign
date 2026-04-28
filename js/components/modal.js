/**
 * IRCTC - Modal Component
 */

class Modal {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });
  }

  open(id, options = {}) {
    const modal = utils.$(id);
    if (!modal) return;

    modal.classList.add('modal-active');
    this.activeModal = id;

    if (options.backdropClose !== false) {
      modal.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) this.close();
      });
    }

    document.body.style.overflow = 'hidden';
    events.emit('modal:open', id);
  }

  close(id) {
    const modal = id ? utils.$(id) : this.activeModal;
    if (!modal) return;

    modal.classList.remove('modal-active');
    this.activeModal = null;
    document.body.style.overflow = '';

    events.emit('modal:close', id);
  }

  toggle(id) {
    const modal = utils.$(id);
    if (!modal) return;

    if (modal.classList.contains('modal-active')) {
      this.close(id);
    } else {
      this.open(id);
    }
  }
}

const modal = new Modal();

// ========================================
// SIGN IN MODAL
// ========================================

function initSignInModal() {
  const signInBtn = utils.$('.header-user');
  const modalEl = utils.$('#signInModal');

  if (!signInBtn || !modalEl) return;

  signInBtn.addEventListener('click', () => {
    modal.open('#signInModal');
  });

  const closeBtn = modalEl.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close('#signInModal'));
  }

  const loginForm = modalEl.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = utils.$('#loginEmail')?.value;
      const password = utils.$('#loginPassword')?.value;

      if (!email || !password) {
        toast.error('Please enter email and password');
        return;
      }

      // Simulate login
      toast.success('Login successful!');
      modal.close('#signInModal');

      // Update header
      const userBtn = utils.$('.header-user');
      if (userBtn) {
        userBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span class="sm:hidden">${email.split('@')[0]}</span>
        `;
      }
    });
  }
}

// ========================================
// QUICK ACTION MODALS
// ========================================

function initQuickActions() {
  const quickActions = utils.$$('.quick-action');

  quickActions.forEach(action => {
    const label = action.querySelector('.quick-action-label')?.textContent?.toLowerCase() || '';
    const icon = action.querySelector('.quick-action-icon')?.textContent || '';

    action.addEventListener('click', () => {
      if (label.includes('pnr')) {
        openPNRStatusModal();
      } else if (label.includes('train status')) {
        openTrainStatusModal();
      } else if (label.includes('cancel')) {
        openCancelModal();
      } else if (label.includes('hotel')) {
        openHotelsModal();
      } else if (label.includes('availability') || label.includes('seat')) {
        openAvailabilityModal();
      } else if (label.includes('calendar')) {
        openCalendarModal();
      }
    });
  });
}

function openPNRStatusModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-md">
        <div class="modal-header">
          <h2 class="modal-title">PNR Status</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="input-label">Enter PNR Number</label>
            <input type="text" class="input" id="pnrInput" placeholder="e.g., 4728394912" maxlength="10">
          </div>
          <div id="pnrResult" style="display: none;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Cancel</button>
          <button class="btn btn-primary" onclick="checkPNRStatus()">Check Status</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('PNR Status', content);
}

function checkPNRStatus() {
  const pnr = utils.$('#pnrInput')?.value;
  if (!pnr || pnr.length !== 10) {
    toast.error('Please enter a valid 10-digit PNR');
    return;
  }

  const result = `
    <div class="pnr-result">
      <div class="pnr-result-header">
        <span class="pnr-label">PNR: ${pnr}</span>
        <span class="badge badge-success">CONFIRMED</span>
      </div>
      <div class="pnr-route">
        <span>New Delhi (NDLS)</span>
        <span class="pnr-arrow">→</span>
        <span>Mumbai Central (BSDT)</span>
      </div>
      <div class="pnr-details">
        <div class="pnr-detail"><span>Train:</span><span>12002 - Rajdhani Express</span></div>
        <div class="pnr-detail"><span>Date:</span><span>15 Jan 2025</span></div>
        <div class="pnr-detail"><span>Class:</span><span>AC 3 Tier</span></div>
        <div class="pnr-detail"><span>Coach:</span><span>S-9</span></div>
        <div class="pnr-detail"><span>Berth:</span><span>LB</span></div>
        <div class="pnr-detail"><span>Passenger:</span><span>John Doe</span></div>
      </div>
    </div>
  `;

  const resultEl = utils.$('#pnrResult');
  if (resultEl) {
    resultEl.innerHTML = result;
    resultEl.style.display = 'block';
  }
}

function openTrainStatusModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-md">
        <div class="modal-header">
          <h2 class="modal-title">Train Status</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="input-label">Train Number</label>
            <input type="text" class="input" id="trainNumInput" placeholder="e.g., 12002" maxlength="5">
          </div>
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="input-label">Journey Date</label>
            <input type="date" class="input" id="trainDateInput">
          </div>
          <div id="trainStatusResult" style="display: none;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Cancel</button>
          <button class="btn btn-primary" onclick="checkTrainStatus()">Get Status</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('Train Status', content);
}

function checkTrainStatus() {
  const trainNum = utils.$('#trainNumInput')?.value;
  const date = utils.$('#trainDateInput')?.value;

  if (!trainNum) {
    toast.error('Please enter train number');
    return;
  }

  const result = `
    <div class="train-status-result">
      <div class="status-header">
        <span class="status-train">12002 - Rajdhani Express</span>
        <span class="on-time-badge">On Time</span>
      </div>
      <div class="status-timeline">
        <div class="status-item status-completed">
          <div class="status-dot"></div>
          <div class="status-info">
            <span class="status-station">New Delhi</span>
            <span class="status-time">16:55 (Scheduled)</span>
          </div>
        </div>
        <div class="status-item status-active">
          <div class="status-dot"></div>
          <div class="status-info">
            <span class="status-station"> Kota Junction</span>
            <span class="status-time">21:42 (In Transit)</span>
          </div>
        </div>
        <div class="status-item">
          <div class="status-dot"></div>
          <div class="status-info">
            <span class="status-station">Mumbai Central</span>
            <span class="status-time">08:20 (Scheduled)</span>
          </div>
        </div>
      </div>
    </div>
  `;

  const resultEl = utils.$('#trainStatusResult');
  if (resultEl) {
    resultEl.innerHTML = result;
    resultEl.style.display = 'block';
  }
}

function openCancelModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-md">
        <div class="modal-header">
          <h2 class="modal-title">Cancel Ticket</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="input-label">Enter PNR Number</label>
            <input type="text" class="input" id="cancelPnrInput" placeholder="e.g., 4728394912" maxlength="10">
          </div>
          <div class="input-group" style="margin-bottom: var(--space-4);">
            <label class="input-label">Registered Email/Mobile</label>
            <input type="text" class="input" id="cancelEmailInput" placeholder="Email or Mobile">
          </div>
          <div id="cancelResult" style="display: none;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Cancel</button>
          <button class="btn btn-primary" onclick="checkCancelTicket()">Verify</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('Cancel Ticket', content);
}

function checkCancelTicket() {
  const pnr = utils.$('#cancelPnrInput')?.value;
  const email = utils.$('#cancelEmailInput')?.value;

  if (!pnr || pnr.length !== 10) {
    toast.error('Please enter valid PNR');
    return;
  }

  const result = `
    <div class="cancel-result">
      <div class="cancel-info">
        <span class="cancel-pnr">PNR: ${pnr}</span>
        <span class="badge badge-success">CONFIRMED</span>
      </div>
      <div class="cancel-details">
        <div class="cancel-detail"><span>Train:</span><span>12002 - Rajdhani Express</span></div>
        <div class="cancel-detail"><span>Journey:</span><span>New Delhi → Mumbai Central</span></div>
        <div class="cancel-detail"><span>Date:</span><span>15 Jan 2025</span></div>
        <div class="cancel-detail"><span>Passenger:</span><span>John Doe</span></div>
      </div>
      <div class="cancel-refund">
        <span class="refund-label">Estimated Refund:</span>
        <span class="refund-amount">₹912</span>
      </div>
      <p class="cancel-note">Refund will be processed to source payment method within 5-7 working days.</p>
    </div>
  `;

  const resultEl = utils.$('#cancelResult');
  if (resultEl) {
    resultEl.innerHTML = result;
    resultEl.style.display = 'block';
  }
}

function openHotelsModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-lg">
        <div class="modal-header">
          <h2 class="modal-title">Book Hotels</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="hotel-search">
            <div class="form-row form-row-cols-2" style="margin-bottom: var(--space-4);">
              <div class="input-group">
                <label class="input-label">City/Hotel</label>
                <input type="text" class="input" placeholder="Enter city name">
              </div>
              <div class="input-group">
                <label class="input-label">Check-in Date</label>
                <input type="date" class="input">
              </div>
            </div>
            <div class="form-row form-row-cols-2" style="margin-bottom: var(--space-4);">
              <div class="input-group">
                <label class="input-label">Check-out Date</label>
                <input type="date" class="input">
              </div>
              <div class="input-group">
                <label class="input-label">Guests</label>
                <select class="input select">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>
          </div>
          <div class="hotel-results" style="margin-top: var(--space-6);">
            <h4 style="margin-bottom: var(--space-4);">Popular Destinations</h4>
            <div class="hotel-grid">
              <div class="hotel-card">
                <div class="hotel-img" style="height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-lg);"></div>
                <div class="hotel-info">
                  <h5 class="hotel-name">Mumbai</h5>
                  <span class="hotel-price">from ₹1,299</span>
                </div>
              </div>
              <div class="hotel-card">
                <div class="hotel-img" style="height: 120px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: var(--radius-lg);"></div>
                <div class="hotel-info">
                  <h5 class="hotel-name">Delhi</h5>
                  <span class="hotel-price">from ₹999</span>
                </div>
              </div>
              <div class="hotel-card">
                <div class="hotel-img" style="height: 120px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: var(--radius-lg);"></div>
                <div class="hotel-info">
                  <h5 class="hotel-name">Bangalore</h5>
                  <span class="hotel-price">from ₹1,499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Close</button>
          <button class="btn btn-primary">Search Hotels</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('Hotels', content);
}

function openAvailabilityModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-lg">
        <div class="modal-header">
          <h2 class="modal-title">Seat Availability</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-row form-row-cols-2" style="margin-bottom: var(--space-4);">
            <div class="input-group">
              <label class="input-label">From Station</label>
              <input type="text" class="input" placeholder="Enter station">
            </div>
            <div class="input-group">
              <label class="input-label">To Station</label>
              <input type="text" class="input" placeholder="Enter station">
            </div>
          </div>
          <div class="form-row form-row-cols-3" style="margin-bottom: var(--space-4);">
            <div class="input-group">
              <label class="input-label">Date</label>
              <input type="date" class="input">
            </div>
            <div class="input-group">
              <label class="input-label">Class</label>
              <select class="input select">
                <option>All Classes</option>
                <option>AC First Class (1A)</option>
                <option>AC 2 Tier (2A)</option>
                <option>AC 3 Tier (3A)</option>
                <option>Sleeper (SL)</option>
              </select>
            </div>
            <div class="input-group">
              <label class="input-label">Quota</label>
              <select class="input select">
                <option>General</option>
                <option>Tatkal</option>
                <option>Ladies</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Close</button>
          <button class="btn btn-primary">Check Availability</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('Seat Availability', content);
}

function openCalendarModal() {
  const content = `
    <div class="modal-overlay">
      <div class="modal-container modal-md">
        <div class="modal-header">
          <h2 class="modal-title">Calendar View</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="calendar-container">
            <div class="calendar-header">
              <button class="calendar-nav">&lt;</button>
              <span class="calendar-month">January 2025</span>
              <button class="calendar-nav">&gt;</button>
            </div>
            <div class="calendar-grid">
              <div class="calendar-day-header">Sun</div>
              <div class="calendar-day-header">Mon</div>
              <div class="calendar-day-header">Tue</div>
              <div class="calendar-day-header">Wed</div>
              <div class="calendar-day-header">Thu</div>
              <div class="calendar-day-header">Fri</div>
              <div class="calendar-day-header">Sat</div>
              ${generateCalendarDays()}
            </div>
          </div>
          <div class="calendar-legend" style="margin-top: var(--space-4);">
            <div class="legend-item">
              <span class="legend-dot" style="background: var(--color-success);"></span>
              <span>Available</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: var(--color-warning);"></span>
              <span>Waitlist</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: var(--color-border);"></span>
              <span>Not Available</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="modal.close('#quickActionModal')">Close</button>
        </div>
      </div>
    </div>
  `;

  showQuickActionModal('Calendar', content);
}

function generateCalendarDays() {
  let html = '';
  for (let i = 0; i < 35; i++) {
    const day = i - 3; // Start from some offset to align properly
    const date = day > 0 && day <= 31 ? day : '';
    const status = date ? (date % 3 === 0 ? 'available' : date % 3 === 1 ? 'waitlist' : 'unavailable') : '';
    html += `<div class="calendar-day ${status ? 'calendar-day-' + status : ''}">${date}</div>`;
  }
  return html;
}

function showQuickActionModal(title, content) {
  let modalEl = utils.$('#quickActionModal');

  if (modalEl) {
    modalEl.remove();
  }

  modalEl = utils.createElement(`<div id="quickActionModal">${content}</div>`);
  document.body.appendChild(modalEl);

  const closeBtn = modalEl.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close('#quickActionModal'));
  }

  modal.open('#quickActionModal');
}

// Export
window.IRCTC.Modal = Modal;
window.modal = modal;