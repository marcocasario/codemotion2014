// Avoid `console` errors in browsers that lack a console.
(function() {
   var method,
      noop = function() {},
      methods = [
         'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
         'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
         'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
         'timeStamp', 'trace', 'warn'
      ],
      length = methods.length,
      console = (window.console = window.console || {});

   while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
         console[method] = noop;
      }
   }
}());

// Place any jQuery/helper plugins in here.


// Google Analytics: change UA-XXXXX-X to be your site's ID.
(function(b, o, i, l, e, r) {
   b.GoogleAnalyticsObject = l;
   b[l] || (b[l] =
      function() {
         (b[l].q = b[l].q || []).push(arguments);
      });
   b[l].l = +new Date();
   e = o.createElement(i);
   r = o.getElementsByTagName(i)[0];
   e.src = '//www.google-analytics.com/analytics.js';
   r.parentNode.insertBefore(e, r);
}(window, document, 'script', 'ga'));
ga('create', 'UA-XXXXX-X');
ga('send', 'pageview');