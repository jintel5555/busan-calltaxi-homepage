import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";
import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";

const maxSize = 3 * 1024 * 1024;
const bucketName = process.env.SUPABASE_REVIEW_IMAGE_BUCKET || "review-images";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`upload:${ip}`, 10, 10 * 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ error: "Supabase Storage 환경변수를 설정해야 사진 업로드가 가능합니다." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일을 찾을 수 없습니다." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "이미지 파일만 업로드할 수 있습니다." }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json({ error: "이미지는 3MB 이하로 업로드해주세요." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "jpg";
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.storage.from(bucketName).upload(path, bytes, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
