# Simply Arranged: Project Handover

Prepared for the Simply Arranged build. Drop this in the repo root as `HANDOVER.md` and keep it updated as decisions land.

---

## 0. How to use this document

Sections 1 to 7 are everything needed to build and ship the marketing website, which is phase 1. Sections 8 to 17 are the platform spec, which is phase 2, and should not be built yet but should be designed for now so phase 1 does not paint us into a corner. Section 19 lists what is still unanswered by the client.

Two rules that apply to every piece of copy and every code comment in this project:

- No em dashes anywhere
- No Oxford commas

---

## 1. What Simply Arranged is

A human led Muslim matchmaking service with software wrapped around it. It is not a dating app. The defining constraint is that members never contact each other directly at any point. All communication runs through the Simply Arranged team, who present matches, arrange supervised meetings and follow up afterwards.

Tagline: Stress free pairing for Muslims.

Positioning line: Creating a unique matchmaking experience, while adhering to Islamic principles.

### The client's process, taken from the existing flyer

1. **Start your journey.** Complete your profile and have a short call with the team.
2. **Search initiated.** Data uploaded and the matchmaking search begins.
3. **Match found.** A £35 admin fee covers a six month subscription, and the team presents the match for discussion.
4. **Meeting arranged.** If both agree, a supervised meeting at a neutral location is arranged. Either party may bring someone along.
5. **Next steps.** Simply Arranged makes contact within three days to discuss how the member wishes to proceed. Further meetings can be arranged.

### The single most important product rule

One active match at a time. A member is either available to be matched or locked into an active match. They only re enter the pool when that match is closed by the team. Neither side ever learns the other side's answer. Only the team sees both.

---

## 2. Current state

Updated 27 July 2026. The running log of what changed and why is in `docs/decisions.md`.

- A two page PDF flyer exists and is the source of brand and copy. It lives in the repo at `assets/brand/Simply_Arranged.pdf`
- Sign ups go through a Microsoft Form at `forms.office.com/r/pAn3746bN1`, which is where `bit.ly/simplyarranged` points. All 40 fields are now recorded in `docs/form-schema.md`
- Everything after the form is manual: calls, matching, meetings, follow ups
- The website exists but is not deployed. All six pages are built. Several carry visible todo blocks marking things the client still has to answer
- The client has decided to keep the Microsoft Form for now rather than build an enquiry form. The join page puts an explicit consent gate in front of it. See `docs/consent.md`
- `simplyarranged.co.uk` is registered on IONOS and currently forwards to the form. Repointing it is deliberately parked

---

## 3. Scope

### Phase 1: marketing website

Public site that explains the service, builds trust and captures enquiries. Static, no member accounts, no login. This is what gets built first.

### Phase 2: the platform

Member accounts, profiles, the matching engine, the decision flow, meetings calendar, meeting history, member to team messaging, three admin dashboards and payments.

Phase 1 must ship on its own and must not be blocked by anything in phase 2.

---

## 4. Brand and design system

These values were sampled directly from the flyer PDF, so they are exact rather than approximate.

### Colour

| Token | Hex | Use |
|---|---|---|
| `--sa-cream` | `#F5F5E7` | Page background, the dominant colour |
| `--sa-teal` | `#187267` | Primary brand colour: banners, headings, buttons, logo |
| `--sa-teal-dark` | `#125A51` | Hover and active states, derived not sampled |
| `--sa-ink` | `#000000` | Body text on cream |
| `--sa-ink-soft` | `#303842` | Secondary text, captions |
| `--sa-night` | `#051F31` | Deep navy from the hero illustration, use sparingly |
| `--sa-white` | `#FDFDFD` | Cards and form fields on cream |

Teal banners use cream text. Cream sections use black or teal text. Do not introduce a fourth colour.

### Typography

Both faces are confirmed from the flyer and both are free on Google Fonts.

- **Poppins** for everything structural. Regular 400 for body, SemiBold 600 and Bold 700 for headings and the hero
- **Over the Rainbow** for section titles only, exactly as the flyer uses it for "Why Simply Arranged?" and "The Process". This is the signature element. It appears two or three times per page maximum and never for body copy or buttons

Suggested scale, mobile first, fluid with `clamp()`:

- Hero: 40px to 56px, Poppins Bold, teal
- Script section title: 32px to 44px, Over the Rainbow, teal
- Section heading: 24px to 32px, Poppins SemiBold
- Body: 17px to 18px, line height 1.6
- Small print: 14px

### Layout and feel

Centred single column, generous vertical rhythm, wide line spacing. The flyer is calm and uncluttered and the site should match. Full bleed teal bands separate sections the same way the flyer does. Rounded corners on cards and buttons at 8px to 12px. Soft shadows only, no harsh borders.

The process section is a genuine five step sequence, so numbered or connected steps are appropriate here. Use the flyer's pill shaped teal labels for each step name.

### Assets needed from the client

- Logo as SVG, ideally the heart mark separately from the wordmark
- The hero illustration at higher resolution than the PDF, or a licence note if it is stock
- Team photos and real names for the about page
- The mufti video, or confirmation of when it will be recorded

---

## 5. Tech stack

Deliberately boring, cheap and matching the existing skill set.

**Phase 1**
- Plain HTML, CSS and vanilla JS. No framework, no build step
- Firebase Hosting
- Google Fonts loaded with `preconnect` and `display=swap`
- Form posts to a Firebase Cloud Function, or to Formspree as a stopgap if the client wants to be live this week

**Phase 2**
- Firebase Auth for members and admins, with custom claims for roles
- Cloud Firestore
- Cloud Functions in TypeScript for all privileged logic
- Firebase Storage for photos and documents, private by default
- Stripe Checkout for the £35 payment
- Admin dashboards as a separate app in the same project, either plain JS or a light framework, on a separate hosting target

Rough running cost while small: Firebase free tier or under £20 a month, domain £15 a year, ICO registration £52 a year, Stripe at 1.5 percent plus 20p per transaction.

---

## 6. Repository structure

```
SimplyArranged/
  README.md
  HANDOVER.md              this file
  CLAUDE.md                working rules for Claude Code
  firebase.json
  .firebaserc
  firestore.rules
  storage.rules
  assets/
    brand/
      Simply_Arranged.pdf
      logo.svg
      palette.md
  web/                     phase 1, the public site
    index.html
    about.html
    process.html
    join.html
    privacy.html
    terms.html
    css/
      tokens.css
      base.css
      layout.css
      components.css
    js/
      main.js
      form.js
    img/
  functions/               phase 2 and the enquiry handler
    src/
    package.json
  admin/                   phase 2, admin dashboards
  docs/
    data-model.md
    decisions.md           running log of decisions and dates
```

Branching: `main` is live, work on `feature/*` branches, squash merge. Never commit `.env`, service account JSON or Stripe keys.

---

## 7. Phase 1 build: the website

### Pages

**Home** `index.html`
1. Header: logo, nav (About, Process, Join), teal Join button
2. Hero: "Looking to find your partner the halal way?" plus the intro paragraph from the flyer, primary call to action Start your journey, the illustration
3. Teal band: "Creating a unique matchmaking experience, while adhering to Islamic principles"
4. Why Simply Arranged, script heading, the four flyer lines including the samosas and awkward silences line which stays exactly as written because it is the personality of the brand
5. The Process, script heading, the five steps
6. Mufti video section, embedded, with a placeholder block if the video does not exist yet
7. Call to action band leading to Join
8. Footer: contact email, social links, privacy policy, terms, company details, ICO registration number once obtained

**About us** `about.html`
Who the team are, why they started it, the Islamic principles the service follows, and how supervision and chaperoning works. This page is doing most of the trust work so it needs real names and real faces.

**Process** `process.html`
The five steps expanded, plus what the £35 covers, what happens if a match does not work out and what supervised meeting actually means in practice. Pull the exact wording from the client.

**Join** `join.html`
The enquiry form. See below.

**Privacy** and **Terms**
Required before launch, see section 16.

### The enquiry form

Keep phase 1 short. This is an enquiry, not the full profile. The full profile is captured on the call or in phase 2.

Fields:
- Full name
- Email
- Phone
- Gender
- Date of birth
- City or town
- Marital status
- Ethnicity or background
- Brief note, free text
- How they heard about Simply Arranged
- Checkbox: consent to Simply Arranged storing and processing this information including religious and ethnic details, with a link to the privacy policy. Unticked by default, submission blocked without it
- Honeypot field and a simple rate limit for spam

On submit: write to Firestore `enquiries`, email the team, show a thank you state on the same page. No redirect to a third party.

### Quality floor

- Responsive from 320px up, mobile first
- Lighthouse 90 plus on performance and accessibility
- Visible keyboard focus rings in teal
- `prefers-reduced-motion` respected
- Colour contrast checked, teal on cream passes for large text but body copy should be near black rather than teal
- Real page titles, meta descriptions and Open Graph tags. The share image should be the flyer hero
- Favicon from the heart mark

---

## 8. Phase 2 data model

Firestore, all collections denied by default in rules and opened selectively.

### `users/{uid}`
`email`, `phone`, `role` (member or admin), `status` (pending, active, suspended, exited), `createdAt`, `lastLoginAt`, `consentVersion`, `consentAt`

### `profiles/{uid}`
Personal detail. Split from `users` so it can be read under different rules.

`gender`, `firstName`, `lastName`, `dob`, `city`, `postcodeArea`, `ethnicity`, `languages[]`, `sect`, `practisingLevel`, `maritalStatus`, `hasChildren`, `education`, `occupation`, `heightCm`, `aboutMe`, `familyBackground`, `willingToRelocate`, `photoPaths[]`, `photoVisibility`, `verifiedBy`, `verifiedAt`, `visibility`

### `preferences/{uid}`
`ageMin`, `ageMax`, `maxDistanceMiles`, `ethnicityPrefs[]`, `sectPrefs[]`, `practisingLevelMin`, `maritalStatusPrefs[]`, `acceptsChildren`, `relocateOk`, `dealBreakers[]`

### `matchStates/{uid}`
The lock. Kept tiny and separate so transactions are cheap.

`status` (available, in_progress, paused, exited), `currentMatchId`, `lockedAt`, `reviewDueAt`

### `matches/{matchId}`
Never readable by members directly, only through a Cloud Function that returns their own side.

`maleUserId`, `femaleUserId`, `createdBy`, `createdAt`, `status` (proposed, awaiting_decisions, active, meeting_arranged, successful, failed, expired), `maleDecision` (pending, interested, declined), `femaleDecision`, `maleDecidedAt`, `femaleDecidedAt`, `decisionDeadline`, `reviewDueAt`, `outcome`, `failureReason`, `closedBy`, `closedAt`, `matchmakerNotes`

### `exclusions/{pairKey}`
`pairKey` is the two user ids sorted and joined, so the pair can never be proposed again. Fields: `userA`, `userB`, `reason`, `createdAt`

### `meetings/{meetingId}`
`matchId`, `scheduledAt`, `durationMins`, `locationName`, `locationAddress`, `arrangedBy`, `status` (proposed, confirmed, completed, cancelled, no_show), `attendeesNote` (who is bringing whom), `outcomeNotes` (admin only), `followUpDueAt` which defaults to three days after the meeting to match the promise on the flyer

### `threads/{uid}` and `threads/{uid}/messages/{messageId}`
Correspondence is always member to team. A thread has exactly one member and the team. Message fields: `senderType` (member or team), `senderId`, `body`, `attachmentPaths[]`, `sentAt`, `readAt`.

Hard rule enforced in rules and in code: a thread can never contain two member participants.

### `payments/{paymentId}`
`userId`, `amountPence` (3500), `currency`, `stripeSessionId`, `stripePaymentIntentId`, `status`, `periodStart`, `periodEnd` (six months after start), `receiptUrl`

### `adminUsers/{uid}`
`role` (superAdmin, matchmaker, moderator), `displayName`, `active`. Authoritative role lives in the Auth custom claim, this collection is for display and management.

### `auditLog/{logId}`
Every admin action that touches member data. `actorId`, `action`, `targetType`, `targetId`, `summary`, `at`. Write only, never editable, readable by superAdmin only.

### `enquiries/{enquiryId}`
Phase 1 form submissions. Same fields as the form plus `handledBy`, `handledAt`, `convertedToUid`.

---

## 9. Match lifecycle

The state machine, which is the heart of the product.

```
available
    |  matchmaker proposes a pair (transaction)
    v
in_progress / match: awaiting_decisions
    |                          |
    | both interested          | either declines, or deadline passes
    v                          v
match: active            match: failed or expired
    |                          |
    | meetings arranged        | write exclusion, release both
    v                          v
match: meeting_arranged     available
    |
    | matchmaker closes
    v
successful (both exited)  or  failed (both released, exclusion written)
```

Rules:

- **Locking is a Firestore transaction.** Read both `matchStates`, confirm both are `available`, create the match and flip both to `in_progress` in one atomic write. Without this you will eventually double book someone
- **Decisions are one way.** A member writes only their own decision through a callable function. The response never contains any hint of the other side's answer. Not in the payload, not in a status string, not in a timestamp
- **Decision deadline.** Default seven days. If a member does not respond, treat it as a decline, release both and tell neither
- **Review point.** Default four weeks after a match goes active. A scheduled function flags it to the matchmaker dashboard so nobody sits locked for months. This addresses the biggest risk in the whole model
- **Release on request.** A member can ask to be released. That is a request to the team, not a self serve button
- **Never rematch.** Every failure writes an exclusion pair

---

## 10. Cloud Functions

All privileged logic lives here. The client apps never write to `matches`, `matchStates`, `payments` or `auditLog` directly.

| Function | Trigger | Job |
|---|---|---|
| `submitEnquiry` | HTTPS | Validate phase 1 form, write enquiry, email team, send confirmation |
| `getCandidates` | Callable, admin | Return ranked candidates for a given member, hard filters applied |
| `proposeMatch` | Callable, admin | Transactional lock, create match, notify both members that a match is ready to view |
| `getMyMatch` | Callable, member | Return the redacted counterpart profile and the member's own decision only |
| `submitDecision` | Callable, member | Write own decision, never reveal the other side |
| `resolveMatch` | Firestore trigger on match write | If both interested go active and alert admins. If either declined, close, release both, write exclusion |
| `expireDecisions` | Scheduled daily | Auto decline past deadline, release both |
| `flagMatchReviews` | Scheduled daily | Surface active matches past `reviewDueAt` |
| `closeMatch` | Callable, admin | Record outcome, release or exit, write exclusion on failure |
| `scheduleMeeting` | Callable, admin | Create meeting, notify both sides separately, set the three day follow up |
| `stripeWebhook` | HTTPS | Confirm payment, set six month period, unlock member |
| `exportMyData` | Callable, member | GDPR subject access |
| `deleteMyAccount` | Callable, member | GDPR erasure, keeping only what is legally required |

---

## 11. Security rules principles

- Default deny on every collection
- A member reads and writes only their own `users`, `profiles`, `preferences` and `threads/{ownUid}` documents
- A member can never read another member's profile document directly. The counterpart profile comes back redacted from `getMyMatch`, with contact details, surname and exact location stripped
- Members have zero read access to `matches`, `matchStates`, `exclusions`, `auditLog` or `payments`
- Admin access is granted by Auth custom claim only, never by a field the client could write
- Storage rules mirror this: photos are private, served through signed URLs issued by a function, never public
- Write a rules test suite with the Firebase emulator. The double blind property is a security property, not a UI property, and it needs a test that proves a member cannot read the other side's decision

---

## 12. Admin dashboards

Three roles, one codebase, permissions driven by custom claim.

**Super admin**
Everything. User management, admin management, payments, audit log, exports, deletion requests, config such as decision deadline and review window.

**Matchmaker**
The daily driver. Queue of available members, candidate search with filters and scores, propose match, view live matches and their decision states, arrange meetings, meeting history, close matches with outcome, notes.

**Moderator**
Verification and safety. Review new profiles before they go live, approve or reject photos, handle reports, suspend accounts. No access to payments or match outcomes.

Every dashboard action that reads or changes member data writes to `auditLog`.

---

## 13. Matching logic, version one

Do not overbuild this. Version one is a filter and a score that hands a ranked list to a human, who makes the call. The flyer already promises a human presenting the match, so that is the honest implementation.

**Hard filters,** applied both ways so the match works for each side:
- Opposite gender
- Both `available`
- Age inside the other's range
- No exclusion pair
- Any declared deal breakers

**Soft score,** weighted and tunable, suggested starting weights:
- Practising level alignment: 30
- Sect alignment: 20
- Location proximity: 20
- Ethnicity or background preference: 15
- Marital status and children compatibility: 10
- Education and occupation: 5

Return the top twenty with the score breakdown visible to the matchmaker so they can see why, not just what.

---

## 14. Calendar and meeting history

- Matchmaker sees a calendar of all upcoming supervised meetings, filterable by matchmaker
- A member sees only their own meetings, with date, time, location and a reminder that they may bring someone
- Meeting history per member and per match, including outcomes and follow up notes, admin side only
- Automatic three day follow up task after every completed meeting, matching the promise made on the flyer
- Calendar invites by email are a nice to have, not version one

---

## 15. Payments

- £35, taken at the match found stage, covering a six month subscription
- Stripe Checkout, no card details ever touch our servers
- Webhook sets `periodStart` and `periodEnd` and unlocks the member
- Store what the fee covers in config, not in code, because it will change

Commercial flag for the client, not a build decision: the fee only lands once a match is found, so all search work up to that point is unpaid. There is no answer yet on whether a second match inside the six months costs another £35. Build the schema so either answer is possible, which means tracking payments against a period rather than against a specific match.

---

## 16. Data protection

This is not optional and it needs doing before the site collects a single record.

- The service collects religion, sect and ethnicity, which is special category data under UK GDPR. The lawful basis is explicit consent, which means an unticked checkbox, clear wording and a record of what was consented to and when
- Register the business with the ICO, roughly £52 a year
- Publish a privacy policy covering what is collected, why, who sees it, how long it is kept and how to request deletion. State plainly that the matchmaking team sees the full profile, because that is the whole product
- Publish terms of service covering the fee, refunds and conduct
- Retention policy: define how long an exited member's data is kept, then actually enforce it with a scheduled function
- Subject access and erasure need to be functions, not a manual scramble
- Photos are personal data. Private storage only, signed URLs, no public bucket

None of this is difficult. It is just easier now than after a complaint.

---

## 17. Non functional requirements

- **No direct member to member contact anywhere in the system.** No chat, no email reveal, no surname in a redacted profile, no location precise enough to identify an address. If a feature request would break this, it goes back to the client before it gets built
- Mobile first throughout. Most of this audience will never open a laptop
- Accessibility to WCAG AA
- All admin actions audited
- Emulator based tests for security rules and for the match transaction
- Secrets in Firebase config or Secret Manager, never in the repo

---

## 18. Build order

| Milestone | Contents | Rough effort |
|---|---|---|
| M1 | Repo, Firebase project, tokens, home page | 1 to 2 days |
| M2 | About, process, join form, privacy, terms, launch | 2 to 3 days |
| M3 | Auth, member profile and preferences, admin shell with roles | 1 to 2 weeks |
| M4 | Matching engine, propose, decision flow, resolve, exclusions | 1 to 2 weeks |
| M5 | Meetings, calendar, history, follow ups | 1 week |
| M6 | Member to team messaging | 3 to 5 days |
| M7 | Stripe, GDPR tooling, audit log, launch checks | 1 week |

M1 and M2 are the current job. Everything after that waits on the answers in section 19.

---

## 19. Still open with the client

Numbering never changes, because other documents refer to these by number. Answered items keep their number and get their answer written underneath.

Blocking phase 2, not phase 1:

1. **Open.** Who is the middleman in practice: an employed matchmaker, the founder himself, or the woman's wali nominated at signup. This decides whether a wali portal is needed
   - Partial. The form collects a parent or guardian's name, number and relationship, plus a confirmation that at least one of them has been told. All optional. That records who the guardian is, it does not make them a participant
2. **Open.** Do members get a yes or no on a proposed profile before it locks, or does the matchmaker pair people outright. The flyer implies the former, the earlier conversation assumed it, so it needs confirming
3. **Open.** Photos: visible on the proposed profile, released only after both agree, or never in app
4. **Answered, 27 July 2026.** What happens after the six months if no match has succeeded
   - Another £35 for the next six months. The fee is a recurring subscription, not a one off
5. **Mostly answered, 27 July 2026.** Does a second match inside the six months cost another £35
   - The fee is tied to a six month period rather than to a match, so a second match inside that window should already be covered. Stated that way on `process.html` and flagged there as needing confirmation
   - This confirms the schema call in section 15. Track payments against a period, not a match
6. **Open.** Are profiles verified by a human before going live, and what proof is required
7. **Open.** Who owns the code, the domain and the Firebase account
   - The repo is `github.com/mozaid9/SimplyArranged`, private. The domain is registered on IONOS. No Firebase project exists yet

Blocking phase 1:

8. **Answered, 27 July 2026.** Domain. Confirm and buy
   - `simplyarranged.co.uk` was already registered and already forwarding to the form. Nothing to buy. `simplyarranged.com` is not owned and sits parked on Afternic
   - The client has parked anything to do with going live, so the DNS repoint is not scheduled
9. **Open.** Does the mufti video exist yet
   - The home page has a placeholder card so the layout is settled. The embed drops straight in
10. **Open.** About us content: real names, photos and the founding story
    - The about page is built and the founding story is drafted from the flyer. The team section is still an empty placeholder and is the last thing missing from phase 1. Deferred by the client
11. **Answered, 27 July 2026.** Export of the current bit.ly form so its fields feed the profile schema
    - All 40 fields, types, required flags and choice lists are in `docs/form-schema.md`, along with what the phase 2 model is missing and what it has that the form does not collect
12. **Partly answered, 27 July 2026.** Company details for the footer: registered name, number, contact email
    - Contact email is `simplyarranged@hotmail.com` and it is used across the site, in both legal pages and as the address for data requests. Registered name, company number and a postal address are still needed, and the privacy policy and terms cannot be published without them

New since this document was written:

13. **Open.** The consent problem. The form collects religion, school of thought, prayer practice, ethnicity and disability behind a single "I accept the T&C" tickbox pointing at terms that were never published. A consent gate now sits in front of the form, but a static page cannot record consent. The fix is three consent questions inside the form itself and the exact wording is in `docs/consent.md`
14. **Open.** ICO registration, roughly £52 a year. Section 16 already calls for it and nothing has been done
15. **Open.** Data retention period. How long an exited member's data is kept. The privacy policy cannot be published without it
16. **Open.** Refund position on the £35
17. **Open.** Minimum age. The service is for adults looking to marry, the draft terms say 18, and the form asks for an age but sets no minimum
18. **Open.** Whether the Microsoft account holding the form is in the UK or EU region, and whether responses leave the UK. If they do, the transfer basis needs stating in the privacy policy

---

## 20. Definition of done for phase 1

Status as at 27 July 2026.

| Done | Item | Where it stands |
|---|---|---|
| Partly | Five pages live on the real domain over HTTPS | Six pages built. Not deployed, and the domain is parked by the client |
| Yes | Brand matches the flyer closely enough that they read as one thing | Colours and both typefaces sampled from the flyer, artwork extracted from it |
| Changed | Enquiry form writes to Firestore, emails the team and confirms to the user | Superseded. The client has kept the Microsoft Form, embedded behind a consent gate on the join page |
| Partly | Consent checkbox in place, privacy policy and terms published | Consent gate built. Both legal pages drafted but neither is fit to publish. Items 12 to 18 above are what is blocking them |
| Yes | Lighthouse 90 plus on performance and accessibility | Accessibility, best practices and SEO all 100 on every page. CLS peaks at 0.07 on join, inside the good threshold |
| Yes | Works from 320px to desktop | No horizontal scroll at 320, 375, 768 or 1280 |
| Yes | 404 page, favicon, social share image | All three built from the flyer artwork |
| No | The bit.ly link points at the new site | Parked with the rest of the launch work |

What is genuinely left is content and decisions rather than code. The team section on the about page, and the answers to items 12 to 18.
