
const CACHE='obscyra-v3';
const PRECACHE=[
  'index.html',
  'manifest.json',
  'offline/offline.html',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/sigils/tri.svg',
  'assets/sigils/part.svg',
  'assets/sigils/wreath.svg'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)));
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request)
      .then(r=>r || fetch(e.request))
      .catch(()=>caches.match('offline/offline.html'))
  );
});
