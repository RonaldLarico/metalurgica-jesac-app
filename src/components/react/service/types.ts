// types/service.ts
export type ServiceImageInput = {
  filename: string;
  name?: string;
  size?: number;
  width?: number;
  height?: number;
  format?: string;
};

export type CreateServicePayload = {
  title: string;
  subtitles: string[];
  images: ServiceImageInput[];
};

export interface ServiceSubtitle {
  id: number;
  text: string;
  order?: number | null;
}

export interface ServiceImage {
  id: number;
  url: string;
  name?: string;
  size?: number | null;
  width?: number | null;
  height?: number | null;
  format?: string | null;
  createdAt: string;
}

export interface Service {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  subtitles: ServiceSubtitle[];
  images: ServiceImage[];
}

export interface UpdateSubtitleProps {
  subtitleId: number;
  currentText: string;
  onUpdated?: (newText: string) => void;
}

export interface UpdateServiceTitleProps {
  serviceId: number;
  currentTitle: string;
  currentCategory: string;
  onUpdated?: (newTitle: string, newCategory: string) => void; // callback opcional después de actualizar
}

export interface ImageActionsButtonsProps {
  imageId: number;
  currentUrl: string;
  onDeleted?: () => void;
  onUpdated?: (
    newUrl: string,
    newName: string,
    newSize: number,
    newHeight: number,
    newWidth: number,
    newFormat: string,
  ) => void;
}

export interface ServiceItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  subtitles: { id: number; text: string }[];
  images: { id: number; url: string }[];
  blogs?: {
    slug: string;
  }[];
}

export interface ServiceGridProps {
  title: string;
  description: string;
  items: ServiceItem[];
}
