/**
 * IRCTC - Language/i18n Component
 */

class I18n {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = {};
    
    this.init();
  }
  
  init() {
    // Define translations
    this.translations = {
      en: {
        // Header
        'sign_in': 'Sign In',
        'your_journey_begins': 'Your Journey Begins Here',
        
        // Search
        'from': 'From',
        'to': 'To',
        'travel_date': 'Travel Date',
        'travel_class': 'Class',
        'quota': 'Quota',
        'search_trains': 'Search Trains',
        'one_way': 'One Way',
        'round_trip': 'Round Trip',
        'multi_city': 'Multi-City',
        'enter_station': 'Enter station name',
        
        // Classes
        'all_classes': 'All Classes',
        'ac_first': 'AC First Class (1A)',
        'ac_2tier': 'AC 2 Tier (2A)',
        'ac_3tier': 'AC 3 Tier (3A)',
        'sleeper': 'Sleeper (SL)',
        'ac_chair': 'AC Chair Car (CC)',
        
        // Quotas
        'general': 'General',
        'tatkal': 'Tatkal',
        'ladies': 'Ladies',
        'divyang': 'Divyang',
        'senior': 'Senior Citizen',
        
        // Quick Actions
        'pnr_status': 'PNR Status',
        'train_status': 'Train Status',
        'cancel_ticket': 'Cancel Ticket',
        'hotels': 'Hotels',
        'seat_availability': 'Seat Availability',
        'calendar_view': 'Calendar View',
        
        // Buttons
        'back': 'Back',
        'book_now': 'Book Now',
        'continue': 'Continue',
        'modify_search': 'Modify Search',
        'add_passenger': 'Add Another Passenger',
        'continue_to_payment': 'Continue to Payment',
        'pay_now': 'Pay Now',
        'resend_eticket': 'Resend E-Ticket',
        'add_to_wallet': 'Add to Wallet',
        'book_return': 'Book Return',
        
        // Train Results
        'recommended': 'Recommended',
        'fastest': 'Fastest',
        'cheapest': 'Cheapest',
        'available': 'Available',
        
        // Passenger
        'passenger_details': 'Passenger Details',
        'passenger': 'Passenger',
        'adult': 'Adult',
        'full_name': 'Full Name',
        'age': 'Age',
        'gender': 'Gender',
        'id_proof': 'ID Proof',
        'id_number': 'ID Number',
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'as_per_id': 'As per ID',
        
        // ID Types
        'aadhar': 'Aadhar Card',
        'pan': 'PAN Card',
        'voter': 'Voter ID',
        'passport': 'Passport',
        
        // Payment
        'fare_summary': 'Fare Summary',
        'base_fare': 'Base Fare',
        'superfast': 'Superfast Charge',
        'gst': 'GST (5%)',
        'total_amount': 'Total Amount',
        'payment_method': 'Payment Method',
        'upi': 'UPI',
        'card': 'Card',
        'netbanking': 'Net Banking',
        'wallet': 'Wallet',
        'instant_transfer': 'Instant transfer',
        'scan_qr': 'Scan QR to Pay',
        'enter_upi': 'Or enter UPI ID',
        'secure': '100% Secure. We do not store card details.',
        'secure_payment': 'Secure Payment',
        
        // Confirmation
        'booking_confirmed': 'Booking Confirmed!',
        'ticket_booked': 'Your ticket has been booked successfully',
        'pnr_number': 'PNR Number',
        
        // Labels
        'train_name': 'Train',
        'seat_berth': 'Seat/Berth',
        'select_class': 'Select Class',
        
        // Toasts
        'select_stations': 'Please select both stations',
        'select_date': 'Please select a travel date',
        'different_stations': 'From and To stations must be different',
        'select_class': 'Please select a class',
        'fill_details': 'Please fill all details',
        'max_passengers': 'Maximum passengers allowed',
        'payment_success': 'Payment successful! Booking confirmed.',
        'stations_swapped': 'Stations swapped',
        'added_passenger': 'Added Passenger',
        
        // Filters
        'train_number': 'Train No.',
      },
      hi: {
        // Header
        'sign_in': 'साइन इन',
        'your_journey_begins': 'आपकी यात्रा यहाँ से शुरू होती है',
        
        // Search
        'from': 'कहाँ से',
        'to': 'कहाँ तक',
        'travel_date': 'यात्रा तिथि',
        'travel_class': 'वर्ग',
        'quota': 'कोटा',
        'search_trains': 'ट्रेन खोजें',
        'one_way': 'एक तरफ',
        'round_trip': 'राउंड ट्रिप',
        'multi_city': 'मल्टी सिटी',
        'enter_station': 'स्टेशन का नाम दर्ज करें',
        
        // Classes
        'all_classes': 'सभी श्रेणियाँ',
        'ac_first': 'एसी प्रथम (1A)',
        'ac_2tier': 'एसी 2 टियर (2A)',
        'ac_3tier': 'एसी 3 टियर (3A)',
        'sleeper': 'स्लीपर (SL)',
        'ac_chair': 'एसी चेयर कार (CC)',
        
        // Quotas
        'general': 'सामान्य',
        'tatkal': 'तत्काल',
        'ladies': 'महिला',
        'divyang': 'दिव्यांग',
        'senior': 'वरिष्ठ नागरिक',
        
        // Quick Actions
        'pnr_status': 'पीएनआर स्थिति',
        'train_status': 'ट्रेन स्थिति',
        'cancel_ticket': 'टिकट रद्द करें',
        'hotels': 'होटल',
        'seat_availability': 'सीट उपलब्धता',
        'calendar_view': 'कैलेंडर व्यू',
        
        // Buttons
        'back': 'वापस',
        'book_now': 'अभी बुक करें',
        'continue': 'जारी रखें',
        'modify_search': 'खोज बदलें',
        'add_passenger': 'यात्री जोड़ें',
        'continue_to_payment': 'भुगतान जारी रखें',
        'pay_now': 'अभी भुगतान करें',
        'resend_eticket': 'ई-टिकट भेजें',
        'add_to_wallet': 'वॉलेट में जोड़ें',
        'book_return': 'रिटर्न बुक करें',
        
        // Train Results
        'recommended': 'सुझाया गया',
        'fastest': 'सबसे तेज',
        'cheapest': 'सबसे सस्ता',
        'available': 'उपलब्ध',
        
        // Passenger
        'passenger_details': 'यात्री विवरण',
        'passenger': 'यात्री',
        'adult': 'वयस्क',
        'full_name': 'पूरा नाम',
        'age': 'आयु',
        'gender': 'लिंग',
        'id_proof': 'पहचान पत्र',
        'id_number': 'पहचान संख्या',
        'male': 'पुरुष',
        'female': 'महिला',
        'other': 'अन्य',
        'as_per_id': 'पहचान पत्र के अनुसार',
        
        // ID Types
        'aadhar': 'आधार कार्ड',
        'pan': 'पैन कार्ड',
        'voter': 'मतदाता पहचान पत्र',
        'passport': 'पासपोर्ट',
        
        // Payment
        'fare_summary': 'किराया सारांश',
        'base_fare': 'बेस किराया',
        'superfast': 'सुपरफास्ट शुल्क',
        'gst': 'जीएसटी (5%)',
        'total_amount': 'कुल राशि',
        'payment_method': 'भुगतान विधि',
        'upi': 'यूपीआई',
        'card': 'कार्ड',
        'netbanking': 'नेट बैंकिंग',
        'wallet': 'वॉलेट',
        'instant_transfer': 'तुरंत ट्रांसफर',
        'scan_qr': 'क्यूआर कोड स्कैन करें',
        'enter_upi': 'या यूपीआई आईडी दर्ज करें',
        'secure': '100% सुरक्षित। हम कार्ड विवरण संग्रहित नहीं करते।',
        'secure_payment': 'सुरक्षित भुगतान',
        
        // Confirmation
        'booking_confirmed': 'बुकिंग पुष्टि!',
        'ticket_booked': 'आपका टिकट सफलतापूर्वक बुक हो गया है',
        'pnr_number': 'पीएनआर नंबर',
        
        // Labels
        'train_name': 'ट्रेन',
        'seat_berth': 'सीट/बर्थ',
        'select_class': 'वर्ग चुनें',
        
        // Toasts
        'select_stations': 'कृपया दोनों स्टेशन चुनें',
        'select_date': 'कृपया यात्रा तिथि चुनें',
        'different_stations': 'से और तक स्टेशन अलग होने चाहिए',
        'select_class': 'कृपया वर्ग चुनें',
        'fill_details': 'कृपया सभी विवरण भरें',
        'max_passengers': 'अधिकतम यात्री की सीमा',
        'payment_success': 'भुगतान सफल! बुकिंग पुष्टि।',
        'stations_swapped': 'स्टेशन बदल दिए गए',
        'added_passenger': 'यात्री जोड़ा गया',
        
        // Filters
        'train_number': 'ट्रेन नं.',
      }
    };
    
    // Setup language toggle buttons
    this.setupToggle();
  }
  
  setupToggle() {
    const langBtns = document.querySelectorAll('.header-lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.textContent === 'EN' ? 'en' : 'hi';
        this.setLanguage(lang);
      });
    });
  }
  
  setLanguage(lang) {
    this.currentLanguage = lang;
    
    // Update buttons
    const langBtns = document.querySelectorAll('.header-lang-btn');
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.textContent.toLowerCase() === (lang === 'en' ? 'en' : 'हि'));
    });
    
    // Update all translatable elements
    this.updateTranslations();
    
    // Emit event
    events.emit('language:change', lang);
  }
  
  t(key) {
    return this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key;
  }
  
  updateTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        el.textContent = translation;
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = this.t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });
    
    // Update specific elements manually
    this.updateManualTranslations();
  }
  
  updateManualTranslations() {
    const lang = this.currentLanguage;
    
    // Header tagline
    const tagline = document.querySelector('.header-tagline');
    if (tagline) {
      tagline.textContent = lang === 'hi' ? 'आपकी यात्रा यहाँ से शुरू होती है' : 'Your Journey Begins Here';
    }
    
    // Journey tabs
    const tabs = document.querySelectorAll('.journey-tab');
    if (tabs[0]) tabs[0].innerHTML = lang === 'hi' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> एक तरफ' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> One Way';
    if (tabs[1]) tabs[1].innerHTML = lang === 'hi' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg> राउंड ट्रिप' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg> Round Trip';
    if (tabs[2]) tabs[2].innerHTML = lang === 'hi' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg> मल्टी सिटी' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg> Multi-City';
    
    // Search button
    const searchBtn = document.querySelector('.search-submit');
    if (searchBtn) {
      searchBtn.innerHTML = lang === 'hi' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> ट्रेन खोजें'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> Search Trains';
    }
    
    // Class options
    const classSelect = document.getElementById('travelClass');
    if (classSelect) {
      const options = classSelect.querySelectorAll('option');
      if (options[0]) options[0].text = lang === 'hi' ? 'सभी श्रेणियाँ' : 'All Classes';
      if (options[1]) options[1].text = lang === 'hi' ? 'एसी प्रथम (1A)' : 'AC First Class (1A)';
      if (options[2]) options[2].text = lang === 'hi' ? 'एसी 2 टियर (2A)' : 'AC 2 Tier (2A)';
      if (options[3]) options[3].text = lang === 'hi' ? 'एसी 3 टियर (3A)' : 'AC 3 Tier (3A)';
      if (options[4]) options[4].text = lang === 'hi' ? 'स्लीपर (SL)' : 'Sleeper (SL)';
      if (options[5]) options[5].text = lang === 'hi' ? 'एसी चेयर (CC)' : 'AC Chair Car (CC)';
    }
    
    // Quota options
    const quotaSelect = document.getElementById('quota');
    if (quotaSelect) {
      const options = quotaSelect.querySelectorAll('option');
      if (options[0]) options[0].text = lang === 'hi' ? 'सामान्य' : 'General';
      if (options[1]) options[1].text = lang === 'hi' ? 'तत्काल' : 'Tatkal';
      if (options[2]) options[2].text = lang === 'hi' ? 'महिला' : 'Ladies';
      if (options[3]) options[3].text = lang === 'hi' ? 'दिव्यांग' : 'Divyang';
      if (options[4]) options[4].text = lang === 'hi' ? 'वरिष्ठ' : 'Senior Citizen';
    }
    
    // Quick actions
    const quickActions = document.querySelectorAll('.quick-action-label');
    if (quickActions[0]) quickActions[0].textContent = lang === 'hi' ? 'पीएनआर' : 'PNR Status';
    if (quickActions[1]) quickActions[1].textContent = lang === 'hi' ? 'ट्रेन स्थिति' : 'Train Status';
    if (quickActions[2]) quickActions[2].textContent = lang === 'hi' ? 'रद्द करें' : 'Cancel Ticket';
    if (quickActions[3]) quickActions[3].textContent = lang === 'hi' ? 'होटल' : 'Hotels';
    if (quickActions[4]) quickActions[4].textContent = lang === 'hi' ? 'सीट' : 'Seat Availability';
    if (quickActions[5]) quickActions[5].textContent = lang === 'hi' ? 'कैलेंडर' : 'Calendar View';
    
    // Continue button
    const continueBtn = document.getElementById('continueToPayment');
    if (continueBtn) {
      continueBtn.innerHTML = lang === 'hi'
        ? 'भुगतान जारी रखें <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
        : 'Continue to Payment <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    }
    
    // Back buttons
    const backBtn = document.getElementById('backToSearch');
    if (backBtn) {
      backBtn.innerHTML = lang === 'hi'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> वापस'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back';
    }
    
    // Add passenger button
    const addPassengerBtn = document.getElementById('addPassengerBtn');
    if (addPassengerBtn) {
      addPassengerBtn.innerHTML = lang === 'hi'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> यात्री जोड़ें'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Another Passenger';
    }
    
    // Confirmation title
    const confirmTitle = document.querySelector('.confirmation-title');
    if (confirmTitle) {
      confirmTitle.textContent = lang === 'hi' ? 'बुकिंग पुष्टि!' : 'Booking Confirmed!';
    }
    
    // Confirmation message
    const confirmMessage = document.querySelector('.confirmation-message');
    if (confirmMessage) {
      confirmMessage.textContent = lang === 'hi' ? 'आपका टिकट सफलतापूर्वक बुक हो गया है' : 'Your ticket has been booked successfully';
    }
  }
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Create global instance
const i18n = new I18n();

// Export
window.IRCTC.I18n = I18n;
window.i18n = i18n;