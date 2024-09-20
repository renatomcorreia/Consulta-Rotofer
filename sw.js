// Nome do cache para armazenar os recursos
const cacheName = 'rotofer-cache-v1'; 

// Lista de recursos a serem armazenados em cache
const assetsToCache = [
    '/', // Página inicial
    '/index.html', // HTML principal
    '/styles.css', // Folha de estilos
    '/app.js', // Script da aplicação
    '/dados.csv', // Arquivo CSV com os dados
    '/manifest.json', // Manifesto da PWA
    '/images/icon-192x192.png', // Ícone de 192x192 pixels
    '/images/icon-512x512.png' // Ícone de 512x512 pixels
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    // Aguarda a instalação completar antes de continuar
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            // Adiciona todos os recursos à lista de cache
            return cache.addAll(assetsToCache); 
        })
    );
});

// Evento para interceptar as requisições feitas pela aplicação
self.addEventListener('fetch', event => {
    // Tenta responder com um recurso do cache
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Retorna a resposta do cache se existir, ou faz a requisição pela rede
            return cachedResponse || fetch(event.request); 
        })
    );
});
