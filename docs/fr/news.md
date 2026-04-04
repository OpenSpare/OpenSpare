---
layout: default
title: Actualités
lang: fr
---

<script>
var partsData = {{ site.data.parts | jsonify }};
</script>

# Actualités

{% if site.posts.size > 0 %}
<div class="news-grid">
  {% for post in site.posts %}
  {% if post.lang == "fr" %}
  <a href="{{ post.url | relative_url }}" class="news-card" data-part-reference="{{ post.part_reference }}">
    {% assign month_num = post.date | date: "%m" %}
    <span class="news-date-badge">{{ post.date | date: "%d" }} {{ site.data.translations.months_fr[month_num] }} {{ post.date | date: "%Y" }}</span>
    {% if post.image_openspare %}
    <div class="news-card-image">
      <img src="{{ post.image_openspare }}" alt="Pièce OpenSpare" class="news-thumb">
    </div>
    {% endif %}
    <div class="news-card-content">
      <h3>{{ post.title }}</h3>
      <div class="news-author-section" data-part-reference="{{ post.part_reference }}"></div>
      <p class="news-card-ref">
        {% assign equip = site.data.parts.equipment_types | where: "name", post.equipment | first %}
        {% if equip %}<img src="{{ equip.icon | relative_url }}" alt="{{ equip.name_fr }}" class="news-equipment-icon">{% endif %}
        {{ post.part_reference }} - {{ equip.name_fr | default: post.equipment }}
      </p>
      <span class="news-card-status">{{ post.status }}</span>
    </div>
  </a>
  {% endif %}
  {% endfor %}
</div>
{% else %}
*Pas encore d'actualités...*
{% endif %}
