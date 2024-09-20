const cacheName = 'rotofer-cache-v1';
const assetsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/dados.csv',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
