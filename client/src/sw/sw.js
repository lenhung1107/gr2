import { precacheAndRoute } from "workbox-precaching";

// Đây là nơi Workbox inject manifest
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", function (event) {
  console.log("[SW] Push event received");

  let data = {};
  try {
    data = event.data?.json();
  } catch (e) {
    console.warn("[SW] Push data không phải JSON:", e);
    data = {
      title: "Thông báo",
      body: event.data?.text() || "Bạn có một thông báo mới",
    };
  }

  const title = data.title || "Thông báo";
  const options = {
    body: data.body || "Bạn có một thông báo mới!",
    icon: data.icon || "/pwa-192x192.png",
    badge: "/pwa-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
