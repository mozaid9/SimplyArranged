# Decisions

Running log. Newest at the top. Every entry gets a date and a reason so nobody has to guess later.

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
