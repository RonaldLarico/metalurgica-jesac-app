import type { Blog } from "@prisma/client";

export interface BlogCardProps {
  blog: Blog & {
    service: {
      title: string;
      category?: string | null;
      subtitles: { id: number; text: string; order?: number | null }[];
      images: { id: number; url: string; name?: string | null }[];
    };
  };
  userId?: number;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  parentId?: number | null;
  replies?: Comment[];
}

export type ReactionType = "LIKE" | "DISLIKE" | "LOVE" | "WOW";
