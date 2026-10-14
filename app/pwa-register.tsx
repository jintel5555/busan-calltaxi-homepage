"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV !== "production") {
      async function clearDevelopmentWorker() {
        const registrations = await navigator.serviceWorker.getRegistrations();
        const own = registrations.filter((registration) =>
          [registration.active, registration.waiting, registration.installing].some((worker) => worker?.scriptURL === `${location.origin}/sw.js`)
        );
        if (!own.length) return;
        await Promise.all(own.map((registration) => registration.unregister()));
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.filter((key) => key.startsWith("busan-calltaxi-")).map((key) => caches.delete(key)));
        }
        location.reload();
      }
      clearDevelopmentWorker().catch(() => undefined);
      return;
    }
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((registration) => registration.update())
        .catch(() => undefined);
    }
  }, []);

  return null;
}
