importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
	console.log('Workbox berhasil dimuat');
} else {
	console.log('Workbox gagal dimuat');
}
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute([
	{ url: '/', revision: '1' },
	{ url: '/img/ball.png', revision: '1' },
	{ url: '/img/48x48.png', revision: '1' },
	{ url: '/img/72x72.png', revision: '1' },
	{ url: '/img/96x96.png', revision: '1' },
	{ url: '/img/144x144.png', revision: '1' },
	{ url: '/img/148x148.png', revision: '1' },
	{ url: '/img/512x512.png', revision: '1' },
	{ url: '/img/loading.gif', revision: '1' },
	{ url: '/index.html', revision: '1' },
	{ url: '/nav.html', revision: '1' },
	{ url: '/css/materialize.min.css', revision: '1' },
	{ url: '/js/materialize.min.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/api.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/dbcrud.js', revision: '1' },
	{ url: '/service-worker.js', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
]);

workbox.routing.registerRoute(
	new RegExp('^https://api.football-data.org/v2/.*'),
	workbox.strategies.cacheFirst({
		plugins: [
			new workbox.cacheableResponse.Plugin({
				statuses: [0, 200]
			}),
		],
	})
);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.cacheFirst( {
		cacheName: 'images',
		plugins: [
			new workbox.cacheableResponse.Plugin( {
				statuses: [0, 200],
			}),
			new workbox.expiration.Plugin( {
				maxAgeSeconds: 60 * 60 * 24 * 365,
				maxEntries: 100,
			}),
		],
	})
);

self.addEventListener('push', function(event) {
	var body;
  	if (event.data) {
	    body = event.data.text();
  	} else {
    	body = 'Push message';
  	}
  	var options = {
	    body: body,
	    icon: 'img/ball.png',
	    vibrate: [100, 50, 100],
	    data: {
      		dateOfArrival: Date.now(),
      		primaryKey: 1
    	}
  	};
  	event.waitUntil(
	    self.registration.showNotification('Push Notification', options)
  	);
});