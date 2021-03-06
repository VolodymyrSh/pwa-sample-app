var cacheName = 'problemReporter';
var dataCacheName = 'problemReporterData';
var filesToCache = [
    'manifest.json',
    'favicon.ico',
    'styles/style.css',
    'images/icons/icon-16x16.png',
    'images/icons/icon-32x32.png',
    'images/icons/icon-48x48.png',
    'images/icons/icon-64x64.png',
    'images/icons/icon-144x144.png',
    'images/icons/icon-256x256.png',
    'images/Logo.png',
    'images/LoginBackground.jpg',
    'pages/offline.html',
    'pages/404.html'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching offline files');
            return cache.addAll(filesToCache);
        })
    );
});

// When Service Worker is activated, update the cache by changing name
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    // Speeds up service worker activation to prevent getting old data from cache
    return self.clients.claim();
});

// Fetching from the cache
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.debug('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.debug('Network request for ', event.request.url);
                return fetch(event.request)
                    .then(response => {
                        if (response.status === 404) {
                            return caches.match('pages/404.html');
                        } else {
                            return response;
                        }
                    });
            }).catch(error => {
                console.error('Error, ', error);
                return caches.match('pages/offline.html');
            })
    );
});