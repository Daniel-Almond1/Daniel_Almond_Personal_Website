# Daniel Almond — Personal Portfolio

Portfolio site for Daniel Almond: software projects, commercial real estate work, and dance. Hand-built with plain HTML, CSS, and JavaScript — no frameworks, no build step — and deployed with GitHub Pages.

**Live site:** https://daniel-almond1.github.io/Daniel_Almond_Personal_Website/

## Highlights

- **Tech-first project portfolio** — Python/Flask analytics dashboard, a local-first CRM, and a self-hosted AI home lab, alongside real estate investment and finance analysis work
- **Interactive resume** — expandable work history with photo galleries and downloadable PDFs
- **Zero dependencies** — one stylesheet, vanilla JS, static hosting; the whole site works by opening `index.html`

## Structure

```
index.html                  Homepage (hero, featured projects, about, experience)
projects.html               All projects in three sections: Tech / Real Estate / Other
interactive-resume.html     The resume (nav label: "Resume")
education.html              Education + certifications
dance.html                  Dance teaching, performing, competing
contact.html                Contact form (FormSubmit backend)
project-*.html              Individual project pages
DanceReturnMetricsCalculator.html   Standalone financial calculator tool
style.css                   Single shared stylesheet
script.js                   Shared animations + nav behavior
Assets/                     Images, PDFs, and per-page assets
CLAUDE.md                   Conventions for AI-assisted edits (see below)
```

`resume.html` and `certifications.html` are redirect stubs kept so old links don't break.

## Local development

No tooling needed:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Or just open `index.html` in a browser — only the homepage typewriter effect needs the local server.)

## Deployment

Pushing to `main` publishes automatically via GitHub Pages.

## Conventions

Site-wide conventions (canonical nav/footer, how to add a page, security rules) live in [CLAUDE.md](CLAUDE.md) — read it before editing, whether you're a human or an AI assistant.
