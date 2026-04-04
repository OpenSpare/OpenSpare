---
layout: default
title: Nous Contacter
lang: fr
---

# Nous Contacter

Vous avez testé une pièce et souhaitez partager votre retour ? Vous voulez demander un nouveau design ? Nous serions ravis de vous écouter !

---

## Pour les utilisateurs GitHub

Si vous avez un compte GitHub, le meilleur moyen de contribuer est via notre dépôt :

<a href="https://github.com/OpenSpare/OpenSpare/issues" class="cta-button"><svg class="github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> Ouvrir un ticket sur GitHub</a>

Cela permet un meilleur suivi et une discussion autour de votre demande.

---

## Formulaire de Contact

Pas de compte GitHub ? Pas de problème ! Utilisez le formulaire ci-dessous pour nous contacter directement.

<form id="contact-form" action="https://formspree.io/f/mpqqqpnv" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Nom *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="request-type">Type de demande *</label>
    <select id="request-type" name="request_type" required>
      <option value="">-- Sélectionner --</option>
      <option value="part_request">Demande de nouvelle pièce</option>
      <option value="feedback">Retour d'expérience</option>
      <option value="other">Autre</option>
    </select>
  </div>

  <div class="form-group">
    <label for="product-ref">Référence Produit (modèle de votre appareil)</label>
    <input type="text" id="product-ref" name="product_reference" placeholder="ex : NV66M3531BS">
  </div>

  <div class="form-group">
    <label for="part-ref">Référence Pièce (si applicable)</label>
    <input type="text" id="part-ref" name="part_reference" placeholder="ex : DE96-00994A">
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <button type="submit" class="submit-button">Envoyer le Message</button>
  <div id="form-status" class="form-status"></div>
</form>
