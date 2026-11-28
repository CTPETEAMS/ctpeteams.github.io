/* ===== Free CTPETEAMS Wallpapers — dissolving crossfade rotator, right column =====
   Cycles through the free phone wallpapers every 5 seconds, in order.
   The active slide dissolves in over the previous one (CSS opacity transition,
   1s) — smooth and liquid, not a snap. Only the visible slide is clickable;
   tapping it downloads that wallpaper straight to the phone (same-origin link
   with the download attribute). Pauses when the tab is hidden; respects
   reduced-motion. */
(function(){
  var slides = document.querySelectorAll('.wp-stage .wp-slide');
  var label = document.getElementById('wallpapers-rotator-label');
  if(!slides.length) return;
  var idx = 0, timer = null, reduceMotion = false;
  try{ reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  function nameOf(slide){
    var img = slide.querySelector('img');
    return img ? img.alt : '';
  }
  function show(i){
    slides[idx].classList.remove('is-active');
    idx = i;
    slides[idx].classList.add('is-active');
    if(label){ label.textContent = nameOf(slides[idx]); }
  }
  function next(){ show((idx + 1) % slides.length); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }
  function start(){
    stop();
    if(reduceMotion) return;
    timer = setInterval(next, 5000);
  }
  document.addEventListener('visibilitychange', function(){ if(document.hidden){ stop(); } else { start(); } });
  /* Ensure exactly one slide is active on load (the first, per the HTML). */
  slides.forEach(function(s){ s.classList.remove('is-active'); });
  show(0);
  start();
})();
