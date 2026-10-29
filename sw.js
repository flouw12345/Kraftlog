// Kraftlog Service Worker: App-Dateien offline verfügbar halten
const CACHE = "kraftlog-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Seite selbst: erst Netz (für Updates), sonst Cache
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Rest (Icons, Schriften): erst Cache, sonst Netz und merken
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === "opaque") { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return res;
  })));
});
