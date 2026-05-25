# 장거리전문부산콜택시

부산 장거리택시 후기 플랫폼 + 예약형 모바일 홈페이지입니다. Next.js App Router, TypeScript, TailwindCSS, shadcn/ui 스타일 컴포넌트, Supabase, OpenAI API, PWA, SEO/AEO/GEO 구조를 포함합니다.

## 주요 기능

- 모바일 앱처럼 쓰는 하단 고정 전화/문자/카카오톡/네이버 톡톡 CTA
- 메인홈, 실시간 문의, 후기 게시판, 후기 상세, 관광코스, 기사 소개, 예약문의, 김해공항 픽업, 부산 관광택시, 장거리택시 페이지
- 손님 후기 작성, 사진 업로드, 별점, 댓글, 좋아요, 조회수, 검색, 최신순/인기순, 태그 필터
- 관리자 페이지: AI 후기 생성, 수정 후 승인 등록, 베스트 지정, 숨김, 삭제, 공지 등록
- LocalBusiness, FAQ, Review schema, OpenGraph, sitemap.xml, robots.txt
- PWA 설치 지원과 다크모드

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 어디서든 온라인 작업

이 저장소는 GitHub를 기준으로 작업하면 어느 컴퓨터에서도 이어서 수정할 수 있습니다.

1. GitHub 저장소 `https://github.com/jintel5555/busan-calltaxi-homepage`에 접속합니다.
2. `Code` 버튼에서 `Codespaces`를 선택하고 새 codespace를 엽니다.
3. 브라우저 안의 VS Code 터미널에서 `npm run dev`를 실행합니다.
4. 포트 `3000` 미리보기를 열어 수정 내용을 확인합니다.
5. 변경사항을 commit 후 `main` 브랜치에 push하면 Vercel이 운영 사이트를 자동 배포합니다.

`.devcontainer/devcontainer.json`은 Codespaces가 열릴 때 Node.js 개발환경을 만들고 `npm ci`를 실행하도록 설정합니다. `.github/workflows/validate.yml`은 push와 pull request 때 `lint`와 `build`를 자동 검증합니다.

## 환경변수

`env.example`을 참고해 `.env.local`을 만듭니다.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_REVIEW_IMAGE_BUCKET=review-images
ADMIN_USERNAME=admin
ADMIN_PASSWORD=긴_관리자_비밀번호
ADMIN_SECRET=긴_랜덤_서명_문자열
OPENAI_API_KEY=...
OPENAI_REVIEW_MODEL=gpt-5-mini
```

OpenAI 모델은 비용과 품질 균형을 위해 `gpt-5-mini`를 기본값으로 두었고, 필요하면 `OPENAI_REVIEW_MODEL`로 바꿀 수 있습니다.

## Supabase 설정

1. Supabase 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase/schema.sql` 전체를 실행합니다.
3. Project Settings → API에서 URL, anon key, service role key를 복사해 `.env.local`과 Vercel 환경변수에 넣습니다.
4. Storage에 `review-images` 버킷이 생성되었는지 확인합니다.
5. 관리자 계정을 Supabase Auth에서 만든 뒤, SQL Editor에서 아래처럼 role을 지정합니다.

```sql
insert into public.users (id, nickname, role)
values ('AUTH_USER_UUID', '관리자', 'admin')
on conflict (id) do update set role = 'admin';
```

운영에서는 `SUPABASE_SERVICE_ROLE_KEY`가 서버에서만 사용되도록 Vercel 환경변수에만 저장하세요.

## 관리자 페이지

`/admin`에서 `ADMIN_USERNAME`과 `ADMIN_PASSWORD`로 로그인하면 관리자 API를 사용할 수 있습니다. `ADMIN_SECRET`은 발급된 관리자 세션 토큰 서명에 사용되며, 기존 호환을 위해 `ADMIN_PASSWORD`가 없을 때만 비밀번호 대체값으로 사용됩니다. Supabase Auth 기반 권한 분리도 포함되어 있어, Bearer 토큰이 있는 경우 `users.role = 'admin'` 계정을 관리자 요청으로 처리합니다.

FAQ는 `/admin/faqs`에서 추가, 수정, 숨김, 삭제할 수 있습니다. 공개 FAQ 페이지는 `/faq`입니다.

AI 후기 생성은 다음 입력값을 사용합니다.

- 출발지
- 도착지
- 이동시간
- 이용 목적
- 손님 유형
- 차량 종류
- 이동 상황

생성된 후기는 바로 등록되지 않고, 관리자 화면에서 수정한 뒤 승인 등록합니다.

## Vercel 배포

1. GitHub 저장소에 프로젝트를 올립니다.
2. Vercel에서 New Project로 가져옵니다.
3. Framework Preset은 Next.js로 둡니다.
4. Environment Variables에 `.env.local`과 같은 값을 등록합니다.
5. Deploy를 누릅니다.
6. 배포 URL을 `NEXT_PUBLIC_SITE_URL`에 다시 넣고 재배포하면 canonical, sitemap, OpenGraph URL이 정확해집니다.

`main` 브랜치에 push하면 Vercel이 자동으로 운영 사이트를 다시 배포합니다.

## SEO/AEO/GEO 체크

- `/sitemap.xml` 자동 생성
- `/robots.txt` 자동 생성
- 후기 상세페이지별 title, description, OpenGraph, Review schema 자동 생성
- 메인 LocalBusiness schema와 FAQ 페이지 schema 포함
- 부산장거리택시, 김해공항택시, 부산관광택시, 부산공항픽업, 부산VIP택시, 부산기사포함렌트, 부산택시투어 키워드 반영
- 네이버 사이트 소유확인은 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 값을 넣으면 됩니다.

## 이미지 출처

히어로 배경은 Wikimedia Commons의 “Gwangan Bridge at Night, Busan” 이미지를 사용합니다. 저작자 Ken Eckert, 라이선스 CC BY-SA 4.0입니다.

## 운영 전 교체할 것

- Footer의 사업자 정보
- 실제 요금 안내 정책
- 개인정보 처리방침/이용약관 페이지
- 네이버/구글 서치콘솔 인증값
- Supabase 관리자 계정, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
