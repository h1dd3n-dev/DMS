// sw.js - Service Worker for Deed Management System (PWA)
const CACHE_NAME = 'dms-pwa-cache-v5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './dashboard.html',
  './manifest.json',
  './icon.png',
  './js/firebase-config.js',
  './js/ui-utils.js',
  './js/ai-ingestion.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignore non-GET and chrome-extension / Firebase live stream requests
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.protocol.startsWith('chrome-extension') || url.hostname.includes('firestore.googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and update in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Offline fallback
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./dashboard.html') || caches.match('./index.html');
        }
      });
    })
  );
});
