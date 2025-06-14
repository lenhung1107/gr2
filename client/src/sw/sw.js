self.addEventListener('push', function (event) {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || '/pwa-192x192.png',
  });
});

// ⚠️ Dòng này là bắt buộc để workbox inject manifest
self.__WB_MANIFEST;
