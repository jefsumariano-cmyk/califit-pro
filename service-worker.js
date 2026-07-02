const PWA_RELEASE = '67C';
const CACHE_NAME = `califit-pro-${PWA_RELEASE.toLowerCase()}`;
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key.startsWith('califit-pro-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

async function respostaNavegacao(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const resp = await fetch(req);
    if (resp && resp.ok) cache.put('./index.html', resp.clone());
    return resp;
  } catch (e) {
    return (await cache.match('./index.html')) || (await cache.match('./'));
  }
}

async function respostaAsset(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  const rede = fetch(req).then(resp => {
    if (resp && resp.ok) cache.put(req, resp.clone());
    return resp;
  }).catch(() => cached);
  return cached || rede;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const aceitaHtml = req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html');
  event.respondWith(aceitaHtml ? respostaNavegacao(req) : respostaAsset(req));
});
