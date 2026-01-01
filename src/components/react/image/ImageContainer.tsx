import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";
import type { Image } from "./types";

export default function ImageContainer() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadImages() {
    const res = await fetch("/api/image/list");
    if (res.ok) {
      setImages(await res.json());
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function deleteImage(id: number) {
    await fetch("/api/image/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageId: id }),
    });

    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function updateImage(id: number, file: File) {
    const formData = new FormData();
    formData.append("imageId", String(id));
    formData.append("image", file);

    setLoading(true);
    await fetch("/api/image/update", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    await loadImages();
  }

  return (
    <div className="space-y-10">
      <ImageUpload onUploaded={loadImages} />

      <ImageGallery
        images={images}
        onDelete={deleteImage}
        onUpdate={updateImage}
        loading={loading}
      />
    </div>
  );
}
