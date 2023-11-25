// Importar la CDN de workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Verificamos si la variable workbox está definida y disponible
if (workbox) {
  console.log("workbox está cargado");
  workbox.precaching.precacheAndRoute([]);

  // Cache de imágenes en la carpeta public/img
  workbox.routing.registerRoute(
    /.*\/img\/(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60
        })
      ]
    })
  );

  // Caché de archivos JS, CSS y otros
  workbox.routing.registerRoute(
    /\.(?:css|js|scss)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets",
    })
  );

  // Caché de fuentes de Google
  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts",
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // Agregar análisis offline
  workbox.googleAnalytics.initialize();

  // Instalar un nuevo service worker
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
} else {
  console.log("Workbox falló");
}
