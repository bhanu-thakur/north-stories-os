/* North Stories OS — service worker (v2 · NETWORK-FIRST)
   Network-first so new deploys appear immediately; cache is only an
   offline fallback. Navigations fall back to the cached app shell. */
var CACHE = "nsos-v2.1";
var SHELL = [
  "./", "./index.html", "./app.js", "./data.core.js", "./data.bibles.js",
  "./data.skills.js", "./data.curriculum.js", "./data.cd.js",
  "./data.locations.js", "./data.sops.js", "./manifest.webmanifest"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
        var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) {
        return hit || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined);
      });
    })
  );
});
