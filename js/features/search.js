/**
 * IRCTC - Search Feature Component
 */

class SearchFeature {
  constructor(containerId = 'step-search') {
    this.container = utils.$(`#${containerId}`);
    this.form = utils.$('#searchForm');
    this.fromInput = utils.$('#fromStation');
    this.toInput = utils.$('#toStation');
    this.dateInput = utils.$('#travelDate');
    this.classInput = utils.$('#travelClass');
    this.quotaInput = utils.$('#quota');
    
    this.fromAutocomplete = null;
    this.toAutocomplete = null;
    
    this.init();
  }
  
  init() {
    // Initialize autocompletes
    this.fromAutocomplete = new Autocomplete(this.fromInput, {
      data: DATA.stations,
      onSelect: (item) => {
        store.setState({ fromStation: item.name });
        toast.success(`From: ${item.name}`);
      }
    });
    
    this.toAutocomplete = new Autocomplete(this.toInput, {
      data: DATA.stations,
      onSelect: (item) => {
        store.setState({ toStation: item.name });
        toast.success(`To: ${item.name}`);
      }
    });
    
    // Set minimum date
    const today = new Date().toISOString().split('T')[0];
    this.dateInput.min = today;
    this.dateInput.value = today;
    
    // Event listeners
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Swap button
    utils.$('#swapStations')?.addEventListener('click', () => this.swap());
    
    // Journey type tabs
    utils.$$('.journey-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        utils.$$('.journey-tab').forEach(t => t.classList.remove('journey-tab-active'));
        tab.classList.add('journey-tab-active');
        store.setState({ journeyType: tab.dataset.type });
      });
    });
  }
  
handleSubmit(e) {
    e.preventDefault();

    const from = this.fromInput.value.trim();
    const to = this.toInput.value.trim();

    if (!from || !to) {
      toast.error('Please select both stations');
      return;
    }

    if (!this.dateInput.value) {
      toast.error('Please select a travel date');
      return;
    }

    if (from === to) {
      toast.error('From and To stations must be different');
      return;
    }

    store.setState({
      fromStation: from,
      toStation: to,
      travelDate: this.dateInput.value,
      travelClass: this.classInput.value,
      quota: this.quotaInput.value
    });

    stepManager.goToStep(2);
  }
  
swap() {
    const from = this.fromInput.value;
    const to = this.toInput.value;

    this.fromInput.value = to;
    this.toInput.value = from;

    store.setState({
      fromStation: to,
      toStation: from
    });

    toast.success('Stations swapped');
  }
  
  getData() {
    return {
      from: this.fromInput.value,
      to: this.toInput.value,
      date: this.dateInput.value,
      class: this.classInput.value,
      quota: this.quotaInput.value
    };
  }
}

// Export
window.IRCTC.SearchFeature = SearchFeature;