// オフライン用: 開けたときに最新を取りに行き、つながらないときは端末に保存した版を使います
var V='55eda63f5664';var FILES=['./','index.html','app.enc.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES.map(function(u){return new Request(u,{cache:'reload'})}))}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(new Promise(function(res){var done=false;
  function fb(){caches.match(r,{ignoreSearch:true}).then(function(x){if(!done&&x){done=true;res(x)}})}
  var t=setTimeout(fb,2500);
  fetch(new Request(r,{cache:'no-cache'})).then(function(n){clearTimeout(t);if(n&&n.ok){var cp=n.clone();caches.open(V).then(function(c){c.put(r,cp)})}if(!done){done=true;res(n)}}).catch(function(){clearTimeout(t);caches.match(r,{ignoreSearch:true}).then(function(x){if(!done){done=true;res(x||Response.error())}})});
 }))});
