# 장거리전문부산콜택시 프로젝트 인수인계

이 문서는 다른 컴퓨터나 새 채팅에서 바로 이어서 작업하기 위한 프로젝트 요약입니다.

## 프로젝트

- 브랜드명: 장거리전문부산콜택시
- 대표 전화: 0507-1333-7114
- GitHub: https://github.com/jintel5555/busan-calltaxi-homepage
- 운영 사이트: https://busan-calltaxi-homepage.vercel.app
- Vercel 프로젝트: busan-calltaxi-homepage
- Supabase 프로젝트: busan-calltaxi-homepage
- Supabase URL: https://xxkasflzitbtmjpxmjco.supabase.co

## 기술 스택

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui 스타일 컴포넌트
- Supabase
- OpenAI API 연동 준비
- PWA
- Vercel 배포

## 현재 완료된 작업

- 모바일 최적화 홈페이지 제작
- 후기 게시판 제작
- 후기 상세 페이지 제작
- 관리자 페이지 제작
- FAQ 관리자 페이지 제작
- Supabase DB 연결
- Vercel 배포
- 관리자 아이디/비밀번호 로그인 방식 적용
- 메인 홈페이지 상단 관리자 모드 진입 버튼 추가
- GitHub push 시 Vercel 자동 배포 연결

## 주요 주소

- 메인: https://busan-calltaxi-homepage.vercel.app
- 관리자: https://busan-calltaxi-homepage.vercel.app/admin
- FAQ 관리: https://busan-calltaxi-homepage.vercel.app/admin/faqs
- 후기 게시판: https://busan-calltaxi-homepage.vercel.app/reviews
- FAQ 공개 페이지: https://busan-calltaxi-homepage.vercel.app/faq

## 다른 컴퓨터에서 시작하기

```bash
git clone https://github.com/jintel5555/busan-calltaxi-homepage.git
cd busan-calltaxi-homepage
npm install
npm run dev
```

로컬 주소:

```text
http://localhost:3000
```

## 수정 후 온라인 반영

```bash
git add .
git commit -m "수정 내용"
git push origin main
```

`main` 브랜치에 push하면 Vercel이 자동으로 운영 사이트를 다시 배포합니다.

## 환경변수

운영 환경변수는 Vercel에 등록되어 있습니다. 보안상 GitHub에는 실제 키를 올리지 않습니다.

필요한 변수 목록은 `env.example`을 기준으로 합니다.

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_REVIEW_IMAGE_BUCKET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SECRET=
OPENAI_API_KEY=
OPENAI_REVIEW_MODEL=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=
```

## 새 채팅에서 Codex에게 말할 내용

다른 컴퓨터나 새 채팅에서는 아래 문장을 그대로 말하면 됩니다.

```text
GitHub 저장소 https://github.com/jintel5555/busan-calltaxi-homepage 를 기준으로
장거리전문부산콜택시 프로젝트를 이어서 작업해줘.
PROJECT_CONTEXT.md를 먼저 읽고 현재 상태를 파악해줘.
```

## 주의사항

- 비밀번호, Supabase service role key, OpenAI API key는 GitHub에 올리지 않습니다.
- `morna7` 등 다른 프로젝트와 섞이지 않게 저장소 위치와 Git remote를 확인하고 작업합니다.
- 운영 DB 구조는 `supabase/schema.sql`에 있습니다.
- 관리자 로그인 API는 `app/api/admin/login/route.ts`에 있습니다.
- 관리자 화면 인증 UI는 `components/admin/admin-login-card.tsx`에 있습니다.
