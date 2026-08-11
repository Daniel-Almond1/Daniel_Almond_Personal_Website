# CLAUDE.md — AI Notes for Daniel's Portfolio Site

Read this before editing anything. It exists so any AI session (or future Daniel) can extend the site consistently. Daniel does not code — explain changes in plain language, show him the result in a browser, and never push without his review.

## Ground rules

1. **Plain HTML/CSS/JS only.** No frameworks, no build step, no npm. The site must work by opening files or via `python3 -m http.server`.
2. **He reviews before push.** Make changes in the working tree; do not commit or push unless Daniel explicitly says so.
3. **SECURITY — never publish:** internal IP addresses, SSH ports, usernames, hostnames-with-addresses, bot handles, or API keys. Source docs in his Seafile (NemoClaw/server folders) contain these; the public pages must describe the home lab without them.
4. **Honest copy only.** Project pages describe what was actually built (sources: Seafile → `31 Claude Code Projects/<project>/CLAUDE.md` or `README.md`). Don't inflate.

## Site identity

- **Positioning:** tech/analytical employers first — software projects lead; real estate and dance support.
- **Palette:** primary `#2a4d7a`, dark `#1b2c3a`, page bg `#e8f2ff`, chip bg `#e0e6ed`. Fonts: Playfair Display (headings) + Roboto (body), loaded from Google Fonts.
- **Voice:** first person, confident, concrete numbers where possible.

## Canonical page chrome

Every page (except redirect stubs and standalone tools) uses the SAME nav and footer. Nav items, in order: **Home · Projects · Resume (interactive-resume.html) · Education · Contact** — Daniel explicitly wants Dance OUT of the nav bar (it stays in the footer, the homepage "Studio Owner" tile, and the Projects → Leadership section). The footer adds Dance and GitHub links. Copy the blocks from `index.html` verbatim; set `class="nav-link active"` on the current page's link (project pages mark **Projects** active; dance.html marks nothing active).

If you change nav/footer, change it EVERYWHERE. A normalizer script pattern exists for this: regex-replace the `<nav class="navbar">…</nav>` and `<footer>…</footer>` blocks across all pages (see repo history, `normalize_chrome.py` in the June 2026 session).

## How to add a new project page

1. Copy the structure of `project-CoC-Clan-Manager.html` (hero + stats grid + "The Problem" / "What I Built" / stack sections) or `project-553-Flower-Avenue.html` (hero + story + before/after gallery) — tech vs. real-estate flavors.
2. Name it `project-<Kebab-Name>.html`. No spaces in new filenames (older files have them; don't rename without updating every link).
3. Assets go in `Assets/Project Page Assets/<Project Name> Assets/`. If there's no cover image, make an 800×440 SVG cover matching the existing ones in `Assets/Project Page Assets/Tech Project Assets/` (blue gradient `#2a4d7a→#1b2c3a`, white line icon, Georgia serif title, `#ffd166` accent).
4. Add a card to the right section of `projects.html` (Tech / Real Estate & Finance / Leadership & Other) with `project-tags` chips.
5. If it's a top-3 tech project, consider swapping it into the homepage "Featured Software Projects" grid.
6. Titles: `<title>Project Name | Daniel Almond</title>` + a `<meta name="description">`.

## Privacy rules (non-negotiable)

- **NO downloadable resume PDF on the site, ever** — resumes contain Daniel's personal phone number. The Resume page uses a "Contact for Resume" button linking to `contact.html`, by Daniel's explicit decision (June 2026). Do not re-add resume files to `Assets/` or link any.
- Never publish Daniel's phone number, home address, personal email, internal IPs/ports/hostnames of his home lab, or SSH usernames anywhere on the site.

## Things that look like bugs but aren't

- `resume.html` and `certifications.html` are intentional meta-refresh redirect stubs.
- The Resume page has no PDF download — that's the privacy rule above, not an oversight.
- `DanceReturnMetricsCalculator.html`, `John-Keystone-Flyer-Example.html`, and `almond-family-media-server.html` are standalone pages with their own styling — they do NOT get the canonical nav.
- The contact form posts to FormSubmit.co with an activated hash — don't replace it without Daniel's OK.

## Known state (June 2026)

- Working copy: `~/Desktop/Daniel_Almond_Personal_Website` (git → GitHub Pages). A second clone lives in Seafile under `31 Claude Code Projects/Daniel Almond Personal Website/` — refresh it after deploys so they match.
- `_to-delete/` holds junk staged for removal pending Daniel's review; it's gitignored.
- Open items: PyQt6 dashboard page (location of that project unconfirmed), real screenshots for the three tech project pages (SVG covers are placeholders-by-design until then), LinkedIn URL for contact page (commented out).
