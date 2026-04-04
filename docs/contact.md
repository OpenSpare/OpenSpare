---
layout: default
title: Contact Us
---

# Contact Us

Have feedback on a part you tested? Want to request a new design? We'd love to hear from you!

---

## For GitHub Users

If you have a GitHub account, the best way to contribute is through our repository:

<a href="https://github.com/OpenSpare/OpenSpare/issues" class="cta-button">Open an Issue on GitHub</a>

This allows for better tracking and discussion of your request.

---

## Contact Form

No GitHub account? No problem! Use the form below to reach us directly.

<form id="contact-form" action="https://formspree.io/f/mpqqqpnv" method="POST" class="contact-form">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="request-type">Request Type *</label>
    <select id="request-type" name="request_type" required>
      <option value="">-- Select --</option>
      <option value="part_request">Request a new part</option>
      <option value="feedback">Feedback after testing</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="form-group">
    <label for="product-ref">Product Reference (your appliance model)</label>
    <input type="text" id="product-ref" name="product_reference" placeholder="e.g., NV66M3531BS">
  </div>

  <div class="form-group">
    <label for="part-ref">Part Reference (if applicable)</label>
    <input type="text" id="part-ref" name="part_reference" placeholder="e.g., DE96-00994A">
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <button type="submit" class="submit-button">Send Message</button>
  <div id="form-status" class="form-status"></div>
</form>
