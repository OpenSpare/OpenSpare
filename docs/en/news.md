---
layout: default
title: News
lang: en
---

<script>
var partsData = {{ site.data.parts | jsonify }};
</script>

# News

{% if site.posts.size > 0 %}
<div class="news-grid">
  {% for post in site.posts %}
  {% if post.lang == "en" or post.lang == nil %}
  <a href="{{ post.url | relative_url }}" class="news-card" data-part-reference="{{ post.part_reference }}">
    <span class="news-date-badge">{{ post.date | date: "%b %d, %Y" }}</span>
    {% if post.image_openspare %}
    <div class="news-card-image">
      <img src="{{ post.image_openspare }}" alt="OpenSpare part" class="news-thumb">
    </div>
    {% endif %}
    <div class="news-card-content">
      <h3>{{ post.title }}</h3>
      <div class="news-author-section" data-part-reference="{{ post.part_reference }}"></div>
      <p class="news-card-ref">
        {% assign equip = site.data.parts.equipment_types | where: "name", post.equipment | first %}
        {% if equip %}<img src="{{ equip.icon | relative_url }}" alt="{{ post.equipment }}" class="news-equipment-icon">{% endif %}
        {{ post.part_reference }} - {{ post.equipment }}
      </p>
      <span class="news-card-status">{{ post.status }}</span>
    </div>
  </a>
  {% endif %}
  {% endfor %}
</div>
{% else %}
*No news yet...*
{% endif %}
