/* Click to play facade for the introduction video.

   The page ships a local poster image and no YouTube iframe. Nothing is
   requested from Google until somebody actually presses play, which keeps the
   home page free of third party cookies and keeps the privacy policy honest
   when it says the site sets none.

   The embed uses youtube-nocookie.com, so even after playback starts Google is
   not setting its usual tracking cookies. */

(function () {
  'use strict';

  var facade = document.querySelector('[data-video]');
  if (!facade) return;

  var button = facade.querySelector('[data-video-play]');
  var src = facade.getAttribute('data-video-src');
  var title = facade.getAttribute('data-video-title') || 'Video';

  if (!button || !src) return;

  button.addEventListener('click', function () {
    var frame = document.createElement('iframe');
    frame.className = 'video-frame';
    frame.src = src + (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
    frame.title = title;
    frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.setAttribute('allowfullscreen', '');

    facade.replaceWith(frame);
    frame.focus();
  });
})();
