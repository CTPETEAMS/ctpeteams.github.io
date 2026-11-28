/* ===== Free CTPETEAMS Wallpapers — rotating phone wallpapers, right column =====
   Cycles through the free phone wallpapers every 5 seconds, in order.
   Tapping the wallpaper downloads that file straight to the phone
   (same-origin link with the download attribute). No fade — a plain swap.
   Pauses when the tab is hidden; respects reduced-motion. */
(function(){
  var wallpapers=[
    {name:'Triangle wallpaper',img:'/assets/wallpapers/ctpeteams-triangle-wallpaper.webp'},
    {name:'Banner wallpaper',img:'/assets/wallpapers/ctpeteams-banner-wallpaper.webp'},
    {name:'Midnight wallpaper',img:'/assets/wallpapers/ctpeteams-midnight-wallpaper.webp'},
  ];
  var link=document.getElementById('wallpapers-rotator-link');
  var img=document.getElementById('wallpapers-rotator-img');
  var label=document.getElementById('wallpapers-rotator-label');
  if(!link||!img||wallpapers.length<2) return;
  var idx=0, timer=null, reduceMotion=false;
  try{ reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  function show(i){
    idx=i;
    var w=wallpapers[idx];
    link.href=w.img;
    link.setAttribute('download', w.img.split('/').pop());
    link.title=w.name+' — tap to download';
    img.src=w.img;
    img.alt=w.name;
    if(label){ label.textContent=w.name; }
  }
  function next(){ show((idx+1)%wallpapers.length); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  function start(){
    stop();
    if(reduceMotion) return;
    timer=setInterval(next,5000);
  }
  document.addEventListener('visibilitychange',function(){ if(document.hidden){ stop(); } else { start(); } });
  show(0);
  start();
})();
