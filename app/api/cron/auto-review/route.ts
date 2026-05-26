import { NextResponse } from "next/server";
import OpenAI from "openai";
import { sanitizeMultiline, sanitizeText } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

export const runtime = "nodejs";

const destinations = [
  { to: "서울 강남", duration: "약 4시간 40분", tags: ["장거리", "서울", "부산출발"] },
  { to: "경기도 성남", duration: "약 4시간 30분", tags: ["장거리", "경기도", "부산출발"] },
  { to: "강원도 강릉", duration: "약 5시간 20분", tags: ["장거리", "강원도", "부산출발"] },
  { to: "전라도 여수", duration: "약 2시간 40분", tags: ["장거리", "전라도", "부산출발"] },
  { to: "전주 한옥마을", duration: "약 3시간 10분", tags: ["장거리", "전라도", "부산출발"] },
  { to: "대구 수성구", duration: "약 1시간 40분", tags: ["장거리", "대구", "부산출발"] },
  { to: "울산 KTX역", duration: "약 1시간 10분", tags: ["장거리", "울산", "부산출발"] },
  { to: "창원 상남동", duration: "약 1시간 20분", tags: ["장거리", "경남", "부산출발"] }
];

const tourCourses = [
  { to: "해운대, 달맞이길, 청사포", duration: "약 4시간", tags: ["관광", "해운대", "부산관광택시"] },
  { to: "감천문화마을, 송도, 흰여울문화마을", duration: "약 5시간", tags: ["관광", "영도", "부산관광택시"] },
  { to: "광안리, 오륙도, 이기대", duration: "약 4시간 30분", tags: ["관광", "광안리", "부산관광택시"] },
  { to: "기장 해동용궁사, 죽성성당", duration: "약 5시간", tags: ["관광", "기장", "부산관광택시"] },
  { to: "부산역 출발 원도심 야경 코스", duration: "약 3시간 30분", tags: ["관광", "부산역", "부산관광택시"] }
];

const purposes = ["가족 이동", "부모님 동행", "출장 이동", "짐 많은 이동", "새벽 출발", "관광 코스 이동"];
const customerTypes = ["가족 손님", "부모님 모신 손님", "출장 손님", "여행 손님", "공항 이용 손님"];
const situations = [
  "짐이 많아 이동 동선이 걱정되는 상황",
  "새벽 출발이라 시간 맞춤이 중요한 상황",
  "부모님을 모시고 조용하게 이동해야 하는 상황",
  "장거리라 중간 휴식과 차량 컨디션이 중요한 상황",
  "부산 관광 코스를 여유 있게 둘러보는 일정"
];

const authorNicknames = [
  "부산 장거리 이용객",
  "해운대 출발 이용객",
  "부산역 출발 손님",
  "부모님 동행 이용객",
  "새벽 이동 손님",
  "관광택시 이용객",
  "출장 이동 손님",
  "기장 관광 이용객",
  "광안리 출발 손님",
  "가족 이동 이용객"
];

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function createScenario() {
  const isTour = Math.random() < 0.42;
  const route = randomItem(isTour ? tourCourses : destinations);
  return {
    from: randomItem(["부산역", "해운대", "서면", "광안리", "동래", "기장", "남포동", "센텀시티"]),
    to: route.to,
    duration: route.duration,
    purpose: isTour ? "부산 관광택시" : randomItem(purposes),
    customerType: randomItem(customerTypes),
    vehicleType: randomItem(["프리미엄 세단", "넓은 세단", "SUV", "승합 차량"]),
    situation: randomItem(situations),
    tags: [...route.tags, isTour ? "관광" : "장거리", "자동생성"]
  };
}

function localReview(scenario: ReturnType<typeof createScenario>) {
  const templates = [
    `${scenario.from}에서 ${scenario.to}까지 이동했습니다. ${scenario.duration} 정도 걸렸고, 짐이 있어 걱정했는데 차분하게 이동해서 괜찮았습니다.`,
    `${scenario.to} 일정 때문에 예약했는데 출발 시간 맞춰 와주셔서 편했습니다. 장거리였지만 차량이 조용해서 이동 중 쉬기 좋았습니다.`,
    `${scenario.customerType} 일정으로 ${scenario.from}에서 출발했습니다. 중간에 동선도 잘 맞춰주셔서 생각보다 부담 없이 다녀왔습니다.`,
    `${scenario.purpose} 일정으로 이용했습니다. 급하게 잡은 이동이었는데 안내가 깔끔했고 도착 시간도 잘 맞았습니다.`
  ];
  return randomItem(templates);
}

async function generateContent(scenario: ReturnType<typeof createScenario>) {
  if (!process.env.OPENAI_API_KEY) return localReview(scenario);

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_REVIEW_MODEL || "gpt-5-mini";
  const response = await openai.responses.create({
    model,
    input: [
      {
        role: "system",
        content:
          "부산 택시 이용 후기 문장을 짧고 자연스럽게 작성한다. 광고 문구, 과장, 업체 찬양, 해시태그는 쓰지 않는다. 실제 이용 메모처럼 2~3문장으로 쓴다."
      },
      {
        role: "user",
        content: `출발지: ${scenario.from}
도착지/코스: ${scenario.to}
이동시간: ${scenario.duration}
이용목적: ${scenario.purpose}
손님유형: ${scenario.customerType}
차량종류: ${scenario.vehicleType}
상황: ${scenario.situation}`
      }
    ],
    max_output_tokens: 220
  });

  return response.output_text || localReview(scenario);
}

function getSecret(request: Request) {
  return (
    request.headers.get("x-auto-review-secret") ||
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    new URL(request.url).searchParams.get("secret")
  );
}

export async function POST(request: Request) {
  const expectedSecret = process.env.AUTO_REVIEW_SECRET;
  if (!expectedSecret || getSecret(request) !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: lastAutoReview } = await supabase
    .from("reviews")
    .select("created_at")
    .contains("tags", ["자동생성"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const randomGapMinutes = 20 + Math.floor(Math.random() * 11);
  const lastCreatedAt = lastAutoReview?.created_at ? new Date(lastAutoReview.created_at).getTime() : 0;
  const elapsedMinutes = lastCreatedAt ? (Date.now() - lastCreatedAt) / 60_000 : Number.POSITIVE_INFINITY;

  if (elapsedMinutes < randomGapMinutes) {
    return NextResponse.json({
      skipped: true,
      reason: "waiting_for_random_interval",
      elapsedMinutes: Math.floor(elapsedMinutes),
      nextMinimumMinutes: randomGapMinutes
    });
  }

  const scenario = createScenario();
  const content = sanitizeMultiline(await generateContent(scenario), 900);
  const titlePrefix = scenario.tags.includes("관광") ? "부산 관광택시" : "부산 출발 장거리";
  const title = sanitizeText(`${titlePrefix} ${scenario.to} 이동 후기`, 90);
  const tags = Array.from(new Set(scenario.tags)).map((tag) => sanitizeText(tag, 16));
  const author = sanitizeText(randomItem(authorNicknames), 32);

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      title,
      content,
      rating: 5,
      images: [],
      tags,
      author,
      ai_generated: true,
      featured: false,
      hidden: false
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ created: true, review: data });
}
