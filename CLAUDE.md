# Working rules for Simply Arranged

Read `HANDOVER.md` before starting anything. This file is the short version that applies to every task.

## What this is

A Muslim matchmaking service with software around it. Human matchmakers do the matching. Members never contact each other directly at any point in the system. Phase 1 is a static marketing website. Phase 2 is the member platform. Do not build phase 2 features while phase 1 is in progress.

## Non negotiable product rules

- No member to member communication anywhere. No chat, no email reveal, no surnames or precise addresses in a shared profile. If a request would break this, stop and ask
- One active match per member at a time. Locking happens in a Firestore transaction
- Double blind decisions. A member's own decision is written through a callable function and the response never reveals or implies the other side's answer
- A failed match writes an exclusion pair so the two are never proposed again

## Writing rules

These apply to copy, comments, commit messages and docs.

- British English. Organise not organize, colour not color, licence for the noun. CSS property names and values are the one exception because the language defines them as American, so `color:` in a stylesheet is correct
- No em dashes
- No Oxford commas
- Plain, natural prose. No corporate filler, no "seamless", no "elevate", no "journey" unless the client used it first
- The client's own copy from the flyer stays as written, including the samosas and awkward silences line

## Brand tokens

```css
--sa-cream: #F5F5E7;
--sa-teal: #187267;
--sa-teal-dark: #125A51;
--sa-ink: #000000;
--sa-ink-soft: #303842;
--sa-night: #051F31;
--sa-white: #FDFDFD;
```

Fonts: Poppins for everything structural, Over the Rainbow for section titles only and no more than three times per page. Both from Google Fonts.

## Stack

Phase 1: plain HTML, CSS and vanilla JS on Firebase Hosting. No framework, no build step, no npm dependency unless there is a real reason.

Phase 2: Firebase Auth with custom claims, Firestore, Cloud Functions in TypeScript, Firebase Storage, Stripe Checkout.

## Code conventions

- Mobile first CSS, tokens in `css/tokens.css` and nothing hardcoded elsewhere
- Semantic HTML, real headings in order, visible focus states
- Keep CSS specificity flat, avoid selectors that fight each other on section spacing
- All privileged logic in Cloud Functions, never in the client
- Default deny in `firestore.rules` and `storage.rules`
- No secrets, service account keys or Stripe keys in the repo

## How to work

- Make the smallest change that does the job. Do not refactor things nobody asked about
- State assumptions rather than inventing requirements. Section 19 of the handover lists what is genuinely undecided, so if a task depends on one of those, ask
- Define what done looks like before starting, then verify against it
- Prefer boring solutions that are easy to hand over
