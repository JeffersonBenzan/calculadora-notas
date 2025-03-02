const CACHE_NAME = "calculadora-cache-v1";
const urlsToCache = [
  "/calculadora-notas/",
  "/calculadora-notas/index.html",
  "/calculadora-notas/manifest.json",
  "/calculadora-notas/icon-192.png",
  "/calculadora-notas/icon-512.png",
  "/calculadora-notas/favicon.ico"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
