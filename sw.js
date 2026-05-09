self.addEventListener('install', e=>{
 e.waitUntil(
  caches.open('stormprobe-v1').then(cache=>{
   return cache.addAll(['./','./index.html']);
  })
 );
});
