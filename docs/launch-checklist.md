# Launch checklist

Nothing on this list matters while the site is only being shown to the client on a preview link. Every item has to be cleared before the site is pointed at a real domain and left there.

## Undo the review settings

- [ ] **Remove the `X-Robots-Tag: noindex` header from `firebase.json`.** It is there on purpose so a half finished site with draft legal pages cannot turn up in a search. Leave it in and the finished site will never be indexed either
- [ ] **Clear every `todo` block from the pages.** Count them with `grep -c 'class="todo' web/*.html`. They are notes to the client and they are visible to anyone who opens the page

## Answers needed first

Tracked as items 12 to 18 in section 19 of `HANDOVER.md`.

- [ ] Registered business name, company number if there is one and a postal address. Goes in the privacy policy and the terms
- [ ] ICO registration done and the number in the privacy policy
- [ ] Data retention period decided, written into the privacy policy, then actually enforced
- [ ] Refund position on the £35
- [ ] Whether a second match inside the same six months is covered by the original fee
- [ ] Minimum age, then the same line added to the privacy policy, the terms and the form
- [ ] Whether people outside the North West are accepted or waitlisted
- [ ] Whether the Microsoft account holding the form is UK or EU region and whether responses leave the UK
- [ ] Confirmation of the one match at a time, double blind and never rematch rules. No longer published on any page since the 4 August cut, so this is no longer urgent, but it has to be settled before that wording goes back anywhere
- [ ] Team names, photos and a line each. The about page section was removed on 4 August, so it needs rebuilding as well as filling
- [ ] **Decide where the fee gets explained.** The 4 August cut left only the flyer line in step three of the process list and the full terms. The client's own reasoning, that it keeps the list serious and covers running costs, is no longer anywhere a person reads before signing up

## Jobs in other systems

- [ ] Three consent questions added to the Microsoft Form. Wording is in `docs/consent.md`
- [ ] Decide what to do about the 132 people who already signed up under the old tickbox
- [ ] Microsoft Form thank you message updated to link back to the site
- [ ] Someone qualified reads the privacy policy and the terms

## Then the launch itself

- [ ] Firebase project created and `.firebaserc` filled in
- [ ] **Move the Firebase project to the business account.** The intention was to own it from `simplyarranged@hotmail.com`, but Google would not let a new account be created at the time, so the project sits under a personal Google account for now. That is fine for a review link and wrong for a live service. Register the hotmail address as a Google account when Google allows it, add it as an owner in the console, then remove the personal one. This is handover open item 7
- [ ] `firebase deploy --only hosting` to the live channel rather than a preview channel
- [ ] IONOS DNS: drop the forward to the form, point the apex and `www` at Firebase Hosting
- [ ] Check HTTPS is live on both the apex and `www`
- [ ] Point `bit.ly/simplyarranged` at the site rather than straight at the form
- [ ] Check the share image by pasting the URL into WhatsApp

## Worth doing but not blocking

- [ ] Logo as SVG from the client, with the heart separate from the wordmark, replacing the extracted PNG
- [ ] Hero illustration at higher resolution, or a licence note if it is stock
- [ ] Introduction video re-exported without its internal letterboxing, or a proper poster image supplied
