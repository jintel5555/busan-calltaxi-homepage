# 장거리전문부산콜택시

부산 장거리택시 후기 플랫폼 + 예약형 모바일 홈페이지입니다. Next.js App Router, TypeScript, TailwindCSS, shadcn/ui 스타일 컴포넌트, Supabase, OpenAI API, PWA, SEO/AEO/GEO 구조를 포함합니다.

## 주요 기능

- 모바일 앱처럼 쓰는 하단 고정 전화/문자/카카오톡/네이버 톡톡 CTA
- 메인홈, 실시간 문의, 후기 게시판, 후기 상세, 관광코스, 기사 소개, 예약문의, 김해공항 픽업, 부산 관광택시, 장거리택시 페이지
- 손님 후기 작성, 사진 업로드, 별점, 댓글, 좋아요, 조회수, 검색, 최신순/인기순, 태그 필터
- 관리자 페이지: AI 후기 생성, 수정 후 승인 등록, 베스트 지정, 숨김, 삭제, 공지 등록
- LocalBusiness, FAQ, Review schema, OpenGraph, sitemap.xml, robots.txt
- PWA 설치 지원과 다크모드

## 다국어 관광·공항 접송 페이지

홈 주소 `/`에 접속할 때마다 첫 화면에 한국어, 대만 번체 중국어, 일본어, 영어 선택 영역이 표시됩니다. 팝업과 저장된 언어에 따른 자동 이동은 사용하지 않습니다. 한국어를 선택하면 같은 페이지의 기존 한국어 홈페이지로 스크롤하고, 다른 언어는 각 언어 주소로 이동합니다. `/en`, `/ja`, `/zh-tw`로 직접 접속하면 해당 언어를 그대로 표시하며, 상단 언어 메뉴로 변경할 수 있습니다. 이전 버전의 `busan_site_language` 저장값과 쿠키만 자동으로 제거하고 다른 설정이나 로그인 정보는 유지합니다.

- 한국어: `/` (기존 홈페이지)
- 대만 번체 중국어: `/zh-tw`
- 일본어: `/ja`
- 영어: `/en`

해외 페이지는 관광택시, 김해공항 픽업·샌딩, 예약상담, FAQ로 구성됩니다. WhatsApp과 LINE 문자 상담만 안내하며, Facebook·Instagram·Threads도 하단에 연결합니다. 한국 국내 연락처는 `0507-1333-7114`로 표기합니다.

예약 양식은 메시지를 작성하는 도구입니다. WhatsApp 버튼은 작성된 내용을 담은 대화를 열고, LINE 버튼은 메시지를 복사합니다. 고객이 실제 메시지를 보내고 운영자와 일정·요금을 확인해야 예약이 완료됩니다. 이 양식은 서버나 Supabase에 개인정보를 저장하지 않습니다. 입력 날짜와 시간은 한국 시간 기준입니다.

번역·상담 URL은 `lib/international.ts`, 해외 화면은 `app/[locale]/page.tsx`, 홈의 언어 선택 영역은 `components/site/language-entry.tsx`, 문서 언어와 이전 언어 설정 정리는 `document-language.tsx`, 공통 화면 전환은 `site-shell.tsx`에서 관리합니다. 각 언어 페이지에 canonical, hreflang, 공유 메타데이터, Service·FAQ 구조화 데이터와 sitemap 연결이 적용됩니다.

## 로컬 실행

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

해외 페이지의 새 메인 사진과 코스 사진은 `busan-coast.webp` (Masterhatch, CC BY-SA 4.0), `busan-gamcheon.webp` (Christophe95, CC BY-SA 4.0), `busan-night-view.webp` (lumoplank, CC0 1.0)입니다. 원본은 Wikimedia Commons이며, 크기를 줄이고 WebP로 변환했습니다. `lib/international-media.ts`와 해외 Footer의 사진 크레딧에 원본 및 라이선스 링크가 있습니다. 해외 전용 색상과 반응형 레이아웃은 `components/international/international.module.css`에서 관리합니다.

개발 환경에서는 이 사이트의 서비스워커를 해제하고 관련 캐시만 비웁니다. 운영 서비스워커는 이미지 파일만 저장하며, CSS·JavaScript·API·RSC 응답은 직접 캐시하지 않습니다.

## 운영 전 교체할 것

- Footer의 사업자 정보
- 실제 요금 안내 정책
- 개인정보 처리방침/이용약관 페이지
- 네이버/구글 서치콘솔 인증값
- Supabase 관리자 계정, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`
