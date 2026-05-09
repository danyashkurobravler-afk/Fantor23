// Storm Probe service worker — offline support
const CACHE = "storm-probe-v1";
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(cache=>
    cache.addAll([
      './',
      'index.html',
      'main.js',
      'style.css',
      'manifest.json'
    ])));
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(resp=>resp||fetch(e.request))
  );
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )));
});
