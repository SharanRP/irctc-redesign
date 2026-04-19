/**
 * IRCTC - Static Data
 * Mock data for development
 */

const DATA = {
  // Stations
  stations: [
    { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', zone: 'NR' },
    { code: 'BSDT', name: 'Mumbai Central', city: 'Mumbai', zone: 'WR' },
    { code: 'MAS', name: 'Chennai Central', city: 'Chennai', zone: 'SR' },
    { code: 'SBC', name: 'Bangalore City', city: 'Bangalore', zone: 'SWR' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', zone: 'ER' },
    { code: 'CST', name: 'Mumbai CST', city: 'Mumbai', zone: 'WR' },
    { code: 'SC', name: 'Secunderabad', city: 'Hyderabad', zone: 'SC' },
    { code: 'DHN', name: 'Dhanbad', city: 'Dhanbad', zone: 'ECR' },
    { code: 'JHS', name: 'Jhansi', city: 'Jhansi', zone: 'NCR' },
    { code: 'BCT', name: 'Mumbai Borivali', city: 'Mumbai', zone: 'WR' },
    { code: 'GZB', name: 'Ghaziabad', city: 'Ghaziabad', zone: 'NR' },
    { code: 'CNB', name: 'Kanpur Central', city: 'Kanpur', zone: 'NCR' },
    { code: 'ADI', name: 'Ahmedabad', city: 'Ahmedabad', zone: 'WR' },
    { code: 'PUNE', name: 'Pune Junction', city: 'Pune', zone: 'CR' },
    { code: 'LDH', name: 'Ludhiana', city: 'Ludhiana', zone: 'NR' },
    { code: 'BSP', name: 'Bilaspur', city: 'Bilaspur', zone: 'SECR' },
    { code: 'R', name: 'Raipur', city: 'Raipur', zone: 'SECR' },
    { code: 'BKI', name: 'Bhopal', city: 'Bhopal', zone: 'WCR' },
    { code: 'JAT', name: 'Jammu', city: 'Jammu', zone: 'NR' },
    { code: 'SVD', name: 'Kota', city: 'Kota', zone: 'WCR' }
  ],

  // Trains
  trains: [
    {
      number: '12002',
      name: 'Rajdhani Express',
      from: 'NDLS',
      to: 'BSDT',
      departureTime: '16:55',
      arrivalTime: '08:20',
      duration: '15h 25m',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      classes: {
        '1A': { available: 12, price: 2340, status: 'available' },
        '2A': { available: 45, price: 1380, status: 'available' },
        '3A': { available: 0, price: 960, status: 'waitlist' },
        'CC': { available: 89, price: 580, status: 'available' }
      },
      onTimePercent: 94
    },
    {
      number: '12952',
      name: 'Mumbai Rajdhani',
      from: 'NDLS',
      to: 'BSDT',
      departureTime: '15:15',
      arrivalTime: '07:05',
      duration: '15h 50m',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      classes: {
        '1A': { available: 8, price: 2340, status: 'available' },
        '2A': { available: 32, price: 1380, status: 'available' },
        '3A': { available: 156, price: 960, status: 'available' },
        'CC': { available: 45, price: 580, status: 'available' }
      },
      onTimePercent: 91
    },
    {
      number: '22210',
      name: 'Sampark Kranti',
      from: 'NDLS',
      to: 'BSDT',
      departureTime: '20:00',
      arrivalTime: '11:50',
      duration: '15h 50m',
      days: ['MON', 'WED', 'FRI', 'SAT'],
      classes: {
        '1A': { available: 0, price: 2280, status: 'unavailable' },
        '2A': { available: 18, price: 1340, status: 'available' },
        '3A': { available: 67, price: 920, status: 'available' },
        'SL': { available: 234, price: 380, status: 'available' }
      },
      onTimePercent: 87
    },
    {
      number: '19011',
      name: 'Gujarat Mail',
      from: 'NDLS',
      to: 'BSDT',
      departureTime: '07:25',
      arrivalTime: '23:45',
      duration: '16h 20m',
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      classes: {
        '1A': { available: 5, price: 2150, status: 'available' },
        '2A': { available: 23, price: 1280, status: 'available' },
        '3A': { available: 89, price: 880, status: 'available' },
        'SL': { available: 312, price: 350, status: 'available' }
      },
      onTimePercent: 78
    },
    {
      number: '19131',
      name: 'Kota Somra',
      from: 'NDLS',
      to: 'BSDT',
      departureTime: '06:35',
      arrivalTime: '22:30',
      duration: '15h 55m',
      days: ['TUE', 'THU', 'SAT'],
      classes: {
        '2A': { available: 0, price: 1250, status: 'unavailable' },
        '3A': { available: 45, price: 860, status: 'available' },
        'SL': { available: 189, price: 340, status: 'available' }
      },
      onTimePercent: 72
    }
  ],

  // Class names
  classNames: {
    '1A': 'AC First Class',
    '2A': 'AC 2 Tier',
    '3A': 'AC 3 Tier',
    'SL': 'Sleeper',
    'CC': 'AC Chair Car',
    'EC': 'Executive AC'
  },

  // Quota names
  quotaNames: {
    'GN': 'General',
    'TQ': 'Tatkal',
    'LD': 'Ladies',
    'DP': 'Divyang',
    'SR': 'Senior Citizen'
  },

  // Journey types
  journeyTypes: {
    'one-way': 'One Way',
    'round-trip': 'Round Trip',
    'multi-city': 'Multi-City'
  }
};

// Export
window.IRCTC.DATA = DATA;