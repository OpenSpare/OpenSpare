document.addEventListener('DOMContentLoaded', function() {
  if (typeof partsData === 'undefined') return;

  // Simple YAML parser for AUTHOR.yml format
  function parseSimpleYAML(text) {
    var result = {};
    var lines = text.split('\n');
    lines.forEach(function(line) {
      var match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        result[match[1]] = match[2].trim();
      }
    });
    return result;
  }

  // Convert GitHub repo URL to raw AUTHOR.yml URL
  function getAuthorUrl(filesUrl) {
    return filesUrl
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/tree/', '/')
      + '/AUTHOR.yml';
  }

  // Extract GitHub username from URL
  function getGitHubUsername(githubUrl) {
    return githubUrl.replace('https://github.com/', '').split('/')[0];
  }

  // Fetch AUTHOR.yml for a part
  async function fetchAuthor(filesUrl) {
    var url = getAuthorUrl(filesUrl);
    try {
      var response = await fetch(url);
      if (!response.ok) return null;
      var text = await response.text();
      return parseSimpleYAML(text);
    } catch (e) {
      return null;
    }
  }

  // Fetch GitHub profile info
  async function fetchGitHubProfile(username) {
    try {
      var response = await fetch('https://api.github.com/users/' + username);
      if (!response.ok) {
        return { name: username, avatar: 'https://github.com/' + username + '.png' };
      }
      var data = await response.json();
      return {
        name: data.name || data.login,
        avatar: data.avatar_url
      };
    } catch (e) {
      return { name: username, avatar: 'https://github.com/' + username + '.png' };
    }
  }

  // Render author section in a container
  async function renderAuthorSection(container, filesUrl) {
    var author = await fetchAuthor(filesUrl);
    if (!author || !author.github) {
      container.remove();
      return;
    }

    var username = getGitHubUsername(author.github);
    var profile = await fetchGitHubProfile(username);

    var html = '<img src="' + profile.avatar + '" alt="' + profile.name + '" class="author-avatar">' +
      '<a href="' + author.github + '" target="_blank" class="author-link">' + profile.name + '</a>';

    if (author.tip_url) {
      var tipLabel = author.tip_label || 'Tip';
      html += '<a href="' + author.tip_url + '" target="_blank" class="tip-button">' + tipLabel + '</a>';
    }

    container.innerHTML = html;
  }

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
        '<div class="author-section" data-files="' + part.files + '"></div>' +
        '<a href="' + part.files + '" class="part-link" target="_blank">Design files →</a>' +
      '</div>';

    // Async load author info
    var authorSection = card.querySelector('.author-section');
    if (authorSection && part.files) {
      renderAuthorSection(authorSection, part.files);
    }

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

  // Back navigation (only for catalog links with data-back attribute)
  document.querySelectorAll('.back-link[data-back]').forEach(function(link) {
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

  // Helper: Get part by reference
  function getPartByReference(reference) {
    return partsData.parts.find(function(p) { return p.reference === reference; });
  }

  // Render author section specifically for news cards
  async function renderNewsAuthorSection(container, filesUrl) {
    var author = await fetchAuthor(filesUrl);
    if (!author || !author.github) {
      container.remove();
      return;
    }

    var username = getGitHubUsername(author.github);
    var profile = await fetchGitHubProfile(username);

    var html = '<span class="author-label">Designed by</span>' +
      '<a href="' + author.github + '" target="_blank" class="author-badge">' +
        '<img src="' + profile.avatar + '" alt="' + profile.name + '" class="author-avatar">' +
        '<span class="author-name">' + profile.name + '</span>' +
      '</a>';

    if (author.tip_url) {
      var tipLabel = author.tip_label || 'Tip';
      html += '<a href="' + author.tip_url + '" target="_blank" class="tip-button">' + tipLabel + '</a>';
    }

    container.innerHTML = html;
  }

  // Initialize: Populate author sections in news cards
  document.querySelectorAll('.news-author-section[data-part-reference]').forEach(function(section) {
    var reference = section.dataset.partReference;
    var part = getPartByReference(reference);
    if (part && part.files) {
      renderNewsAuthorSection(section, part.files);
    } else {
      section.remove();
    }
  });

  // Initialize: Populate author section in post page
  document.querySelectorAll('.post-author-row[data-part-reference]').forEach(function(row) {
    var reference = row.dataset.partReference;
    var part = getPartByReference(reference);
    var cell = row.querySelector('.post-author-cell');
    if (part && part.files && cell) {
      fetchAuthor(part.files).then(function(author) {
        if (!author || !author.github) {
          row.remove();
          return;
        }
        var username = getGitHubUsername(author.github);
        fetchGitHubProfile(username).then(function(profile) {
          var html = '<img src="' + profile.avatar + '" alt="' + profile.name + '" class="author-avatar">' +
            '<a href="' + author.github + '" target="_blank" class="author-link">' + profile.name + '</a>';
          if (author.tip_url) {
            var tipLabel = author.tip_label || 'Tip';
            html += '<a href="' + author.tip_url + '" target="_blank" class="tip-button">' + tipLabel + '</a>';
          }
          cell.innerHTML = html;
        });
      });
    } else {
      row.remove();
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
          var sortedMatchingDevices = match.matchingDevices.slice().sort(function(a, b) {
            return (a.brand + a.model).localeCompare(b.brand + b.model);
          });

          var matchingHtml = '<div class="matching-devices">' +
            '<a href="#" class="compatible-toggle">Matches ' + match.matchingDevices.length + ' device(s) ▼</a>' +
            '<ul class="matching-list hidden">';
          sortedMatchingDevices.forEach(function(d) {
            matchingHtml += '<li>' + getBrandName(d.brand) + ' - ' + d.model + '</li>';
          });
          matchingHtml += '</ul></div>';

          card.innerHTML = '<img src="' + imgSrc + '" alt="' + part.reference + '" class="part-image">' +
            '<div class="part-info">' +
              '<h3>' + part.reference + '</h3>' +
              '<p class="part-description">' + part.description + '</p>' +
              '<span class="part-status">' + part.status + '</span>' +
              matchingHtml +
              '<div class="author-section" data-files="' + part.files + '"></div>' +
              '<a href="' + part.files + '" class="part-link" target="_blank">Design files →</a>' +
            '</div>';

          // Async load author info
          var authorSection = card.querySelector('.author-section');
          if (authorSection && part.files) {
            renderAuthorSection(authorSection, part.files);
          }

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
