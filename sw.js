const cacheName = 'rotofer-cache-v1'; // Nome do cache
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

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assetsToCache); // Adiciona todos os assets ao cache
        })
    );
});

// Evento para interceptar as requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request); // Retorna resposta do cache ou faz a requisição
        })
    );
});
