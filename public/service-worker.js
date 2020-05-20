const version = '1.4.0';

const cacheName = `Flash${version}`;

const filesToCache = [
  '/',
  '/index.html',
  '/global.css',
  '/build/bundle.css',
  '/build/bundle.js',
  '/manifest.json',
  '/icons/apple-icon-180.png',
  '/icons/favicon-32.png',
  '/icons/favicon-16.png',
  '/icons/apple-splash-750.png',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache)).then(() => {
      console.log('[SW] service worker installed...');
      self.skipWaiting();
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      console.log(`[SW] Cache ${response ? 'Hit' : 'Miss'}: ${event.request.url}`);
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[SW] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    }).then(function () {
      console.log('[SW] Claiming clients for', cacheName);
      return self.clients.claim();
    })
  );
});
