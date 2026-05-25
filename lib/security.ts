const textControlPattern = /[\u0000-\u001f\u007f]/g;

export function sanitizeText(value: unknown, maxLength = 1200) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(textControlPattern, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMultiline(value: unknown, maxLength = 3000) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(textControlPattern, " ")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

export function sanitizeImageUrls(urls: unknown) {
  if (!Array.isArray(urls)) return [];

  return urls
    .map((url) => sanitizeText(url, 600))
    .filter((url) => {
      if (!url) return false;
      if (url.startsWith("/")) return true;
      try {
        const parsed = new URL(url);
        return parsed.protocol === "https:";
      } catch {
        return false;
      }
    })
    .slice(0, 5);
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
