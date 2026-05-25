import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#070707",
    theme_color: "#070707",
    lang: "ko-KR",
    categories: ["travel", "business", "navigation"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ],
    shortcuts: [
      {
        name: "전화문의",
        short_name: "전화",
        url: "/reservation",
        icons: [{ src: "/icon.svg", sizes: "any" }]
      },
      {
        name: "후기 작성",
        short_name: "후기",
        url: "/reviews",
        icons: [{ src: "/icon.svg", sizes: "any" }]
      }
    ]
  };
}
