# Consent

The sign up form collects religion, school of thought, how a member practises, ethnicity and disability. All of that is special category data under UK GDPR and the only lawful basis available is explicit consent. Explicit means specific wording, an unticked box, and a record of what was agreed and when.

Today the Microsoft Form has one tickbox, "I accept the T&C", pointing at terms that were never published. That does not carry any of it.

## What is now in place

The [join page](../web/join.html) puts a consent gate in front of the form:

- Plain wording covering what is collected, why, who sees it and how to withdraw
- Two unticked boxes, one for the data including the special category detail, one for the terms
- The button does nothing until both are ticked
- The Microsoft iframe carries no `src` until consent is given, so nothing loads from Microsoft and no cookie of theirs is set before then
- Version stamp `2026-07-27.1`, which matches the version at the top of the privacy policy and the terms

Two things this is honestly not:

1. **Not a record.** A static page has nowhere durable to write one. Nothing is stored
2. **Not a hard gate.** Anyone can open the form URL directly and skip the page entirely

So the gate improves what a member is told. It does not on its own fix the record keeping.

## What still needs doing, in order

### 1. Add a consent question to the Microsoft Form

This is the piece that makes the record real, and only the form owner can do it. Add these as two separate required questions, replacing the current "I accept the T&C" question. Copy the text as written.

**Question one.** Title:

> I consent to Simply Arranged collecting and using the information I give on this form, including my school of thought, how I practise, my ethnicity and any disability I disclose, so that the team can look for a match and present it to me.

Subtitle:

> This information is special category data under UK data protection law and we can only hold it with your consent. You can withdraw your consent at any time by emailing simplyarranged@hotmail.com. Full detail is in the privacy policy at simplyarranged.co.uk/privacy.html

Single choice, required, one option: `I consent`

**Question two.** Title:

> I have read and accept the terms of service at simplyarranged.co.uk/terms.html

Single choice, required, one option: `I accept`

**Question three.** Title:

> Consent version

Single choice, required, one option: `2026-07-27.1`

The third question looks odd but it is what turns every response into a record of *which* wording was agreed. When the policy changes, add the new version as the only option and the old responses still say what they said. If a version ever needs retiring, leave the old option in place rather than deleting it.

### 2. Publish the privacy policy and the terms

Both are drafted at [web/privacy.html](../web/privacy.html) and [web/terms.html](../web/terms.html) and both carry a loud unresolved block at the top. They cannot go live until:

- Registered business name, company number and a postal address exist
- The ICO registration is done and the number is in the policy
- A retention period is decided
- The refund position, what happens after six months and whether a second match costs another £35 are decided
- Someone qualified has read them

Until then the form links to pages that say they are drafts, which is still better than linking to nothing.

### 3. Register with the ICO

Roughly £52 a year. Handover section 16. This is not optional for a business processing special category data.

### 4. Move the form in house

The real fix, for phase 2. A form on our own domain posting to a Cloud Function that writes `consentVersion` and `consentAt` alongside the answers, as handover section 8 already describes on `users`. At that point the gate and the record are the same thing and none of the above workarounds are needed.

## Existing responses

Anyone who filled in the form before this was set up consented only to "I accept the T&C" against unpublished terms. Worth deciding what to do about them. The cautious option is to email everyone already on the list once the policy is published and ask them to confirm consent against the new wording.
