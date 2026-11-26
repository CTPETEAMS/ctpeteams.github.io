# CTPETEAMS

CTP's team and project management application — Higher Team Management via C-domain.

Our version of project management software. Not another Asana, not another Trello. A dashboard built the CTP way, for how CTP work actually happens: teams, tasks, and the energy moving through a project. The operating layer for the CTPVerse — the dashboard where CTP gets built, by the people building it, together.

- Live site: https://ctpeteams.github.io/ (not yet deployed — repo pending)
- Org: https://github.com/CTPETEAMS
- LinkedIn: https://linkedin.com/showcase/ctpeteams
- Spec: `~/workspace/goals/ctpeteams-project-management-app/files/CTPETEAMS-spec.md`
- Built with [Hugo](https://gohugo.io/) (extended 0.152.2), deployed via
  GitHub Pages + GitHub Actions.
- 52 themes, CTP-EOS Cynamic (eos) default, CTP-EOS Calamares first in the
  picker. Theme persists per device (`ctpteams-theme`); width toggle
  nuke/full with `?width=full` override.

## Layout

Single-page Nuke portal (same chrome as the other CTPVerse portals):

- `hugo.toml` — baseURL, title, no taxonomies
- `content/_index.md` — front matter only
- `layouts/` — `baseof.html`, `index.html` (centre column), partials
  (`head`, `header`, `footer`, `scripts`, `sidebar-left`, `sidebar-right`)
- `assets/css/main.css` — the 52-theme stylesheet (Hugo pipes, fingerprinted),
  plus the CTPETEAMS prototype styles at the end
- `static/js/` — `main.js` (theme/width), `ctp-music.js` (laut.fm player,
  25 stations, Abstrait default), `sites-rotator.js`, `ctpteams.js`
  (prototype view switcher + task detail)
- `static/assets/` — branding, ads

## The prototype (Phase 2)

The centre column is the clickable prototype — five views, sample data,
no login, no backend:

- **Dashboard** — all projects at a glance (the band's release + the CTPVerse projects)
- **Project Board** — the band's release on a kanban board (to do / in progress / blocked / done)
- **Team View** — the people, their mission roles, what each one carries; before/after (one person carrying everything vs six people, one job each)
- **Task View** — one task in detail; clicking a board card opens it here
- **Energy View** — the flow by workstream: where the project has momentum and where it's stuck

Sample data is the underground industrial band from the spec. Energy types are
Resofactor's call — the prototype shows where each person's energy type sits,
it does not invent the taxonomy. Names in the sample team are placeholders.

## Phases

- Phase 1 — Spec: done.
- Phase 2 — Prototype: this portal.
- Phase 3 — Working app: Vercel back end + Supabase, one Club CTP login,
  after a paying job lands.

## Notes

- Branding images come from the CTPETEAMS LinkedIn showcase page posts:
  the neon-triangle artwork (`ctpeteams-triangle-hires.jpg`), the wide cover
  banner (`ctpeteams-cover.jpg`), the square logo (`ctpeteams-logo-400.jpg`,
  also the favicon and org avatar), and the CTP Energy ecosystem architecture
  diagram (`ctp-energy-ecosystem-architecture.jpg`).

## License

MIT — Copyright (c) 2026 CTP Energy, LLC. See LICENSE.
