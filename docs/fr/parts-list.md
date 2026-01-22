---
layout: default
title: Liste des Pièces
lang: fr
---

<!-- Search Section -->
<div class="search-section">
  <h2>Trouvez des pièces pour votre appareil</h2>
  <input type="text" id="appliance-search" placeholder="Entrez la référence de votre appareil (ex : NV66M3531BS)">
  <div id="search-results" class="hidden">
    <p id="search-results-count"></p>
    <div id="search-results-cards"></div>
  </div>
</div>

<div class="section-divider">— OU parcourir par marque —</div>

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
      <a href="#" class="back-link" data-back="brands">← Retour aux marques</a>
    </div>
    <div class="card-grid">
      {% for equip in site.data.parts.equipment_types %}
      <div class="card equipment-card" data-brand="{{ brand.id }}" data-equipment="{{ equip.id }}">
        <img src="{{ equip.icon | relative_url }}" alt="{{ equip.name_fr }}" class="card-logo">
        <h3>{{ equip.name_fr }}</h3>
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
      <a href="#" class="back-link" data-back="equipment" data-brand="{{ brand.id }}">← Retour à {{ brand.name }}</a>
    </div>
    <div class="parts-grid" data-brand="{{ brand.id }}" data-equipment="{{ equip.id }}">
      <!-- Parts will be populated by JavaScript -->
    </div>
  </div>
  {% endfor %}
  {% endfor %}
</div>

<p class="icon-credits">Icônes : <a href="https://www.flaticon.com/fr/icones-gratuites/four" title="four icônes">Four par Good Ware</a>, <a href="https://www.flaticon.com/fr/icones-gratuites/refrigerateur" title="réfrigérateur icônes">Réfrigérateur par Freepik</a> - Flaticon</p>

<script>
var partsData = {{ site.data.parts | jsonify }};
</script>
