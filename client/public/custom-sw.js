self.addEventListener('push', function (event) {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || '/pwa-192x192.png',
  });
});
self.__WB_MANIFEST;