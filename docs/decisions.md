# Decisions

Running log. Newest at the top. Every entry gets a date and a reason so nobody has to guess later.

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
