export async function subscribeUserToPush() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BO1vBoEBLpJwjm-POO7uZao5YYQkgjQwUSM-Qsbk6wkYoVfaQgLKV02fXAswgF84sjmZvav-hB89e6q_z11e5t8'
    });
    await fetch('https://gr2-3t8u.onrender.com/notification/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  }
}
