export type ReviewTag = "지역" | "공항" | "관광" | "장거리" | "VIP" | "새벽콜";

export type Review = {
  id: string;
  title: string;
  content: string;
  rating: number;
  images: string[];
  tags: string[];
  created_at: string;
  updated_at?: string | null;
  likes: number;
  views: number;
  author: string;
  ai_generated: boolean;
  featured: boolean;
  hidden?: boolean;
};

export type Comment = {
  id: string;
  review_id: string;
  content: string;
  author: string;
  created_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  from_place: string;
  to_place: string;
  message: string;
  service_type: "inquiry" | "reservation";
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at?: string | null;
};
