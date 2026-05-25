create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  images text[] not null default '{}',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  likes integer not null default 0 check (likes >= 0),
  views integer not null default 0 check (views >= 0),
  author text not null default '손님',
  ai_generated boolean not null default false,
  featured boolean not null default false,
  hidden boolean not null default false
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  content text not null,
  author text not null default '손님',
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  from_place text not null,
  to_place text not null,
  message text not null default '',
  service_type text not null default 'inquiry' check (service_type in ('inquiry', 'reservation')),
  created_at timestamptz not null default now(),
  handled boolean not null default false
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default '일반',
  sort_order integer not null default 100,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.reviews enable row level security;
alter table public.comments enable row level security;
alter table public.inquiries enable row level security;
alter table public.notices enable row level security;
alter table public.faqs enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where users.id = auth.uid()
      and users.role = 'admin'
  );
$$;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users for select
using (auth.uid() = id or public.is_admin());

drop policy if exists "Admins can manage users" on public.users;
create policy "Admins can manage users"
on public.users for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can read visible reviews" on public.reviews;
create policy "Anyone can read visible reviews"
on public.reviews for select
using (hidden = false);

drop policy if exists "Anyone can write customer reviews" on public.reviews;
create policy "Anyone can write customer reviews"
on public.reviews for insert
with check (ai_generated = false and featured = false and hidden = false);

drop policy if exists "Admins can manage reviews" on public.reviews;
create policy "Admins can manage reviews"
on public.reviews for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can read comments" on public.comments;
create policy "Anyone can read comments"
on public.comments for select
using (
  exists (
    select 1 from public.reviews
    where reviews.id = comments.review_id
      and reviews.hidden = false
  )
);

drop policy if exists "Anyone can write comments" on public.comments;
create policy "Anyone can write comments"
on public.comments for insert
with check (
  exists (
    select 1 from public.reviews
    where reviews.id = comments.review_id
      and reviews.hidden = false
  )
);

drop policy if exists "Admins can manage comments" on public.comments;
create policy "Admins can manage comments"
on public.comments for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can write inquiries" on public.inquiries;
create policy "Anyone can write inquiries"
on public.inquiries for insert
with check (true);

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
on public.inquiries for select
using (public.is_admin());

drop policy if exists "Anyone can read active notices" on public.notices;
create policy "Anyone can read active notices"
on public.notices for select
using (active = true);

drop policy if exists "Admins can manage notices" on public.notices;
create policy "Admins can manage notices"
on public.notices for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can read active faqs" on public.faqs;
create policy "Anyone can read active faqs"
on public.faqs for select
using (active = true);

drop policy if exists "Admins can manage faqs" on public.faqs;
create policy "Admins can manage faqs"
on public.faqs for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-images', 'review-images', true, 3145728, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read review images" on storage.objects;
create policy "Public can read review images"
on storage.objects for select
using (bucket_id = 'review-images');

drop policy if exists "Authenticated users can upload review images" on storage.objects;
create policy "Authenticated users can upload review images"
on storage.objects for insert
with check (bucket_id = 'review-images');

insert into public.reviews (title, content, rating, tags, author, ai_generated, featured)
values
('새벽 김해공항 픽업을 편하게 이용했어요', '새벽 비행기라 걱정했는데 시간 맞춰 와주셔서 편하게 이동했어요. 짐도 많았는데 기사님이 먼저 도와주셔서 출발부터 마음이 놓였습니다.', 5, array['공항','새벽콜','지역'], '해운대 손님', false, true),
('부모님 모시고 부산 관광택시로 다녀왔습니다', '부모님 모시고 감천문화마을, 송도, 해운대까지 천천히 돌았습니다. 이동 동선이 편했고 기사님이 사진 찍기 좋은 곳도 알려주셔서 만족했습니다.', 5, array['관광','VIP','지역'], '서울 가족여행', false, true),
('부산에서 울산 장거리 이동 후기', '회의 시간이 애매해서 장거리택시를 예약했습니다. 차량이 조용하고 깨끗해서 이동 중에 자료를 볼 수 있었고, 도착 시간도 잘 맞았습니다.', 5, array['장거리','VIP'], '출장 이용객', true, false)
on conflict do nothing;

insert into public.faqs (question, answer, category, sort_order, active)
values
('김해공항 새벽 픽업도 가능한가요?', '가능합니다. 항공편 시간과 짐 개수를 남겨주시면 출발지 기준으로 여유 있는 픽업 시간을 안내합니다.', '공항', 1, true),
('부산에서 울산, 대구, 경남 장거리 이동도 예약할 수 있나요?', '부산 출발 장거리 이동 예약을 지원합니다. 이동 거리, 시간대, 경유 여부에 따라 상담 후 안내합니다.', '장거리', 2, true),
('부산 관광택시는 코스를 직접 정할 수 있나요?', '가능합니다. 감천문화마을, 송도, 해운대, 기장, 광안리 등 희망지를 기준으로 동선을 조율합니다.', '관광', 3, true)
on conflict do nothing;
