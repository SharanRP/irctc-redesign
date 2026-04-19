/**
 * IRCTC - Train List Feature Component
 */

class TrainListFeature {
  constructor(containerId = 'trainList') {
    this.container = utils.$(`#${containerId}`);
    this.trains = [];
    this.currentFilter = 'recommended';
    
    this.init();
  }
  
  init() {
    // Filter chips
    utils.$$('.filters__chip, .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        utils.$$('.filters__chip, .chip').forEach(c => c.classList.remove('chip-active'));
        chip.classList.add('chip-active');
        this.currentFilter = chip.dataset.filter;
        this.render();
      });
    });
    
    // Back button
    utils.$('#backToSearch')?.addEventListener('click', () => {
      stepManager.goToStep(1);
    });
    
    // Modify search
    utils.$('#modifySearch')?.addEventListener('click', () => {
      stepManager.goToStep(1);
    });
  }
  
  render(trains = DATA.trains) {
    this.trains = this.sort(trains);
    
    if (this.trains.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <span class="empty-state-icon">🚂</span>
          <span class="empty-state-text">No trains found</span>
        </div>
      `;
      return;
    }
    
    this.container.innerHTML = this.trains
      .map((train, index) => this.renderTrainCard(train, index))
      .join('');
    
    // Update summary
    const state = store.getState();
    utils.$('#displayFrom').textContent = state.fromStation || 'From';
    utils.$('#displayTo').textContent = state.toStation || 'To';
    utils.$('#displayDate').textContent = utils.formatDate(state.travelDate);
  }
  
  sort(trains) {
    const sorted = [...trains];
    
    switch (this.currentFilter) {
      case 'fastest':
        sorted.sort((a, b) => 
          utils.parseDuration(a.duration) - utils.parseDuration(b.duration)
        );
        break;
      case 'cheapest':
        sorted.sort((a, b) => 
          (a.classes['2A']?.price || 0) - (b.classes['2A']?.price || 0)
        );
        break;
      case 'available':
        sorted.sort((a, b) => 
          utils.getTotalAvailable(b.classes) - utils.getTotalAvailable(a.classes)
        );
        break;
      default:
        // Recommended: balance of all factors
        sorted.sort((a, b) => {
          const scoreA = b.onTimePercent - (utils.parseDuration(a.duration) / 10);
          const scoreB = a.onTimePercent - (utils.parseDuration(b.duration) / 10);
          return scoreB - scoreA;
        });
    }
    
    return sorted;
  }
  
  renderTrainCard(train, index) {
    const classesHtml = Object.entries(train.classes)
      .map(([code, data]) => {
        const statusLabel = data.status === 'available' ? 'AVL' : 
                         data.status === 'waitlist' ? 'WL' : 'NOS';
        return `
          <div class="train-class train-class-${data.status}" data-class="${code}">
            <span class="train-class-code">${code}</span>
            <span class="train-class-price">${utils.formatCurrency(data.price)}</span>
            <span class="train-class-status">${statusLabel} ${data.available}</span>
          </div>
        `;
      })
      .join('');
    
    return `
      <div class="train-card" data-train="${index}">
        <div class="train-info">
          <span class="train-number">${train.number}</span>
          <span class="train-name">${train.name}</span>
        </div>
        
        <div class="train-timing">
          <div class="train-timing-point">
            <span class="train-timing-time">${train.departureTime}</span>
            <span class="train-timing-station">${train.from}</span>
          </div>
          <div class="train-timing-duration">
            <span class="train-timing-duration-text">${train.duration}</span>
            <div class="train-timing-line"></div>
          </div>
          <div class="train-timing-point">
            <span class="train-timing-time">${train.arrivalTime}</span>
            <span class="train-timing-station">${train.to}</span>
          </div>
        </div>
        
        <div class="train-classes">
          ${classesHtml}
        </div>
        
        <button class="btn btn-primary train-action" onclick="trainListFeature.selectTrain(${index})">
          Book Now
        </button>
      </div>
    `;
  }
  
  selectTrain(index) {
    const train = this.trains[index];
    store.setState({ selectedTrain: train });
    
    events.emit('train:select', train);
    stepManager.goToStep(3);
  }
}

const trainListFeature = new TrainListFeature();

// Export
window.IRCTC.TrainListFeature = TrainListFeature;