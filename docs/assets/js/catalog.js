document.addEventListener('DOMContentLoaded', function() {
  if (typeof partsData === 'undefined') return;

  // Helper: Get brand name from ID
  function getBrandName(brandId) {
    var brand = partsData.brands.find(function(b) { return b.id === brandId; });
    return brand ? brand.name : brandId;
  }

  // Helper: Get equipment name from ID
  function getEquipmentName(equipId) {
    var equip = partsData.equipment_types.find(function(e) { return e.id === equipId; });
    return equip ? equip.name : equipId;
  }

  // Helper: Get parts compatible with a brand for an equipment type
  function getPartsForBrandAndEquipment(brandId, equipmentId) {
    return partsData.parts.filter(function(part) {
      if (part.equipment !== equipmentId) return false;
      return part.compatible && part.compatible.some(function(device) {
        return device.brand === brandId;
      });
    });
  }

  // Helper: Create part card HTML
  function createPartCard(part) {
    var card = document.createElement('div');
    card.className = 'card part-card';

    var imgSrc = part.image;
    if (!imgSrc.includes('http')) {
      imgSrc = document.baseURI.replace(/\/[^\/]*$/, '') + imgSrc;
    }

    var compatibleHtml = '';
    if (part.compatible && part.compatible.length > 0) {
      var sortedDevices = part.compatible.slice().sort(function(a, b) {
        return (a.brand + a.model).localeCompare(b.brand + b.model);
      });
      compatibleHtml = '<div class="compatible-section compatible-box">' +
        '<a href="#" class="compatible-toggle">' + part.compatible.length + ' compatible device(s) ▼</a>' +
        '<ul class="compatible-list hidden">';
      sortedDevices.forEach(function(device) {
        compatibleHtml += '<li>' + getBrandName(device.brand) + ' - ' + device.model + '</li>';
      });
      compatibleHtml += '</ul></div>';
    }

    card.innerHTML = '<img src="' + imgSrc + '" alt="' + part.reference + '" class="part-image">' +
      '<div class="part-info">' +
        '<h3>' + part.reference + '</h3>' +
        '<p class="part-description">' + part.description + '</p>' +
        '<span class="part-status">' + part.status + '</span>' +
        compatibleHtml +
        '<a href="' + part.files + '" class="part-link" target="_blank">Design files →</a>' +
      '</div>';

    return card;
  }

  // Helper: Get total parts count for a brand
  function getPartsCountForBrand(brandId) {
    return partsData.parts.filter(function(part) {
      return part.compatible && part.compatible.some(function(device) {
        return device.brand === brandId;
      });
    }).length;
  }

  // Initialize: Hide brand cards with no parts
  document.querySelectorAll('.brand-card').forEach(function(card) {
    var brandId = card.dataset.brand;
    if (getPartsCountForBrand(brandId) === 0) {
      card.classList.add('hidden');
    }
  });

  // Initialize: Populate part counts and hide empty equipment cards
  document.querySelectorAll('.part-count[data-brand][data-equipment]').forEach(function(span) {
    var brandId = span.dataset.brand;
    var equipmentId = span.dataset.equipment;
    var count = getPartsForBrandAndEquipment(brandId, equipmentId).length;
    span.textContent = count + ' part(s)';

    // Hide equipment card if no parts
    if (count === 0) {
      span.closest('.equipment-card').classList.add('hidden');
    }
  });

  // Initialize: Populate parts grids
  document.querySelectorAll('.parts-grid[data-brand][data-equipment]').forEach(function(grid) {
    var brandId = grid.dataset.brand;
    var equipmentId = grid.dataset.equipment;
    var parts = getPartsForBrandAndEquipment(brandId, equipmentId);
    parts.forEach(function(part) {
      grid.appendChild(createPartCard(part));
    });
  });

  // Brand card clicks
  document.querySelectorAll('.brand-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var brandId = this.dataset.brand;
      document.getElementById('brand-cards').classList.add('hidden');
      document.getElementById('equipment-' + brandId).classList.remove('hidden');
    });
  });

  // Equipment card clicks
  document.querySelectorAll('.equipment-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var brandId = this.dataset.brand;
      var equipType = this.dataset.equipment;
      document.getElementById('equipment-' + brandId).classList.add('hidden');
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
        document.querySelectorAll('.equipment-section, .parts-section').forEach(function(section) {
          section.classList.add('hidden');
        });
        document.getElementById('brand-cards').classList.remove('hidden');
      } else if (backTo === 'equipment') {
        document.querySelectorAll('.parts-section').forEach(function(section) {
          section.classList.add('hidden');
        });
        document.getElementById('equipment-' + brandId).classList.remove('hidden');
      }
    });
  });

  // Compatible devices toggle (using event delegation)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('compatible-toggle')) {
      e.preventDefault();
      e.stopPropagation();
      var list = e.target.nextElementSibling;
      list.classList.toggle('hidden');
      if (list.classList.contains('hidden')) {
        e.target.textContent = e.target.textContent.replace('▲', '▼');
      } else {
        e.target.textContent = e.target.textContent.replace('▼', '▲');
      }
    } else if (!e.target.closest('.compatible-section')) {
      document.querySelectorAll('.compatible-list:not(.hidden)').forEach(function(list) {
        list.classList.add('hidden');
        var toggle = list.previousElementSibling;
        if (toggle) toggle.textContent = toggle.textContent.replace('▲', '▼');
      });
    }
  });

  // Appliance search functionality
  var searchInput = document.getElementById('appliance-search');
  var searchResults = document.getElementById('search-results');
  var searchResultsCount = document.getElementById('search-results-count');
  var searchResultsCards = document.getElementById('search-results-cards');

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var query = this.value.trim().toUpperCase();

      if (query.length < 3) {
        searchResults.classList.add('hidden');
        searchResultsCards.innerHTML = '';
        return;
      }

      // Search through all parts
      var matchingParts = [];
      partsData.parts.forEach(function(part) {
        if (part.compatible && part.compatible.length > 0) {
          var matchingDevices = part.compatible.filter(function(device) {
            return device.model.toUpperCase().includes(query);
          });
          if (matchingDevices.length > 0) {
            matchingParts.push({
              equipment: getEquipmentName(part.equipment),
              part: part,
              matchingDevices: matchingDevices
            });
          }
        }
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
