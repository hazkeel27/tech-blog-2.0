module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_emoji: () => {
    const randomNum = Math.random();
  
    // Return a random emoji
    if (randomNum > 0.9) {
      return `<span for="img" aria-label="lightbulb">💡</span>`;
    } else if (randomNum > 0.8) {
      return `<span for="img" aria-label="laptop">💻</span>`;
    } else if (randomNum > 0.7) {
      return `<span for="img" aria-label="gear">⚙️</span>`;
    } else if (randomNum > 0.6) {
      return `<span for="img" aria-label="rocket">🚀</span>`;
    } else if (randomNum > 0.5) {
      return `<span for="img" aria-label="camera">📷</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="satellite">🛰️</span>`;
    } else if (randomNum > 0.3) {
      return `<span for="img" aria-label="globe">🌐</span>`;
    } else if (randomNum > 0.2) {
      return `<span for="img" aria-label="robot">🤖</span>`;
    } else if (randomNum > 0.1) {
      return `<span for="img" aria-label="keyboard">⌨️</span>`;
    } else {
      return `<span for="img" aria-label="calendar">📅</span>`;
    }
  },
};
