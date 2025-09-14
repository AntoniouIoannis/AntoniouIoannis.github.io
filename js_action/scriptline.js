document.addEventListener('DOMContentLoaded', function() {
  // Βρες το card για το 2025
  const card2025 = document.querySelector('.timeline-card[data-year="2025"]');
  
  // Προσθήκη event listener για click
  if (card2025) {
    card2025.addEventListener('click', function() {
      // Άνοιγμα του Coding Factory link σε νέα καρτέλα
      window.open('https://codingfactory.aueb.gr/', '_blank');
    });
    
    // Αλλαγή cursor σε pointer για να δείχνει ότι είναι clickable
    card2025.style.cursor = 'pointer';
    
    // Προσθήκη μικρής διαφοράς στο hover για το συγκεκριμένο card
    card2025.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.02)';
      this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.2)';
    });
    
    card2025.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    });
  }
  
  // Προαιρετικά: κάνε όλα τα cards clickable με τα δικά τους links
  const allCards = document.querySelectorAll('.timeline-card');
  allCards.forEach(card => {
    // Προσθήκη pointer cursor σε όλα τα cards
    card.style.cursor = 'pointer';
    
    // Προσθήκη hover effect σε όλα τα cards
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
  });
});
