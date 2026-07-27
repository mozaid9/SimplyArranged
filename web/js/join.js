/* Consent gate on the join page.

   The sign up form is a Microsoft Form and it carries a single "I accept the
   T&C" tickbox, which is not enough for the religion, ethnicity and health
   details it goes on to collect. This gate puts explicit consent in front of it
   and only loads the form once both boxes are ticked.

   Two things this deliberately does not claim to be. It is not a record of
   consent, because a static page has nowhere to write one. And it is not a
   hard gate, because anyone can open the form URL directly. The durable record
   still has to come from a consent question inside the form itself. See
   docs/consent.md for the wording to paste in. */

(function () {
  'use strict';

  var CONSENT_VERSION = '2026-07-27.1';

  var form = document.querySelector('[data-consent-form]');
  if (!form) return;

  var boxes = form.querySelectorAll('[data-consent-box]');
  var button = form.querySelector('[data-consent-continue]');
  var status = form.querySelector('[data-consent-status]');
  var embed = document.querySelector('[data-form-embed]');
  var frame = embed ? embed.querySelector('iframe') : null;

  function allTicked() {
    return Array.prototype.every.call(boxes, function (box) {
      return box.checked;
    });
  }

  function refresh() {
    var ready = allTicked();
    button.setAttribute('aria-disabled', ready ? 'false' : 'true');
    status.textContent = ready
      ? 'Thank you. Continue when you are ready.'
      : 'Please tick both boxes to continue.';
  }

  function reveal(event) {
    event.preventDefault();

    if (!allTicked()) {
      refresh();
      boxes[0].focus();
      return;
    }

    // The iframe carries no src until now, so nothing loads from Microsoft and
    // no cookie of theirs is set until somebody has actually consented.
    frame.src = frame.getAttribute('data-src');
    embed.hidden = false;

    status.textContent =
      'Consent given on ' +
      new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) +
      '. Version ' + CONSENT_VERSION + '.';

    embed.scrollIntoView({ behavior: 'smooth', block: 'start' });
    frame.focus();
  }

  Array.prototype.forEach.call(boxes, function (box) {
    box.addEventListener('change', refresh);
  });

  button.addEventListener('click', reveal);
  form.addEventListener('submit', reveal);

  // Only now, once we know the script is running, does the button stop being a
  // plain link to the form. With JavaScript off the link still works and the
  // consent wording is still on the page above it.
  button.setAttribute('role', 'button');
  refresh();
})();
