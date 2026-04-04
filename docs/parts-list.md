---
layout: default
title: Parts List
---

<!-- Search Section -->
<div class="search-section">
  <h2>Find parts for your appliance</h2>
  <input type="text" id="appliance-search" placeholder="Enter your appliance reference (e.g., NV66M3531BS)">
  <div id="search-results" class="hidden">
    <p id="search-results-count"></p>
    <div id="search-results-cards"></div>
  </div>
</div>

<div class="section-divider">— OR browse by brand —</div>

<div id="catalog">
  <!-- Brand Cards -->
  <div id="brand-cards" class="card-grid">
    {% for brand in site.data.parts.brands %}
    <div class="card brand-card" data-brand="{{ brand.id }}">
      <img src="{{ brand.logo | relative_url }}" alt="{{ brand.name }}" class="card-logo">
      <h3>{{ brand.name }}</h3>
    </div>
    {% endfor %}
  </div>

  <!-- Equipment Cards (hidden by default, one section per brand) -->
  {% for brand in site.data.parts.brands %}
  <div id="equipment-{{ brand.id }}" class="equipment-section hidden">
    <div class="back-nav">
      <a href="#" class="back-link" data-back="brands">← Back to brands</a>
    </div>
    <div class="card-grid">
      {% for equip in site.data.parts.equipment_types %}
      <div class="card equipment-card" data-brand="{{ brand.id }}" data-equipment="{{ equip.id }}">
        <img src="{{ equip.icon | relative_url }}" alt="{{ equip.name }}" class="card-logo">
        <h3>{{ equip.name }}</h3>
        <span class="part-count" data-brand="{{ brand.id }}" data-equipment="{{ equip.id }}"></span>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endfor %}

  <!-- Parts Cards (hidden by default, one section per brand+equipment combo) -->
  {% for brand in site.data.parts.brands %}
  {% for equip in site.data.parts.equipment_types %}
  <div id="parts-{{ brand.id }}-{{ equip.id }}" class="parts-section hidden">
    <div class="back-nav">
      <a href="#" class="back-link" data-back="equipment" data-brand="{{ brand.id }}">← Back to {{ brand.name }}</a>
    </div>
    <div class="parts-grid" data-brand="{{ brand.id }}" data-equipment="{{ equip.id }}">
      <!-- Parts will be populated by JavaScript -->
    </div>
  </div>
  {% endfor %}
  {% endfor %}
</div>

<p class="icon-credits">Icons: <a href="https://www.flaticon.com/fr/icones-gratuites/four" title="four icônes">Oven by Good Ware</a>, <a href="https://www.flaticon.com/fr/icones-gratuites/refrigerateur" title="réfrigérateur icônes">Fridge by Freepik</a> - Flaticon</p>

<script>
var partsData = {{ site.data.parts | jsonify }};
</script>
