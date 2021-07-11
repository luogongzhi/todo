const staticAssets = [
    '/',
]

//登记后，就会触发install事件。service worker 脚本需要监听这个事件。
self.addEventListener('install', async event => {
    const cache = await caches.open('static-assets');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    }

});


async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req){
    const cache = await caches.open('dynamic-content');
    try{
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    }catch(err){
        const cachedResponse = await cache.match(req);
        return cachedResponse || caches.match('./fallback.json');
    }
}