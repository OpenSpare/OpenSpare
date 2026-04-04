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

  // Appliance search functionality
  var searchInput = document.getElementById('appliance-search');
  var searchResults = document.getElementById('search-results');
  var searchResultsCount = document.getElementById('search-results-count');
  var searchResultsCards = document.getElementById('search-results-cards');

  if (searchInput && typeof partsData !== 'undefined') {
    searchInput.addEventListener('input', function() {
      var query = this.value.trim().toUpperCase();

      if (query.length < 3) {
        searchResults.classList.add('hidden');
        searchResultsCards.innerHTML = '';
        return;
      }

      // Search through all parts
      var matchingParts = [];
      partsData.brands.forEach(function(brand) {
        brand.equipment.forEach(function(equip) {
          equip.parts.forEach(function(part) {
            if (part.compatible && part.compatible.length > 0) {
              var matchingDevices = part.compatible.filter(function(device) {
                return device.model.toUpperCase().includes(query);
              });
              if (matchingDevices.length > 0) {
                matchingParts.push({
                  brand: brand.name,
                  equipment: equip.name,
                  part: part,
                  matchingDevices: matchingDevices
                });
              }
            }
          });
        });
      });

      // Display results
      if (matchingParts.length > 0) {
        searchResultsCount.textContent = matchingParts.length + ' part(s) found for "' + query + '"';
        searchResultsCards.innerHTML = '';
        searchResultsCards.className = 'parts-grid';

        matchingParts.forEach(function(match) {
          var part = match.part;
          var card = document.createElement('div');
          card.className = 'card part-card';

          var imgSrc = part.image;
          if (!imgSrc.includes('http')) {
            imgSrc = document.baseURI.replace(/\/[^\/]*$/, '') + imgSrc;
          }

          // Build matching devices list
          var maxDisplay = 10;
          var totalDevices = match.matchingDevices.length;
          var devicesToShow = match.matchingDevices.slice(0, maxDisplay);

          var matchingHtml = '<div class="matching-devices"><span class="matching-label">Matches:</span><ul class="matching-list">';
          devicesToShow.forEach(function(d) {
            matchingHtml += '<li>' + d.brand + ' ' + d.model + '</li>';
          });
          matchingHtml += '</ul>';
          if (totalDevices > maxDisplay) {
            matchingHtml += '<span class="matching-more">(+ ' + (totalDevices - maxDisplay) + ' more)</span>';
          }
          matchingHtml += '</div>';

          card.innerHTML = '<img src="' + imgSrc + '" alt="' + part.reference + '" class="part-image">' +
            '<div class="part-info">' +
              '<h3>' + part.reference + '</h3>' +
              '<p class="part-description">' + part.description + '</p>' +
              matchingHtml +
              '<span class="part-status">' + part.status + '</span>' +
              '<a href="' + part.files + '" class="part-link" target="_blank">Design files →</a>' +
            '</div>';

          searchResultsCards.appendChild(card);
        });

        searchResults.classList.remove('hidden');
      } else {
        searchResultsCount.textContent = 'No parts found for "' + query + '"';
        searchResultsCards.innerHTML = '';
        searchResults.classList.remove('hidden');
      }
    });
  }
});
