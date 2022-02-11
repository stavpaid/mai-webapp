self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('my-tables').then(function(cache) {
            return cache.addAll([
                '/my_tables.html',
                '/favicon.ico',
                '/assets/stylesheets/main.css',
                '/manifest.json',
                '/assets/images/icons/icon.svg',
                '/assets/images/icons/apple-touch-icon.png',
                '/assets/images/icons/16.png',
                '/assets/images/icons/32.png',
                '/assets/images/icons/192.png',
                '/assets/images/icons/512.png',
                '/assets/images/SVG/copy.css',
                '/assets/images/SVG/trash.css',
                '/assets/images/SVG/github.css',
                '/assets/images/SVG/linkedin-with-circle.css',
                '/assets/images/SVG/mail4.css',
                '/uomTrack.js',
                '/myTables.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/my_tables.html');
        })
    );
});
