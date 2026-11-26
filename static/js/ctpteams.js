/* CTPETEAMS prototype — view switcher + task detail.
   Five views (Dashboard, Project Board, Team View, Task View, Energy View).
   No-JS fallback: every view is visible, stacked. With JS, only the active
   view shows; the Main Menu and nav links switch views by anchor.
   Task cards on the board load their detail into the Task View.
   Sample data only — the band example from the CTPETEAMS spec. */
(function(){
  document.documentElement.classList.add('js');

  /* ----- View switching ----- */
  var VIEWS = ['dashboard','board','team','task','energy'];
  var tabs = document.querySelectorAll('[data-view-tab]');
  var sections = {};
  VIEWS.forEach(function(v){
    var el = document.getElementById(v);
    if(el) sections[v] = el;
  });
  function showView(name, scroll){
    if(!sections[name]) name = 'dashboard';
    VIEWS.forEach(function(v){
      if(sections[v]) sections[v].classList.toggle('is-active', v === name);
    });
    tabs.forEach(function(t){
      var on = t.getAttribute('data-view-tab') === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    try{ history.replaceState(null, '', '#' + name); }catch(e){}
    if(scroll && sections[name]){
      sections[name].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  tabs.forEach(function(t){
    t.addEventListener('click', function(){ showView(t.getAttribute('data-view-tab'), true); });
  });
  /* Menu / nav anchor links also switch the view. */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    var target = a.getAttribute('href').slice(1);
    if(VIEWS.indexOf(target) > -1){
      a.addEventListener('click', function(){ showView(target, false); });
    }
  });
  /* Start on the view named in the hash, else Dashboard. */
  var start = (location.hash || '#dashboard').slice(1);
  showView(VIEWS.indexOf(start) > -1 ? start : 'dashboard', false);

  /* ----- Task detail ----- */
  var TASKS = {
    t1: { title: 'Write the opening track', owner: 'Alex', role: 'Writing', status: 'Done', energy: 'Flowing', board: 'Done column', flow: 'Writing workstream — flowing', desc: 'The opening track of the release — the first thing the listener hears. Written, arranged and signed off.', block: 'Nothing blocking it. Done.' },
    t2: { title: 'Record the vocals', owner: 'Sam', role: 'Recording', status: 'Done', energy: 'Flowing', board: 'Done column', flow: 'Recording workstream — flowing', desc: 'Lead and backing vocals for the release, recorded and comped.', block: 'Nothing blocking it. Done.' },
    t3: { title: 'Write the closing track', owner: 'Alex', role: 'Writing', status: 'To do', energy: 'Flowing', board: 'To do column', flow: 'Writing workstream — flowing', desc: 'The closing track — the last word of the release. Alex has the opening track done, so the shape of the record is set and this one is ready to write.', block: 'Nothing blocking it. Ready to start.' },
    t4: { title: 'Record the rhythm tracks', owner: 'Sam', role: 'Recording', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Recording workstream — flowing', desc: 'Drums, bass and rhythm guitars for the remaining tracks. Sam is tracking now.', block: 'Nothing blocking it. In progress.' },
    t5: { title: 'Mix track 3 — “Static Bloom”', owner: 'Jo', role: 'Mixing', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Mixing workstream — flowing', desc: 'The mix of track 3. Jo has the stems and is balancing the industrial weight against the melody.', block: 'Nothing blocking it. In progress.' },
    t6: { title: 'Design the release poster', owner: 'Max', role: 'Artwork', status: 'To do', energy: 'Flowing', board: 'To do column', flow: 'Artwork workstream — flowing', desc: 'The poster for the release — the visual the shows and the promotion will carry. Max has the artwork direction from the record sleeve.', block: 'Nothing blocking it. Ready to start.' },
    t7: { title: 'Promote the single', owner: 'Rin', role: 'Promotion', status: 'In progress', energy: 'Stalled', board: 'In progress column', flow: 'Promotion workstream — stalled', desc: 'Push the single out — press, playlists, the scene. Rin has the contacts and the plan, but there is nothing to promote yet.', block: 'Stalled: the single is not mastered yet, so promotion cannot start. Unblocks when “Master the album” moves.' },
    t8: { title: 'Master the album', owner: 'Jo', role: 'Mixing', status: 'Blocked', energy: 'Blocked', board: 'Blocked column', flow: 'Mixing workstream — blocked', desc: 'The final master of the whole record — the last step before the release exists.', block: 'Blocked: waiting on the final mixes. Two mixes are still in progress, so the master cannot start.' },
    t9: { title: 'Book the release shows', owner: 'Kit', role: 'Booking shows', status: 'Blocked', energy: 'Blocked', board: 'Blocked column', flow: 'Booking workstream — blocked', desc: 'The release shows — the rooms, the dates, the bill. Kit holds the booking role, but the venue list is not confirmed yet.', block: 'Blocked: the venue list is not confirmed. Kit needs the promoter’s venue contacts to lock the dates — that is the blockage in the flow.' }
  };
  var ENERGY_NOTE = 'Energy type: to be named by Resofactor';
  function pillClass(energy){
    return energy === 'Flowing' ? 'pill-flow' : (energy === 'Blocked' ? 'pill-blocked' : 'pill-stalled');
  }
  function showTask(id){
    var t = TASKS[id];
    if(!t) return;
    var set = function(elId, text){ var el = document.getElementById(elId); if(el) el.textContent = text; };
    set('taskTitle', t.title);
    set('taskDesc', t.desc);
    set('taskOwner', t.owner);
    set('taskRole', t.role);
    set('taskEnergyType', ENERGY_NOTE);
    set('taskBlock', t.block);
    set('taskBoard', t.board);
    set('taskFlow', t.flow);
    var st = document.getElementById('taskStatus');
    if(st){ st.textContent = t.status; st.className = 'pill ' + pillClass(t.energy); }
    var en = document.getElementById('taskEnergy');
    if(en){ en.textContent = t.energy; en.className = 'pill ' + pillClass(t.energy); }
    document.querySelectorAll('[data-task]').forEach(function(c){
      c.classList.toggle('is-selected', c.getAttribute('data-task') === id);
    });
    showView('task', true);
  }
  document.querySelectorAll('[data-task]').forEach(function(card){
    card.addEventListener('click', function(){ showTask(card.getAttribute('data-task')); });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); showTask(card.getAttribute('data-task')); }
    });
  });
})();
