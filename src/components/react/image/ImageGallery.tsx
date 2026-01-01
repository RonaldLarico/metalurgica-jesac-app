import ImageCardSkeleton from "../DarkMode/ImageCardSkeleton";
import ImageCard from "./ImageCard";
import type { Image } from "./types";

export default function ImageGallery({
  images,
  onDelete,
  onUpdate,
  loading,
}: {
  images: Image[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, file: File) => void;
  loading?: boolean;
}) {
  if (images.length === 0) {
    return (
      <p className="text-gray-500">
        Aún no has subido imágenes.
      </p>
    );
  }
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ImageCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
