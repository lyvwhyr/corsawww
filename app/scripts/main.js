/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
})();

/**
 * Header Class
 *
 */
function header() {
  var pageScrolled = false;
  var isCompact = false;
  var $fullHeader = $('header');
  var $compactHeader = $('header-mobile');

  function onWindowScroll() {
    // if in compact mode don't calculate scroll
    if (isCompact === true) {
      return;
    }
    var delta = $(window).scrollTop();
    if (pageScrolled === false && delta >= 0) {
      pageScrolled = true;
      $fullHeader.addClass('fixed');
    } else if (pageScrolled === true && delta < 1) {
      pageScrolled = false;
      $fullHeader.removeClass('fixed');
    }
    console.debug(delta);
  }

  // TODO: check current status to reduce jquery dom searches
  function updateHeader() {
    if (isCompact === true) {
      $compactHeader.addClass('active').removeClass('nav-visible');
      $fullHeader.removeClass('active');
    } else {
      $compactHeader.removeClass('active');
      $fullHeader.addClass('active');
    }
  }

  // TODO: check current isCompact status to reduce cycles
  function onWindowResize() {
    var screenWidth;
    screenWidth = $(window).width();
    if (screenWidth < 900) {
      isCompact = true;
    } else {
      isCompact = false;
    }
    updateHeader();
    // var compactActive = $compactHeader.hasClass('active');
    // console.debug('compact-header active: ' , compactActive);
    // console.debug('isCompact: ' , isCompact);
  }

  function openCompactMenu() {
    $compactHeader.addClass('nav-visible');
  }

  function closeCompactMenu() {
    $compactHeader.removeClass('nav-visible');
  }

  function activate() {
    onWindowResize();
    // attach on resize event handler
    $(window).resize(onWindowResize);
    // attach on scroll event handler
    $(window).scroll(onWindowScroll);
    // attach onClick event handler for compact/mobile open menu button
    $('#openNavButton').click(openCompactMenu);
    // attach onClick event handler for compact/mobile close menu button
    $('#closeNavButton').click(closeCompactMenu);

    if (isCompact === false) {
      $('.chapter1').parallax("50%", 0.3);
      $('.chapter2').parallax("50%", 0.3);
      $('.chapter3').parallax("0%", 0.2);
    }
  }
  activate();
}

function onDocumentReady() {
  header();
  $('a').smoothScroll();
}


$(document).ready(onDocumentReady);
