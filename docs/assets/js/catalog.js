document.addEventListener('DOMContentLoaded', function() {
  // Brand card clicks
  document.querySelectorAll('.brand-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var brandId = this.dataset.brand;

      // Hide brand cards
      document.getElementById('brand-cards').classList.add('hidden');

      // Show equipment cards for this brand
      document.getElementById('equipment-' + brandId).classList.remove('hidden');
    });
  });

  // Equipment card clicks
  document.querySelectorAll('.equipment-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var brandId = this.dataset.brand;
      var equipType = this.dataset.equipment;

      // Hide equipment cards
      document.getElementById('equipment-' + brandId).classList.add('hidden');

      // Show parts for this equipment
      document.getElementById('parts-' + brandId + '-' + equipType).classList.remove('hidden');
    });
  });

  // Back navigation
  document.querySelectorAll('.back-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var backTo = this.dataset.back;
      var brandId = this.dataset.brand;

      if (backTo === 'brands') {
        // Hide all equipment and parts sections
        document.querySelectorAll('.equipment-section, .parts-section').forEach(function(section) {
          section.classList.add('hidden');
        });
        // Show brand cards
        document.getElementById('brand-cards').classList.remove('hidden');
      } else if (backTo === 'equipment') {
        // Hide parts section
        document.querySelectorAll('.parts-section').forEach(function(section) {
          section.classList.add('hidden');
        });
        // Show equipment cards for this brand
        document.getElementById('equipment-' + brandId).classList.remove('hidden');
      }
    });
  });

  // Compatible devices toggle
  document.querySelectorAll('.compatible-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var list = this.nextElementSibling;
      list.classList.toggle('hidden');
      if (list.classList.contains('hidden')) {
        this.textContent = this.textContent.replace('▲', '▼');
      } else {
        this.textContent = this.textContent.replace('▼', '▲');
      }
    });
  });

  // Close compatible list when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.compatible-section')) {
      document.querySelectorAll('.compatible-list:not(.hidden)').forEach(function(list) {
        list.classList.add('hidden');
        var toggle = list.previousElementSibling;
        toggle.textContent = toggle.textContent.replace('▲', '▼');
      });
    }
  });
});
