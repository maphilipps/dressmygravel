if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, c) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let i = {};
    const d = (e) => a(e, t),
      r = { module: { uri: t }, exports: i, require: d };
    s[t] = Promise.all(n.map((e) => r[e] || d(e))).then((e) => (c(...e), i));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  (self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: 'bcaea51f80113187b3af05ac6dd6f556',
        },
        {
          url: '/_next/static/chunks/703-a3537dfd39b51c50.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/703-a3537dfd39b51c50.js.map',
          revision: '2935948eb69c08c1ab70a515e1b7dde4',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-d7ed2f9819a962e3.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-d7ed2f9819a962e3.js.map',
          revision: 'c245f8badf29271079387afc34856f9a',
        },
        {
          url: '/_next/static/chunks/app/layout-b87759947e281158.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/app/layout-b87759947e281158.js.map',
          revision: '0381ac25c4d06c89c9275703a24c6548',
        },
        {
          url: '/_next/static/chunks/app/page-ccf83d558cba581c.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/fd9d1056-d88d562c442ca48e.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/fd9d1056-d88d562c442ca48e.js.map',
          revision: '6a893f6e76748234ada9bc4033af95f5',
        },
        {
          url: '/_next/static/chunks/framework-62ff339676d87553.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/framework-62ff339676d87553.js.map',
          revision: '9ea49bdb954ef963236f4c685de575d3',
        },
        {
          url: '/_next/static/chunks/main-8f4cb9ebed250ce9.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/main-8f4cb9ebed250ce9.js.map',
          revision: 'fd2ad10fa34df8eee793778d46c69f7d',
        },
        {
          url: '/_next/static/chunks/main-app-b4721adaf77492eb.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/main-app-b4721adaf77492eb.js.map',
          revision: 'e3017d5374e8f509223f0d0c8b8cd4d8',
        },
        {
          url: '/_next/static/chunks/pages/_app-c8aeac2e3aad81ee.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/pages/_app-c8aeac2e3aad81ee.js.map',
          revision: '9f6ad96cfc9793999c8f7c9dc1cb8e04',
        },
        {
          url: '/_next/static/chunks/pages/_error-7d75bff98c4f8336.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/pages/_error-7d75bff98c4f8336.js.map',
          revision: '9204fd2a233b51ad06caf65c3c5ace4b',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-b10e1bf7a5faa37c.js',
          revision: 'g26x4kdBX3Du9qoH4rTdb',
        },
        {
          url: '/_next/static/chunks/webpack-b10e1bf7a5faa37c.js.map',
          revision: '884bafdfc56c08ec543bc6993ea1d078',
        },
        {
          url: '/_next/static/css/3c182b50aa1632d5.css',
          revision: '3c182b50aa1632d5',
        },
        {
          url: '/_next/static/css/3c182b50aa1632d5.css.map',
          revision: 'a8952a0c4f021f7942b728be680edf49',
        },
        {
          url: '/_next/static/g26x4kdBX3Du9qoH4rTdb/_buildManifest.js',
          revision: 'ad75ea99eded4cffb075967f0e5031ba',
        },
        {
          url: '/_next/static/g26x4kdBX3Du9qoH4rTdb/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/19cfc7226ec3afaa-s.woff2',
          revision: '9dda5cfc9a46f256d0e131bb535e46f8',
        },
        {
          url: '/_next/static/media/21350d82a1f187e9-s.woff2',
          revision: '4e2553027f1d60eff32898367dd4d541',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/ba9851c3c22cd980-s.woff2',
          revision: '9e494903d6b0ffec1a1e14d34427d44d',
        },
        {
          url: '/_next/static/media/c5fe6dc8356a8c31-s.woff2',
          revision: '027a89e9ab733a145db70f09b8a18b42',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        { url: '/manifest.json', revision: 'd7bd55f46f58557f047c9f01c8134929' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    ));
});
//# sourceMappingURL=sw.js.map
