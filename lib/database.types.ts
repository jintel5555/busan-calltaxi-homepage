export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          title: string;
          content: string;
          rating: number;
          images: string[];
          tags: string[];
          created_at: string;
          updated_at: string | null;
          likes: number;
          views: number;
          author: string;
          ai_generated: boolean;
          featured: boolean;
          hidden: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["reviews"]["Row"]> & {
          title: string;
          content: string;
          rating: number;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
      };
      users: {
        Row: {
          id: string;
          nickname: string;
          role: "admin" | "customer";
          created_at: string;
        };
        Insert: Database["public"]["Tables"]["users"]["Row"];
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>;
      };
      comments: {
        Row: {
          id: string;
          review_id: string;
          content: string;
          author: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["comments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["comments"]["Row"]>;
      };
    };
  };
};
