/**
 * IRCTC - Autocomplete Component
 */

class Autocomplete {
  constructor(inputElement, options = {}) {
    this.input = inputElement;
    this.options = {
      data: [],
      placeholder: 'Search...',
      onSelect: () => {},
      renderItem: (item) => this.defaultRender(item),
      filter: (query, item) => this.defaultFilter(query, item),
      minChars: 2,
      maxResults: 6,
      ...options
    };
    
    this.isOpen = false;
    this.selectedIndex = -1;
    this.items = [];
    this.dropdown = null;
    
    this.init();
  }
  
  init() {
    // Create dropdown
    this.dropdown = utils.createElement(
      `<div class="search-field-dropdown"></div>`
    );
    this.input.parentElement.appendChild(this.dropdown);
    
    // Event listeners
    this.input.addEventListener('input', utils.debounce(() => this.handleInput(), 150));
    this.input.addEventListener('focus', () => this.handleInput());
    this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
    this.input.addEventListener('click', (e) => e.stopPropagation());
    
    // Close on outside click
    document.addEventListener('click', () => this.close());
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }
  
  defaultRender(item) {
    return `
      <div class="search-field-option" data-value="${item.code}">
        <span class="search-field-code">${item.code}</span>
        <span>${item.name}</span>
      </div>
    `;
  }
  
  defaultFilter(query, item) {
    const q = query.toLowerCase();
    return item.name.toLowerCase().includes(q) || 
           item.code.toLowerCase().includes(q);
  }
  
  handleInput() {
    const query = this.input.value;
    
    if (query.length < this.options.minChars) {
      this.close();
      return;
    }
    
    const filtered = this.options.data
      .filter(item => this.options.filter(query, item))
      .slice(0, this.options.maxResults);
    
    if (filtered.length === 0) {
      this.close();
      return;
    }
    
    this.items = filtered;
    this.render(filtered);
    this.open();
  }
  
  render(items) {
    this.dropdown.innerHTML = '';
    items.forEach((item, index) => {
      const el = utils.createElement(this.options.renderItem(item));
      el.dataset.index = index;
      el.addEventListener('mousedown', (e) => {
        // use mousedown to prevent input blur before click fires
        e.preventDefault(); 
        this.select(items[index]);
      });
      el.addEventListener('mouseenter', () => this.setSelected(index));
      this.dropdown.appendChild(el);
    });
    
    this.selectedIndex = -1;
  }
  
  handleKeydown(e) {
    if (!this.isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.setSelected(Math.min(this.selectedIndex + 1, this.items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setSelected(Math.max(this.selectedIndex - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (this.selectedIndex >= 0) {
          this.select(this.items[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
  
  setSelected(index) {
    this.selectedIndex = index;
    
    this.dropdown.querySelectorAll('.search-field-option').forEach((el, i) => {
      el.classList.toggle('search-field-option-selected', i === index);
    });
    
    // Scroll into view
    const selected = this.dropdown.querySelector('.search-field-option-selected');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }
  
  select(item) {
    this.input.value = item.name;
    this.options.onSelect(item);
    this.close();
    this.input.focus();
  }
  
  open() {
    this.dropdown.classList.add('search-field-dropdown-show');
    this.isOpen = true;
  }
  
  close() {
    this.dropdown.classList.remove('search-field-dropdown-show');
    this.isOpen = false;
    this.selectedIndex = -1;
  }
  
  setData(data) {
    this.options.data = data;
  }
  
  getValue() {
    return this.input.value;
  }
  
  setValue(value) {
    this.input.value = value;
  }
  
  clear() {
    this.input.value = '';
    this.close();
  }
}

// Export
window.IRCTC.Autocomplete = Autocomplete;