// Service Worker
self.addEventListener("install", function (event) {
    // console.log("Hello world from the Service Worker 🤙");
});

self.addEventListener("fetch", evt => {
    // console.log("Fetching...")
    // evt.respondWith(
    //     caches.match(evt.request).then(cacheRes => {
    //         return caches.open(dynamicCacheName).then(cache => {
    //             cache.put(evt.request.url, fetchRes.clone());
    //             limitCacheSize(dynamicCacheName, 15);
    //             return fetchRes
    //         })
    //     }).catch(() => {
    //         if (evt.request.url.indexOf('.html' > -1)) {
    //             return caches.match('/pages/fallback.html');
    //         }
    //     })
    // )
})