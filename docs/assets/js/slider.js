document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.comparison-slider');
  if (!slider) return;

  var beforeContainer = slider.querySelector('.comparison-before');
  var handle = slider.querySelector('.comparison-handle');
  var isDragging = false;

  function updateSlider(x) {
    var rect = slider.getBoundingClientRect();
    var position = (x - rect.left) / rect.width;
    position = Math.max(0, Math.min(1, position));

    var percentage = position * 100;
    var clipRight = 100 - percentage;
    beforeContainer.style.clipPath = 'inset(0 ' + clipRight + '% 0 0)';
    handle.style.left = percentage + '%';
  }

  function startDrag(e) {
    isDragging = true;
    e.preventDefault();
  }

  function endDrag() {
    isDragging = false;
  }

  function drag(e) {
    if (!isDragging) return;
    var x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    updateSlider(x);
  }

  // Mouse events
  slider.addEventListener('mousedown', function(e) {
    startDrag(e);
    updateSlider(e.clientX);
  });
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);

  // Touch events
  slider.addEventListener('touchstart', function(e) {
    startDrag(e);
    updateSlider(e.touches[0].clientX);
  });
  document.addEventListener('touchmove', drag);
  document.addEventListener('touchend', endDrag);
});
