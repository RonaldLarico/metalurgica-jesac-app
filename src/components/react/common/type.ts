export interface ShareButtonsProps {
  url: string;
  title?: string;
  targetId: number;
  type?: ShareType;
}

export type SharePlatform =
  | "WHATSAPP"
  | "TELEGRAM"
  | "FACEBOOK"
  | "LINKEDIN"
  | "X"
  | "COPY";

export type ShareType = "SERVICE" | "BLOG";
