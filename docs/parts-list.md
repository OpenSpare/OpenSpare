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

  <!-- Equipment Cards (hidden by default) -->
  {% for brand in site.data.parts.brands %}
  <div id="equipment-{{ brand.id }}" class="equipment-section hidden">
    <div class="back-nav">
      <a href="#" class="back-link" data-back="brands">← Back to brands</a>
    </div>
    <div class="card-grid">
      {% for equip in brand.equipment %}
      <div class="card equipment-card" data-brand="{{ brand.id }}" data-equipment="{{ equip.type }}">
        <img src="{{ equip.icon | relative_url }}" alt="{{ equip.name }}" class="card-logo">
        <h3>{{ equip.name }}</h3>
        <span class="part-count">{{ equip.parts.size }} part(s)</span>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endfor %}

  <!-- Parts Cards (hidden by default) -->
  {% for brand in site.data.parts.brands %}
  {% for equip in brand.equipment %}
  <div id="parts-{{ brand.id }}-{{ equip.type }}" class="parts-section hidden">
    <div class="back-nav">
      <a href="#" class="back-link" data-back="equipment" data-brand="{{ brand.id }}">← Back to {{ brand.name }}</a>
    </div>
    <div class="parts-grid">
      {% for part in equip.parts %}
      <div class="card part-card">
        {% if part.image contains 'http' %}
        <img src="{{ part.image }}" alt="{{ part.reference }}" class="part-image">
        {% else %}
        <img src="{{ part.image | relative_url }}" alt="{{ part.reference }}" class="part-image">
        {% endif %}
        <div class="part-info">
          <h3>{{ part.reference }}</h3>
          <p class="part-description">{{ part.description }}</p>
          <span class="part-status">{{ part.status }}</span>
          {% if part.compatible.size > 0 %}
          <div class="compatible-section compatible-box">
            <a href="#" class="compatible-toggle">{{ part.compatible.size }} compatible device(s) ▼</a>
            <ul class="compatible-list hidden">
              {% assign sorted_devices = part.compatible | sort: "brand" | sort: "model" %}
              {% for device in sorted_devices %}
              <li>{{ device.brand }} - {{ device.model }}</li>
              {% endfor %}
            </ul>
          </div>
          {% endif %}
          <a href="{{ part.files }}" class="part-link" target="_blank">Design files →</a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
  {% endfor %}
</div>

<p class="icon-credits">Icons: <a href="https://www.flaticon.com/fr/icones-gratuites/four" title="four icônes">Oven by Good Ware</a>, <a href="https://www.flaticon.com/fr/icones-gratuites/refrigerateur" title="réfrigérateur icônes">Fridge by Freepik</a> - Flaticon</p>

<script>
var partsData = {{ site.data.parts | jsonify }};
</script>
