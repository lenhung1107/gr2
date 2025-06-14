export async function subscribeUserToPush() {
  if (!('serviceWorker' in navigator)) {
    console.warn("❌ Trình duyệt không hỗ trợ Service Worker");
    return;
  }

  if (!('PushManager' in window)) {
    console.warn("❌ Trình duyệt không hỗ trợ Push Notification");
    return;
  }

  try {
    console.log("ℹ️ Đang đợi Service Worker sẵn sàng...");
    const registration = await navigator.serviceWorker.ready;
    console.log("✅ Service Worker đã sẵn sàng:", registration);

    console.log("ℹ️ Đang đăng ký PushManager...");
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BO1vBoEBLpJwjm-POO7uZao5YYQkgjQwUSM-Qsbk6wkYoVfaQgLKV02fXAswgF84sjmZvav-hB89e6q_z11e5t8'
    });
    console.log("✅ Đã đăng ký push subscription:", subscription);

    // 🔍 Lấy userId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      console.warn("❌ Không tìm thấy userId trong localStorage");
      return;
    }

    console.log("ℹ️ Gửi subscription lên server với userId:", userId);
    const res = await fetch('https://gr2-3t8u.onrender.com/notification/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        userId,         // 👈 Gửi userId lên server
        subscription,   // 👈 Kèm theo subscription
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (res.ok) {
      console.log("✅ Subscription đã được gửi lên server thành công!");
    } else {
      console.error("❌ Lỗi khi gửi subscription lên server:", res.statusText);
    }
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký push notification:", error);
  }
}
