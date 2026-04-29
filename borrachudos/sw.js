const CACHE_NAME = 'borrachudos-v4';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './img/favicon.png',
  './img/01-capa.webp',
  './img/02-ciclo-vida.webp',
  './img/03-criadouros.webp',
  './img/04-por-que-controlar.webp',
  './img/05-metodos-controle.webp',
  './img/06-bti.webp',
  './img/07-modo-acao-bti.webp',
  './img/08-dose-bti.webp',
  './img/09-calibragem-regador.webp',
  './img/10-aplicacao.webp',
  './img/11-fatores-variaveis.webp',
  './img/12-carreamento.webp',
  './img/13-analise-comparativa-2.webp',
  './img/14-analise-comparativa-4.webp',
  './img/15-consideracoes.webp',
  './img/16-obrigado.webp'
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
