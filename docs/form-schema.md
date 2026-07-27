# Sign up form schema

Extracted 27 July 2026 from the live Microsoft Form at `https://forms.office.com/r/pAn3746bN1`, which is where `bit.ly/simplyarranged` and `simplyarranged.co.uk` both point today. This closes open item 11 in `HANDOVER.md`.

Form title: **Simply Arranged - Stress Free Pairing For Muslims**. 40 questions across 11 pages, roughly 10 minutes to complete.

Question numbers below are the form's internal order, which is not the order a member sees. The form is paged and shuffled by page, so treat the grouping here as the meaningful structure and the numbers as identifiers.

## What the form says before any question

> Please only fill in this form if you are a British passport holder.
>
> This service, at present, is aimed at those living in the North West region. If you live outside of this region, please specify in the town/city question, and we will look to be of assistance.
>
> For any questions, send us a message on WhatsApp on 07471881952
>
> Your data is important to us. We will try to ensure that your data is processed with the strictest confidentiality.
>
> We may follow up your form completion with a short telephone call in which we will discuss your profile in more detail, to ensure we find you the best match possible. This will be done female to female and male to male.

Two service constraints live here and nowhere else in the handover, so they need to reach the website copy: **British passport holders** and **North West of England**.

## Identity and contact

| # | Question | Type | Required | Phase 2 home |
|---|---|---|---|---|
| 36 | Full name | Text | Yes | `profiles.firstName` and `profiles.lastName` |
| 6 | Email address | Text | Yes | `users.email` |
| 35 | Phone number | Text | Yes | `users.phone` |
| 16 | Gender | Male, Female | Yes | `profiles.gender` |
| 1 | Age | Text | Yes | `profiles.dob`, see note below |
| 26 | Town/City | Bolton, Preston, Blackburn, Darwen, Manchester, Burnley, Rochdale, Oldham, Chorley, Liverpool, Blackpool, Clitheroe, Bury, Salford, Leyland, Wigan, Leigh, Atherton, Haslingden, Stockport, Warrington | Yes | `profiles.city` |

Age is captured as free text rather than a date of birth. Phase 2 needs a real `dob` for the age range filter in handover section 13, so this changes when the platform is built.

## About you, free text

| # | Question | Required |
|---|---|---|
| 20 | Please tell us more about yourself | Yes |
| 2 | Tell us one interesting fact about yourself | Yes |
| 4 | Please tell us in as much detail about what you are looking for in a potential spouse | Yes |
| 10 | Occupation | Yes |
| 13 | Name of company and industry | Yes |
| 12 | Highest level of education: GCSE, A-Level, BTEC, Undergraduate Degree, Masters Degree, PhD | Yes |

Maps to `profiles.aboutMe`, `profiles.occupation` and `profiles.education`.

## Religious practice

Special category data under UK GDPR. See the consent note at the bottom.

| # | Question | Options | Phase 2 home |
|---|---|---|---|
| 25 | I am a... | Born Muslim, Revert | `profiles` needs a `revert` field, not currently in the handover model |
| 17 | Which School of Thought do you follow in understanding Quran & Sunnah? | Hanafi, Shafi'i, Hanbali, Maliki, I don't follow a School of Thought | `profiles.sect` |
| 40 | How are you with your Salaah? | Never pray, Sometimes pray, Mostly pray, Always pray | `profiles.practisingLevel` |
| 33 | Islamic education, multi select | Hafidh(a), Aalim(a), Formally studied Islamic education further e.g. through an institution, N/A | New field, `profiles.islamicEducation[]` |
| 21 | Appearance, multi select | No hijab, Hijab, Niqaab (veil), No beard, Short beard, Long beard | New field, `profiles.appearance[]` |

Question 21 is a single list covering both genders, so a woman and a man pick from the same six options. Worth tidying in phase 2.

## Background and physical

| # | Question | Options | Phase 2 home |
|---|---|---|---|
| 22 | Ethnicity | British Asian - Indian, British Asian - Pakistani, British Asian - Bangladeshi, British - African, British - White, British - Black, Arab | `profiles.ethnicity` |
| 18 | Ancestral city/town/village and country | Text, e.g. Surat (India) | New field, `profiles.ancestralOrigin` |
| 30 | Main language spoken at home, other than English | Gujarati, Urdu, Bengali, Arabic | `profiles.languages[]` |
| 32 | Height | 4'10 up to 6'3+ | `profiles.heightCm`, converted |
| 5 | Build | Slim, Athletic, Medium, Large | New field, `profiles.build` |
| 39 | Do you have any disabilities? | Yes, No | Special category adjacent, handle carefully |

Question 39 is a yes or no only. The subtitle says any yes is discussed on the follow up call rather than captured here.

## Marital situation

| # | Question | Options | Phase 2 home |
|---|---|---|---|
| 3 | Status | Single - never married, Divorced - no children, Divorced - with children, Widowed - no children, Widowed - with children | `profiles.maritalStatus` |
| 19 | Do you have any children? | 0, 1, 2, 3+ | `profiles.hasChildren`, widen to a count |
| 24 | Would you like (more) children? | Yes, No, Maybe | New field, `preferences.wantsChildren` |

## Preferences, what they are looking for

| # | Question | Options | Phase 2 home |
|---|---|---|---|
| 8 | Age preference | Text, e.g. 25-30 | `preferences.ageMin` and `preferences.ageMax`, needs splitting |
| 23 | Minimum height preference | 4'10 up to 6' | New field, `preferences.minHeightCm` |
| 11 | Ethnicity preference, multi select | The seven ethnicities above plus "Not important to me - would consider all ethnicities" | `preferences.ethnicityPrefs[]` |
| 15 | School of Thought preference | Hanafi, Shafi'i, Hanbali, Maliki, Any | `preferences.sectPrefs[]` |
| 31 | Islamic education preference, multi select | Aalim(a), Hafidh(a), Has formally studied Islamic education further e.g. through an institution, Not important to me - would consider all | New field |
| 27 | Would you consider a divorcee? | Yes, No | `preferences.maritalStatusPrefs[]` |
| 34 | Would you consider someone who already has children? | Yes, No | `preferences.acceptsChildren` |
| 38 | Would you consider a revert? | Yes, No | New field |
| 29 | Location preference after marriage, multi select | Just my hometown/city, Open to relocating in the NW, Open to relocating anywhere in the UK, Wouldn't mind relocating outside of the UK | `preferences.relocateOk` and `preferences.maxDistanceMiles` |

The form has no practising level preference to sit against question 40, even though handover section 13 gives practising level alignment the heaviest weight at 30. Something to raise with the client.

## Parent or guardian

All optional except the notification confirmation, which is also marked optional.

| # | Question | Type |
|---|---|---|
| 7 | Parent/Guardian's full name | Text |
| 14 | Parent/Guardian's phone number | Text |
| 28 | Relationship to you | Text |
| 37 | Please confirm that at least one parent/guardian has been notified | Yes, No |

These four are the closest thing the current process has to a wali, which is open item 1 in the handover. Nothing in the form makes the guardian a participant, it only records who they are.

## Consent

| # | Question | Options | Required |
|---|---|---|---|
| 9 | I confirm that I have read and accept the terms and conditions and the disclaimer set out by Simply Arranged | I accept the T&C | Yes |

This is the only consent on the form and it is a problem worth fixing early:

- The form collects religion, school of thought, ethnicity, disability and prayer practice. All of that is special category data under UK GDPR and the lawful basis has to be explicit consent
- There are no terms and conditions published anywhere to read, and no privacy policy, so the tickbox points at nothing
- Nothing records a consent version or a timestamp beyond the form response date

Handover section 16 covers what is needed. The fix is a published privacy policy and terms, a separate and specific consent line naming the special category data, and a `consentVersion` recorded with every submission.

## Fields the form has that the handover data model does not

Add these to `profiles` and `preferences` in handover section 8 when phase 2 starts: `revert`, `islamicEducation[]`, `appearance[]`, `ancestralOrigin`, `build`, `hasDisability`, `wantsChildren`, `minHeightCm`, `islamicEducationPrefs[]`, `considersRevert`, plus the guardian block.

## Fields the handover model has that the form does not collect

`postcodeArea`, `willingToRelocate` as a plain flag, `photoPaths[]`, `familyBackground` and anything to do with photos. Photos are open item 3 and still undecided.
