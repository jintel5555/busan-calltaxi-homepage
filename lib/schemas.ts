import { z } from "zod";

export const reviewPayloadSchema = z.object({
  title: z.string().min(4).max(90),
  content: z.string().min(12).max(2400),
  rating: z.coerce.number().int().min(1).max(5),
  images: z.array(z.string().max(600)).max(5).default([]),
  tags: z.array(z.string().max(16)).max(8).default([]),
  author: z.string().min(2).max(32).default("손님"),
  ai_generated: z.boolean().default(false),
  featured: z.boolean().default(false),
  honeypot: z.string().optional().default("")
});

export const commentPayloadSchema = z.object({
  author: z.string().min(2).max(32).default("손님"),
  content: z.string().min(2).max(1000),
  honeypot: z.string().optional().default("")
});

export const inquiryPayloadSchema = z.object({
  name: z.string().min(2).max(32),
  phone: z.string().min(8).max(24),
  from_place: z.string().min(2).max(80),
  to_place: z.string().min(2).max(80),
  message: z.string().max(1000).default(""),
  service_type: z.enum(["inquiry", "reservation"]).default("inquiry"),
  honeypot: z.string().optional().default("")
});

export const aiReviewPayloadSchema = z.object({
  from: z.string().min(1).max(80),
  to: z.string().min(1).max(80),
  duration: z.string().min(1).max(40),
  purpose: z.string().min(1).max(80),
  customerType: z.string().min(1).max(80),
  vehicleType: z.string().min(1).max(80),
  situation: z.string().min(1).max(240)
});

export const faqPayloadSchema = z.object({
  question: z.string().min(4).max(160),
  answer: z.string().min(4).max(2000),
  category: z.string().max(40).default("일반"),
  sort_order: z.coerce.number().int().min(0).max(9999).default(100),
  active: z.boolean().default(true)
});
