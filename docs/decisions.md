# Decisions

Running log. Newest at the top. Every entry gets a date and a reason so nobody has to guess later.

## 4 August 2026, cutting the pages back

Client instruction, after seeing the site on the review link. The wording was to make it clean first, then carry on, so this is a deliberate simplification rather than anything being lost by accident. All of it is recoverable from git.

### Home page

The hero illustration is gone and the introduction video takes its place, so the video now sits inside the hero rather than in a section of its own further down. Order is heading, lead paragraph, video, then the button.

The client had already made this edit by hand and it left the file with two copies of the video block and unbalanced `section` tags. Rebuilt cleanly. `loading="lazy"` came off the poster because it is above the fold now, where lazy loading only hurts.

### About page

- Heading and lead centred, matching the home page, by putting `hero` on the first section
- The illustration from the home page opens this page instead
- "Doing it the halal way" moved above the "Creating a unique matchmaking experience" band
- Everything after that band removed except "Ready when you are". That means the supervised meeting section, the fee section, the failed match section and the team placeholder

### Process page

Everything between the "You will never be asked to contact anyone yourself" band and "Ready when you are" removed. That means the fee section, the supervised meeting section and the failed match section.

### What this costs, worth knowing

**The fee is barely explained anywhere on the site now.** All that survives is the flyer line inside step three of the process list, "A £35 admin fee covers a 6-month subscription", plus the full terms on `terms.html`. The client's own reasoning, that it keeps the list serious and covers running costs, is no longer on a page anyone reads before signing up. Worth putting back somewhere before launch.

**The reassurance about a match not working out is gone too.** That section existed because the fear of being turned down is what stops people starting. It is now only in the terms.

Both pages end on two teal bands back to back. It reads as one continuous close rather than two blocks with a seam, so it has been left alone.

### The unverified claims are no longer published

The one match at a time, double blind and never rematch wording was on about and process and is now on neither. So the todo blocks flagging it are gone, and the site no longer makes a promise nobody has confirmed. The question itself is still open and still on the launch checklist, it just is not live on a page any more.

Seven of the nine remaining todo blocks are on the two legal pages. Home, about, process and join now carry none.

## 4 August 2026, spacing and the halal way section

### The gap between sections was two rhythm steps, not one

Client flagged the gap above "Doing it the halal way" as looking unnatural. Measured rather than guessed: 160 pixels at a 1440 wide viewport, made of the bottom padding of one section plus the top padding of the next. Every `.section` contributes a full `--sa-section-gap`, so two in a row produce two steps where one was intended.

Fixed in `layout.css` with a single rule:

```css
.section + .section {
  padding-block-start: 0;
}
```

Spacing against a band, against the header and at the page edges is untouched, so the only thing that changes is the doubling. It applies site wide, which is right, because about, process and join all had the same doubling.

Flat specificity and one owner for section spacing, as `CLAUDE.md` asks. This does not fight the `.section` rule, it corrects it in the one case it gets wrong.

### The four white cards are gone

Client instruction. The paragraph and the four cards under "Doing it the halal way" are both removed. Removing the cards alone was not an option, because the paragraph ends "in practice that means four things" and would have been pointing at nothing.

That leaves the heading on its own, which turns out to work. It now reads as the title of the teal band directly below it, which says "Creating a unique matchmaking experience, while adhering to Islamic principles". A new `.section-intro` modifier pulls the heading down towards the band so it reads as introducing it rather than floating between two things.

The four principles were the clearest statement anywhere on the site of how the service actually works. No member to member contact, same gender calls, supervised meetings, family involved. All four are still true and all four are still in the terms. If any of it goes back, this is the wording to go back to, and it is in git.

### Opening headings are centred on all four public pages

Home, about, process and join now all open with `class="section hero"`, so the heading and the lead paragraph are centred. Join also had a note that was individually centred with `text-centre` while the heading above it was not, which is now unnecessary and has been removed.

The two legal pages stay ranged left on purpose. They are long form text read for reference rather than marketing pages, and centred body copy at that length is hard work. The `.legal` class already handles them.

The consent block on the join page also stays ranged left, because `.consent` sets it explicitly. Centred tickbox labels would be unreadable.

## 27 July 2026, the video

### The introduction video is now on the home page

Client confirmed the video from page two of the sign up form is the one to use. It is on the client's own YouTube channel at `youtube.com/@SimplyArranged`, video id `9obGfOTHKpM`, and the placeholder card on `index.html` is gone.

The section heading is "An introduction to Simply Arranged" rather than the "A word from our mufti" that handover section 7 asked for, because that is what the form calls it and there is nothing to say it is the mufti speaking. Change the heading if it turns out to be. Open item 9 is closed either way, since a video now exists and is embedded.

### Click to play rather than a plain embed

A YouTube iframe sets third party cookies the moment the page loads, which would have made the privacy policy wrong on two counts. It says the site sets no cookies, and it explains that there is no cookie banner because nothing third party loads until the visitor asks for it.

So the page ships a local poster image and a play button, and `js/video.js` swaps in the iframe on click. Same pattern as the consent gate holding the Microsoft form in `data-src`. The embed uses `youtube-nocookie.com`, so even after playback Google is not setting its usual tracking cookies.

Side benefit, the home page makes no request to Google for the video at all, which keeps it fast.

### The poster has black bars and that is correct

`web/img/video-poster.jpg` is the video's real first frame. Measuring the YouTube thumbnail showed three bands: YouTube's own letterboxing at 45 pixels top and bottom, then the video frame, then black bars inside the video itself because the source artwork is a wide banner on black. The stored poster has YouTube's bars removed and the video's own left in, because those are genuinely what the video looks like.

If it ever wants to look better on a cream page, the fix is at the video end rather than ours. Re-export it without the internal letterboxing, or supply a proper poster image.

## 27 July 2026, the form as the source of truth

### ICO registration is deferred

Client decision. It happens once everything else is set up rather than now. The consequence is worth stating plainly: the privacy policy cannot be published without the registration number, and the consent tickboxes point at the privacy policy. So nothing goes live until this is done. Since nothing is deployed and the domain is parked, that costs nothing today.

### The form is authoritative, and it contained far more than its 40 questions

Client instruction was that whatever the form says is exactly what happens. Reading it properly while signed in turned up eleven section pages carrying content that none of the earlier extraction picked up, because the first pass only pulled `questions` and this lives in `descriptiveQuestions`.

**Terms and conditions already exist.** Page nine of the form is an acceptance page carrying a "Simply Arranged will" list, a "Your promise to us" list and a full disclaimer. They were never published anywhere a person could read them before signing up, which is why the tickbox pointed at nothing. `terms.html` now carries them as written, per the rule in `CLAUDE.md` about client copy, with a note saying which parts are theirs and which are drafted around them.

**There is an FAQ.** It answers several things that were sitting open:

| Question | Answer on the form |
|---|---|
| When does the subscription begin | As soon as a strong potential match is presented to you |
| How long | Six months from that first match |
| Cost | £35 for six months |
| What if nobody is found in six months | You can choose to extend |
| Why an admin fee | To make sure everyone registering is serious and committed, and to cover some day to day running costs |
| Why photos | So we can be fully transparent with potential matches. Only shared with your permission |
| Why the phone call | To really get to know you and your interests |

Two corrections came out of that. The site said the fee automatically becomes another £35, and it is actually a choice to extend. And the fee rationale on the site was only the running costs half. The commitment half is the client's own first reason and it is now the first one given.

**Photos were missing from the site entirely.** The form asks for two to five recent unfiltered photos sent by WhatsApp to 07471881952. They are shown to a match only once the member gives permission. Photos of women who wear niqab are meant to be seen only by a female team member, and the form is honest that during matching this cannot always be guaranteed. None of that was in the privacy policy, which is a real gap rather than a cosmetic one, and it also drags Meta in as a processor. Now covered, including the honest caveat, and the process page mentions photos as part of step one.

**The guardian question, open item 1, is largely answered.** The form says at least one parent or guardian should ideally know about the member's involvement, and should ideally also be involved when matches are presented and when meetings are arranged. So the guardian is a participant, not just a recorded name. The about page now says that properly.

**Verification, open item 6, is answered.** The disclaimer states plainly that there are no background checks and no identity verification. That is now on the privacy policy as well as in the terms rather than left as a soft "we cannot verify everything".

**Still silent on the bit that was actually flagged.** Nothing anywhere in the form covers one match at a time, whether a member is told the other side's answer, or not being put forward to the same person twice. Those three claims on `about.html` and `process.html` come from section 9 of the handover and remain unverified. The todo blocks stay.

**There is an introduction video.** Page two of the form asks people to watch one. Worth finding out whether it is the mufti video from open item 9 or something else, because if it exists it could go on the home page where there is currently a placeholder.

### 132 people have already signed up

Seen in the form's own summary while checking the above. That number changes the shape of the consent problem in `docs/consent.md`. It is not an abstract gap, it is 132 real people who agreed to "I accept the T&C" against terms that were never published. Whatever is decided about re-consenting, it is 132 emails rather than a handful.

### The form understates how long it takes

The form tells people it takes about ten minutes. The average across those 132 responses is nearer half an hour. `join.html` now says twenty to thirty minutes, because somebody who sits down expecting ten and hits eleven pages is a person who abandons it halfway. Worth changing on the form itself too.

## 27 July 2026, about

### The fee, the meeting and the failed match all appear on About as well

Client instruction, and the reasoning is worth keeping: better that people are made aware than that it sits at the bottom of a page nobody scrolls to.

So About carries all three, rewritten for that page rather than pasted across. The fee section opens with "we would rather tell you this here than leave you to find it in the small print" and closes with "there is nothing else to pay and nothing hidden underneath it". The failed match section leads on the fear of being turned down being the thing that stops people starting at all.

The supervised meeting wording and the failed match wording are word for word identical on both pages. Deliberate, because both readings need the same promise, but it is now two places to edit. With no build step there is no include mechanism to lean on. If a third page ever needs the same text, that is the point to stop copying and reach for one.

### About page built

`web/about.html`. Why we started, doing it the halal way, what a supervised meeting means, what we charge and why, what happens when it does not work out, then the team.

The four halal principles are drawn from what the service already does rather than invented: no member to member contact from handover section 17, same gender calls from the form's own preamble, supervised meetings from the flyer, and the parent or guardian fields from the form.

The opening section uses the flyer's samosas line as written and then adds a paragraph about how the search usually goes. That paragraph is brand colour rather than fact and the client should read it as such.

The team section is still a placeholder. Real names and photos are handover open item 10 and they are the last thing missing from phase 1.

### Card alignment

`.reasons-long` added. The short flyer lines on the home page read fine centred. The longer About cards with a bold lead in do not, so they range left.

## 27 July 2026, the fee

### The £35 is per six months, not per match

Client answer, and it settles most of open item 5 in the handover.

- Charged once a match is found. Nothing at sign up, nothing while the search runs
- Covers the six months that follow
- Still a member at the end of six months, another £35 for the next six
- The money is reinvested into running the service

The reason given, which is now on the process page in the client's own framing: matchmaking done properly takes real time, and they would rather charge a small fee and get it right than do it quickly and get it wrong.

Two parts of it are still open. Whether a second match inside the same six months is covered by the original fee, which is how `process.html` currently reads because the fee is tied to a period rather than to a match. And the refund position. Both are visible todo blocks on the page.

This also confirms the phase 2 schema decision in handover section 15 was the right one. Payments track a period rather than a specific match, which is exactly what a recurring six month fee needs.

### Process page built

`web/process.html`. The five flyer steps with a paragraph of expansion under each, the fee section, what a supervised meeting actually involves and what happens if a match does not work out.

The last of those is written from the one match at a time and double blind rules in handover section 9, which describe the intended product rather than anything confirmed about today's manual process. Flagged on the page as needing a check before launch. About is still the only page not built, and it is waiting on real names and photos.

## 27 July 2026, later

### Every change gets pushed

Client instruction. Work goes straight to `main` on `github.com/mozaid9/SimplyArranged` as it is finished, rather than sitting locally.

### simplyarranged@hotmail.com is the contact for everything

Client instruction. It is now the contact address in the footer of every page, in the privacy policy, in the terms and as the address for data requests and consent withdrawal. The WhatsApp number stays alongside it because people already use it and it is already public on the form.

### The domain is parked as a topic

Client instruction. The DNS repoint at IONOS and anything else about going live is off the list for now. The site is being built to be ready, not to be launched. `og:url` tags still point at `simplyarranged.co.uk` because that is where it will eventually live, and they cost nothing to leave in place.

### Consent gate built in front of the form

The Microsoft Form has one tickbox, "I accept the T&C", pointing at terms that were never published, and it goes on to collect religion, school of thought, prayer practice, ethnicity and disability. `join.html` now puts explicit consent in front of it: two unticked boxes, plain wording about what is collected and who sees it, and a button that does nothing until both are ticked.

The Microsoft iframe holds its URL in `data-src` and only gets a real `src` once consent is given, so nothing is requested from Microsoft and no cookie of theirs is set beforehand. That is also why the site needs no cookie banner.

Two honest limits, both written up in `docs/consent.md`. The gate stores nothing, so it is not a record of consent. And the form URL still works if somebody goes straight to it, so it is not a hard gate. The durable record needs a consent question inside the form itself, and the wording to paste in is in that same file.

With JavaScript off the button stays an ordinary link to the form and the consent wording is still on the page above it.

### Privacy policy and terms drafted

`web/privacy.html` and `web/terms.html`. Both are real drafts rather than placeholder pages, because the consent tickboxes have to point at something. Both carry a loud unresolved block at the top and neither is fit to publish until the registered business details, the ICO number, a retention period and the refund position exist, and somebody qualified has read them.

Anything genuinely undecided is a `.todo` block on the page rather than an invented answer. There are five on the privacy policy and four on the terms.

### CLS of 0.07 on the join page

Lighthouse gives accessibility, best practices and SEO 100 across the site. The join page shifts 0.07 as the Google Fonts swap lands on a long page of text. That is inside the 0.1 "good" threshold so it is being left alone. If it ever needs fixing, the answer is fallback font metrics with `size-adjust` rather than anything clever.

## 27 July 2026

### Repo lives at the existing GitHub remote

`github.com/mozaid9/SimplyArranged`, private, `main` is live. The local folder was turned into a repo on top of the existing initial commit rather than force pushed over it. Layout follows section 6 of `HANDOVER.md`.

`CLAUDE.md` and the handover moved to the repo root, and the flyer moved to `assets/brand/Simply_Arranged.pdf`, because `CLAUDE.md` tells every future session to read `HANDOVER.md` from the root.

### British English added to the writing rules

`CLAUDE.md` already banned em dashes and Oxford commas. British English is now on that list too, for copy, comments, commit messages and docs. CSS property names stay American because the language defines them that way, so `color:` in a stylesheet is correct.

### The domain already exists

`simplyarranged.co.uk` is registered and served by IONOS nameservers. It currently forwards straight to the Microsoft Form. That answers open item 8 in the handover, which assumed the domain still had to be bought. Launching phase 1 is a DNS change rather than a purchase.

`simplyarranged.com` is not owned. It sits parked on Afternic nameservers and is presumably for sale.

### Microsoft Form stays for now

Client decision. The handover's phase 1 plan was a short enquiry form posting to Firestore. Instead the live 40 question Microsoft Form keeps running and the site sends people to it.

Planned shape for `join.html` when it is built:

1. Embed `https://forms.office.com/r/pAn3746bN1?embed=true` in an iframe inside our own header and footer so the visitor stays on the domain
2. The form owner sets the form's thank you message to link back to `simplyarranged.co.uk`. Microsoft Forms has no automatic redirect after submit, so this is the closest thing to sending people back
3. If `forms.office.com` refuses to be framed, fall back to a prominent outbound link

The iframe must use the `forms.office.com` URL and never `simplyarranged.co.uk`, or it loops once the DNS forward is removed.

Two things this leaves open. The consent gap described in `docs/form-schema.md` is live right now, not a phase 2 problem. And enquiries stay inside a Microsoft tenant rather than in Firestore, so the phase 2 import is a manual export.

### Form schema captured

All 40 fields recorded in `docs/form-schema.md`, pulled from the form definition on the page rather than typed by hand. Open item 11 in the handover is closed. Two service constraints surfaced that the handover never mentioned, British passport holders and North West of England, and both are now in the home page copy.

### Brand assets extracted from the flyer PDF

The client has not supplied a logo SVG or a high resolution hero, so both were pulled out of the flyer with `pdfimages` and treated as interim:

- `web/img/logo-heart.png`, the heart mark at 313 by 350 with its alpha mask merged back in
- `web/img/hero.webp`, the night sky illustration, resized from 1024 square and converted from a 908 KB PNG down to 27 KB
- `web/img/og-image.jpg`, a 1200 by 630 crop of the same illustration for social sharing
- `web/img/favicon-32.png` and `web/img/apple-touch-icon.png`, both from the heart mark
- `assets/brand/arrow-1` to `arrow-4`, the hand drawn arrows from page 2, kept for the process section later
- `assets/brand/qr-scan-here.png`, the flyer QR code, which encodes the bit.ly link
- `assets/brand/hero-source.png`, the full resolution original

Still wanted from the client per handover section 4: the logo as SVG with the heart separate from the wordmark, and the hero illustration at higher resolution or a licence note if it is stock.

The wordmark is live Poppins text inside the PDF rather than artwork, so the header renders it as real text. Crisper, selectable and readable by a screen reader.

### Hero image is WebP with no fallback

Universal browser support since 2020 and the fallback would have cost another 200 KB in the repo for no one. If a fallback is ever needed, `assets/brand/hero-source.png` is the original.

### Contact number on the site

The footer uses the WhatsApp number from the Microsoft Form, 07471881952, because it is the only contact channel the business currently publishes. Confirm with the client before launch, and swap it for a business email if one exists.

### Mufti video is a placeholder

Open item 9 in the handover. The section is built with a placeholder card so the layout is settled, and the embed drops in when the recording exists.
