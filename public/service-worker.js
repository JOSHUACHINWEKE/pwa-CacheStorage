const CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {
  console.log('Service Worker Installed');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/css/app.css',
          '/src/images/pwa.jpg',
          'https://fonts.googleapis.com/css?family=Raleway:400,700'
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Service Worker Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {

        // return cached file if found
        if (response) {
          return response;
        }

        // otherwise fetch from network
        return fetch(event.request);
      })
  );
});