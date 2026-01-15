---
layout: default
title: News
---

# News

{% if site.posts.size > 0 %}
<div class="news-grid">
  {% for post in site.posts %}
  <a href="{{ post.url | relative_url }}" class="news-card">
    <span class="news-date-badge">{{ post.date | date: "%b %d, %Y" }}</span>
    {% if post.image_openspare %}
    <div class="news-card-image">
      <img src="{{ post.image_openspare }}" alt="OpenSpare part" class="news-thumb">
    </div>
    {% endif %}
    <div class="news-card-content">
      <h3>{{ post.title }}</h3>
      <p class="news-card-ref">
        {% assign equip = site.data.parts.equipment_types | where: "name", post.equipment | first %}
        {% if equip %}<img src="{{ equip.icon | relative_url }}" alt="{{ post.equipment }}" class="news-equipment-icon">{% endif %}
        {{ post.part_reference }} - {{ post.equipment }}
      </p>
      <span class="news-card-status">{{ post.status }}</span>
    </div>
  </a>
  {% endfor %}
</div>
{% else %}
*No news yet...*
{% endif %}
