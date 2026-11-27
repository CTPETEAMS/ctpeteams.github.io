/* CTPETEAMS prototype — view switcher + task detail.
   Five views (Dashboard, Project Board, Team View, Task View, Energy View).
   No-JS fallback: every view is visible, stacked. With JS, only the active
   view shows; the Main Menu and nav links switch views by anchor.
   Task cards on the board load their detail into the Task View.
   Sample data only — a generic sample project, so any team can see itself in it. */
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
    t1: { title: 'Define the project scope', owner: 'Alex', role: 'Planning', status: 'Done', energy: 'Flowing', board: 'Done column', flow: 'Planning workstream — flowing', desc: 'The scope of the project — what we are building, what we are not, and what done looks like. Agreed and signed off.', block: 'Nothing blocking it. Done.' },
    t2: { title: 'Build the first prototype', owner: 'Sam', role: 'Development', status: 'Done', energy: 'Flowing', board: 'Done column', flow: 'Development workstream — flowing', desc: 'The first working version — enough to show the shape of the thing and test the core idea.', block: 'Nothing blocking it. Done.' },
    t3: { title: 'Finalize the requirements', owner: 'Alex', role: 'Planning', status: 'To do', energy: 'Flowing', board: 'To do column', flow: 'Planning workstream — flowing', desc: 'The full requirements list. The scope is set, so this one is ready to write up.', block: 'Nothing blocking it. Ready to start.' },
    t4: { title: 'Develop the core features', owner: 'Sam', role: 'Development', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Development workstream — flowing', desc: 'The main build — the features the project depends on. Sam is building now.', block: 'Nothing blocking it. In progress.' },
    t5: { title: 'Review the design draft', owner: 'Jo', role: 'Design', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Design workstream — flowing', desc: 'The design draft for the project. Jo has the files and is working through the layout and the look.', block: 'Nothing blocking it. In progress.' },
    t6: { title: 'Prepare the launch materials', owner: 'Max', role: 'Content', status: 'To do', energy: 'Flowing', board: 'To do column', flow: 'Content workstream — flowing', desc: 'The materials for the launch — the copy, the images, the assets the announcement will carry. Max has the direction from the design draft.', block: 'Nothing blocking it. Ready to start.' },
    t7: { title: 'Announce the launch', owner: 'Rin', role: 'Marketing', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Marketing workstream — flowing', desc: 'Get the word out — the announcement, the channels, the audience. Rin has the contacts and the plan, and the announcement is going out.', block: 'Nothing blocking it. In progress.' },
    t8: { title: 'Approve the final deliverable', owner: 'Jo', role: 'Design', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Design workstream — flowing', desc: 'The final sign-off on the deliverable — the last step before the project ships. The design review is done and approval is moving.', block: 'Nothing blocking it. In progress.' },
    t9: { title: 'Schedule the launch event', owner: 'Kit', role: 'Operations', status: 'In progress', energy: 'Flowing', board: 'In progress column', flow: 'Operations workstream — flowing', desc: 'The launch event — the venue, the date, the agenda. Kit holds the operations role, and the venue is confirmed.', block: 'Nothing blocking it. In progress.' }
  };
  var ENERGY_NOTE = 'Energy type: to be named by Resofactor';
  function pillClass(energy){
    return 'pill-flow';
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

  /* ----- Hero: random loader + staggered rotator -----
     Natural (human) and abstract (CG) slides interchange — never two of
     the same kind in a row. On every page load a random slide is shown
     first, then every 5s a random slide of the opposite kind crossfades in. */
  var heroImgs = document.querySelectorAll('.xfade-stage img');
  if(heroImgs.length > 1){
    var naturals = [], abstracts = [];
    heroImgs.forEach(function(img){
      (img.getAttribute('data-kind') === 'natural' ? naturals : abstracts).push(img);
    });
    var current = heroImgs[Math.floor(Math.random() * heroImgs.length)];
    current.classList.add('is-active');
    var nextKind = current.getAttribute('data-kind') === 'natural' ? 'abstract' : 'natural';
    setInterval(function(){
      var pool = nextKind === 'natural' ? naturals : abstracts;
      if(!pool.length) pool = nextKind === 'natural' ? abstracts : naturals;
      var next = current;
      while(next === current && pool.length > 1){
        next = pool[Math.floor(Math.random() * pool.length)];
      }
      current.classList.remove('is-active');
      next.classList.add('is-active');
      current = next;
      nextKind = nextKind === 'natural' ? 'abstract' : 'natural';
    }, 5000);
  } else if(heroImgs.length === 1){
    heroImgs[0].classList.add('is-active');
  }
})();
