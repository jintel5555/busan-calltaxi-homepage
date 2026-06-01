import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = "장거리전문부산콜택시 대표 이미지";
export const size = {
  width: 1200,
  height: 630
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
            "linear-gradient(135deg, #050505 0%, #10100f 40%, #16110a 66%, #050505 100%)",
          color: "#fff6e3",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 78% 18%, rgba(244,199,77,0.35), transparent 24%), radial-gradient(circle at 18% 82%, rgba(32,215,197,0.2), transparent 28%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 180,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(244,199,77,0.15) 48%, rgba(244,199,77,0.34) 100%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 78,
            bottom: 76,
            width: 390,
            height: 158,
            borderRadius: 44,
            background: "linear-gradient(135deg, #111 0%, #2c2a25 55%, #080808 100%)",
            border: "5px solid rgba(244,199,77,0.8)",
            boxShadow: "0 28px 80px rgba(0,0,0,0.55)",
            display: "flex"
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 74,
              top: -58,
              width: 230,
              height: 92,
              borderRadius: "100px 100px 18px 18px",
              background: "linear-gradient(135deg, #1b1b1b, #3a3528)",
              border: "5px solid rgba(244,199,77,0.72)"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 48,
              bottom: -27,
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#050505",
              border: "12px solid #f4c74d"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 48,
              bottom: -27,
              width: 72,
              height: 72,
              borderRadius: 999,
              background: "#050505",
              border: "12px solid #f4c74d"
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 36,
              top: 56,
              width: 64,
              height: 28,
              borderRadius: 16,
              background: "#fff1b8"
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 36,
              top: 56,
              width: 64,
              height: 28,
              borderRadius: 16,
              background: "#fff1b8"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 70,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            width: 710
          }}
        >
          <div
            style={{
              display: "flex",
              width: "fit-content",
              padding: "12px 22px",
              borderRadius: 999,
              background: "#f4c74d",
              color: "#171306",
              fontSize: 28,
              fontWeight: 900
            }}
          >
            부산 장거리 · 김해공항 · 부산관광 전문
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8
            }}
          >
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.03,
                letterSpacing: -2,
                fontWeight: 900
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.35,
                color: "#ddd4c1",
                fontWeight: 700
              }}
            >
              공항 픽업부터 장거리 이동, 부산 관광택시까지 한 번에 예약 상담
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 8
            }}
          >
            {["24시간 상담", "새벽 공항콜", "프리미엄 기사 서비스"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "13px 18px",
                  borderRadius: 16,
                  border: "2px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.08)",
                  fontSize: 26,
                  fontWeight: 800
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 62,
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#f4c74d",
            fontSize: 42,
            fontWeight: 900
          }}
        >
          <span>{siteConfig.phoneDisplay}</span>
          <span style={{ color: "#20d7c5", fontSize: 28 }}>카카오톡 · 네이버 톡톡 상담</span>
        </div>
      </div>
    ),
    size
  );
}
