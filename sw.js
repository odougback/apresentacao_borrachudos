const CACHE_NAME = 'borrachudos-v1';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './favicon.svg',
  './icon-maskable.svg',
  './img/01-capa.png',
  './img/02-ciclo-vida.png',
  './img/03-criadouros.png',
  './img/04-por-que-controlar.png',
  './img/05-metodos-controle.png',
  './img/06-bti.png',
  './img/07-modo-acao-bti.png',
  './img/08-dose-bti.png',
  './img/09-calibragem-regador.png',
  './img/10-aplicacao.png',
  './img/11-fatores-variaveis.png',
  './img/12-carreamento.png',
  './img/13-analise-comparativa-2.png',
  './img/14-analise-comparativa-4.png',
  './img/15-consideracoes.png',
  './img/16-obrigado.png'
];

// Install: pre-cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first with network fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
