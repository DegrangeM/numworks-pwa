let cacheName = 'numworks-7bbfb555';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './simulator.html',
                './epsilon.js',
                './background.jpg',
                './favicon.ico',
                './favicon.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            if (r) { return r; } // Le fichier est dans le cache, on l'utilise
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            await cache.put(e.request, response.clone()); // On ajoute le fichier au cache
            return response;
        })()
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        const keyList = await caches.keys();
        await Promise.all(keyList.map((key) => {
            if (key === cacheName) { return; }
            await caches.delete(key);
        }))
    })());
});