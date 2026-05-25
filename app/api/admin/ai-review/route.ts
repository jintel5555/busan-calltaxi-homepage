import { NextResponse } from "next/server";
import OpenAI from "openai";
import { isAdminRequest } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { aiReviewPayloadSchema } from "@/lib/schemas";
import { getClientIp, sanitizeMultiline, sanitizeText } from "@/lib/security";

function localFallbackReview(data: Record<string, string>) {
  return `${data.from}에서 ${data.to}까지 이동했습니다. ${data.duration} 정도 걸렸고, ${data.situation}이라 조금 걱정했는데 시간 맞춰 와주셔서 편하게 갔습니다. 차량도 조용했고 짐도 도와주셔서 괜찮았습니다.`;
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`ai:${ip}`, 8, 10 * 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "AI 생성 요청이 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = aiReviewPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해주세요." }, { status: 400 });
  }

  const data = Object.fromEntries(
    Object.entries(parsed.data).map(([key, value]) => [key, sanitizeText(value, 240)])
  ) as Record<string, string>;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      provider: "local-fallback",
      content: sanitizeMultiline(localFallbackReview(data), 800)
    });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_REVIEW_MODEL || "gpt-5-mini";

  const response = await openai.responses.create({
    model,
    input: [
      {
        role: "system",
        content:
          "너는 부산 택시 후기 초안을 쓰는 한국어 카피라이터다. 광고처럼 쓰지 말고, 실제 손님이 짧게 남긴 후기처럼 자연스럽고 담백하게 작성한다. 과장, 이모지, 해시태그, 업체 칭찬 남발은 금지한다."
      },
      {
        role: "user",
        content: `출발지: ${data.from}
도착지: ${data.to}
이동시간: ${data.duration}
이용 목적: ${data.purpose}
손님 유형: ${data.customerType}
차량 종류: ${data.vehicleType}
이동 상황: ${data.situation}

조건:
- 2~4문장
- 실제 후기 느낌
- 너무 AI스럽지 않게
- 부산 지역 느낌은 자연스럽게만
- 광고 문구 금지`
      }
    ],
    max_output_tokens: 260
  });

  const content = sanitizeMultiline(response.output_text || localFallbackReview(data), 900);
  return NextResponse.json({ provider: "openai", model, content });
}
