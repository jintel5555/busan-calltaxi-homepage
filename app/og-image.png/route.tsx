import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = "장거리전문부산콜택시 대표 이미지";
export const size = {
  width: 800,
  height: 800
};
export const contentType = "image/png";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, #050505 0%, #10100f 48%, #17120a 100%)",
          color: "#fff6e3",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 18%, rgba(244,199,77,0.32), transparent 30%), radial-gradient(circle at 50% 88%, rgba(32,215,197,0.18), transparent 34%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 38,
            borderRadius: 56,
            border: "4px solid rgba(244,199,77,0.42)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 225,
            top: 92,
            width: 350,
            height: 350,
            borderRadius: 999,
            background: "linear-gradient(145deg, #f4c74d 0%, #ffdf75 52%, #9b7420 100%)",
            boxShadow: "0 34px 100px rgba(244,199,77,0.22)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 18,
              borderRadius: 999,
              background: "#090909"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 80,
              top: 151,
              width: 190,
              height: 78,
              borderRadius: 28,
              background: "#f4c74d",
              display: "flex"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 121,
              top: 106,
              width: 108,
              height: 70,
              borderRadius: "70px 70px 16px 16px",
              background: "#f4c74d"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 105,
              top: 210,
              width: 42,
              height: 42,
              borderRadius: 999,
              background: "#090909",
              border: "10px solid #fff6e3"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 205,
              top: 210,
              width: 42,
              height: 42,
              borderRadius: 999,
              background: "#090909",
              border: "10px solid #fff6e3"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 97,
              top: 166,
              width: 56,
              height: 24,
              borderRadius: 12,
              background: "#fff6e3"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 97,
              top: 166,
              width: 56,
              height: 24,
              borderRadius: 12,
              background: "#fff6e3"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            top: 472,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: 999,
              background: "#f4c74d",
              color: "#171306",
              fontSize: 24,
              fontWeight: 900
            }}
          >
            부산 장거리 · 공항 · 관광 전문
          </div>
          <div
            style={{
              fontSize: 48,
              lineHeight: 1.12,
              fontWeight: 900
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#ddd4c1",
              fontWeight: 800
            }}
          >
            김해공항 픽업 · 부산관광택시 · 장거리 이동
          </div>
          <div
            style={{
              marginTop: 8,
              color: "#f4c74d",
              fontSize: 38,
              fontWeight: 900
            }}
          >
            {siteConfig.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size
  );
}
