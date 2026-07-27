# Simply Arranged

A human led Muslim matchmaking service, with software wrapped around it. Not a dating app. Members never contact each other directly at any point, and everything runs through the Simply Arranged team.

Tagline: Stress free pairing for Muslims.

## Read these first

| File | What it is |
|---|---|
| `HANDOVER.md` | The full spec, 20 sections. Phase 1 is sections 1 to 7, phase 2 is 8 to 17, open questions are section 19 |
| `CLAUDE.md` | Working rules that apply to every task, including the writing rules |
| `docs/decisions.md` | Running log of decisions and why |
| `docs/consent.md` | Why the consent gate exists, what it does not do and what still needs doing |
| `docs/form-schema.md` | The 40 fields on the live Microsoft Form, and how they map to the phase 2 data model |
| `assets/brand/Simply_Arranged.pdf` | The flyer. Source of truth for brand and copy |

## Where things stand

Phase 1 is the marketing website. Home, join, privacy and terms are built. About and process are not, because both are waiting on content from the client.

Sign ups run through a Microsoft Form at `forms.office.com/r/pAn3746bN1`. The join page puts an explicit consent gate in front of it and embeds it, so nobody reaches the form without being told what happens to their information. Read `docs/consent.md` before touching any of that.

The privacy policy and the terms are drafts and say so on the page. They are not fit to publish yet.

Contact for everything is simplyarranged@hotmail.com.

## Layout

```
assets/brand/     the flyer, the extracted artwork and the source hero
docs/             decisions log, consent notes and the form schema
web/              phase 1, the public site
  css/            tokens.css holds every colour, size and spacing value
  js/             join.js, the consent gate
  img/            site artwork, generated from the flyer
```

## Running it locally

```bash
python3 -m http.server 5000 --directory web
```

Then open `http://localhost:5000`. No build step, no npm dependency, plain HTML, CSS and vanilla JS.

## Deploying

Not deployed yet. `.firebaserc` still carries a placeholder project id because no Firebase project exists. Once it does:

```bash
firebase deploy --only hosting
```

## Conventions

Mobile first CSS. Every colour, font size and spacing value lives in `web/css/tokens.css` and nothing else hardcodes one. Semantic HTML, headings in order, visible focus states. British English, no em dashes, no Oxford commas, in copy and comments and commit messages alike.

Work on `feature/*` branches and squash merge into `main`. Never commit `.env`, a service account JSON or a Stripe key.
