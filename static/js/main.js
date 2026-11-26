(function(){
  "use strict";

  /* ---------- Theme: all 52 CTPVerse Dashboard themes ---------- */
  var themeSelect = document.getElementById('themeSelect');
  var THEME_KEY = 'ctpteams-theme';
  function applyTheme(){
    document.documentElement.setAttribute('data-theme', themeSelect.value);
    try{ localStorage.setItem(THEME_KEY, themeSelect.value); }catch(e){}
  }
  var currentTheme = document.documentElement.getAttribute('data-theme');
  if(currentTheme){
    for(var i=0;i<themeSelect.options.length;i++){
      if(themeSelect.options[i].value===currentTheme){ themeSelect.value=currentTheme; break; }
    }
  }
  themeSelect.addEventListener('change', applyTheme);
  themeSelect.addEventListener('input', applyTheme);

  /* ---------- Width: Nuke / Full toggle button, left of the theme picker —
     the head bootstrap already applied the width (?width= param, then the
     shared ctp-width key), so this only syncs the button and toggles. ---------- */
  var widthBtn = document.getElementById('widthToggle');
  function syncWidthBtn(){
    var isFull = document.documentElement.getAttribute('data-width') === 'full';
    widthBtn.textContent = isFull ? 'WIDTH: Full' : 'WIDTH: Nuke';
    widthBtn.setAttribute('aria-pressed', isFull ? 'true' : 'false');
  }
  syncWidthBtn();
  widthBtn.addEventListener('click', function(){
    var current = document.documentElement.getAttribute('data-width') || 'nuke';
    var next = current === 'full' ? 'nuke' : 'full';
    document.documentElement.setAttribute('data-width', next);
    try{ localStorage.setItem('ctp-width', next); }catch(e){}
    syncWidthBtn();
  });

})();
