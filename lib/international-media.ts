import type { InternationalLocale } from "@/lib/international";

export const internationalPhotos = [
  { src: "/busan-coast.webp", author: "Masterhatch", source: "https://commons.wikimedia.org/wiki/File:Gwangalli_Beach_and_Gwangan_Bridge_Busan.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { src: "/busan-gamcheon.webp", author: "Christophe95", source: "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_the_Gamcheon_Culture_Village.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { src: "/busan-night-view.webp", author: "lumoplank", source: "https://commons.wikimedia.org/wiki/File:Gwangan_Bridge_and_Gwangalli_Beach_-_Gwangalli2721.jpg", license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" }
];

export const internationalDesignCopy: Record<InternationalLocale, { location: string; photoCredits: string; photoAlts: string[] }> = {
  en: { location: "Gwangalli Beach, Busan", photoCredits: "Photo credits · resized / WebP", photoAlts: ["Gwangalli Beach and Gwangan Bridge in Busan", "Colorful houses of Gamcheon Culture Village in Busan", "Gwangan Bridge illuminated at night, viewed from Gwangalli Beach"] },
  "zh-tw": { location: "釜山 · 廣安里海水浴場", photoCredits: "圖片來源 · 已縮圖及轉為 WebP", photoAlts: ["釜山廣安里海水浴場與廣安大橋", "釜山甘川文化村的彩色房屋", "從廣安里海水浴場欣賞廣安大橋夜景"] },
  ja: { location: "釜山 · 広安里ビーチ", photoCredits: "写真クレジット · 縮小・WebP変換", photoAlts: ["釜山の広安里ビーチと広安大橋", "釜山の甘川文化村のカラフルな家々", "広安里ビーチから望む広安大橋の夜景"] }
};
