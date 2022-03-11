const build = [
  "/_app/start-8c4c54c9.js",
  "/_app/pages/__layout.svelte-87daf692.js",
  "/_app/assets/pages/__layout.svelte-d83bf574.css",
  "/_app/error.svelte-4fd8876b.js",
  "/_app/pages/index.svelte-8672bac8.js",
  "/_app/assets/pages/index.svelte-60ecf76e.css",
  "/_app/chunks/vendor-7ebf796c.js"
];
const files = [
  "/favicon.png",
  "/icons/moon.svg",
  "/icons/pause.svg",
  "/icons/play.svg",
  "/icons/reset.svg",
  "/icons/search.svg",
  "/icons/sun.svg",
  "/logo-192.png",
  "/logo-512.png",
  "/manifest.json",
  "/mobile.png",
  "/robots.txt"
];
const timestamp = Date.now();
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
