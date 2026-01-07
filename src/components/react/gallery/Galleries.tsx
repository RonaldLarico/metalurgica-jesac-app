import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GalleryModal from "./GalleryModal";

type ImageItem = {
  id: number;
  url: string;
};

export default function Gallery() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(12);

  /* Fetch API */
  useEffect(() => {
    fetch("/api/image/listPublic")
      .then((res) => res.json())
      .then(setImages)
      .catch(console.error);
  }, []);

  /* Responsive limit */
  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth < 640 ? 6 : 12);
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const visibleImages = showAll ? images : images.slice(0, limit);

  const nextImage = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevImage = () => {
    if (activeIndex === null) return;
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-4 space-y-14">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-1 w-10 bg-(--color-primary) dark:bg-(--color-secondary)" />
            <span className="tracking-[0.4em] uppercase font-semibold text-(--color-primary) dark:text-(--color-secondary)">
              Galería
            </span>
          </div>
          <p className="dark:text-slate-300 text-slate-700 max-w-2xl mx-auto tracking-wide">
            Algunos de nuestros proyectos y trabajos más representativos
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveIndex(idx)}
              className="
                group cursor-pointer relative overflow-hidden
                bg-white dark:bg-white/5
                border-2 border-(--color-primary)
                shadow-sm hover:shadow-xl
                transition-all duration-300
              "
            >
              {img.url.endsWith(".mp4") ? (
                <video
                  src={img.url}
                  className="
            w-full h-60 object-cover
            transition-transform duration-700 ease-out
            filter grayscale-15 contrast-102
            group-hover:grayscale-0
            group-hover:scale-105
          "
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={img.url}
                  alt="Galería"
                  className="
            w-full h-60 object-cover
            transition-transform duration-700 ease-out
            filter grayscale-15 contrast-102
            group-hover:grayscale-0
            group-hover:scale-105
          "
                />
              )}

              {/* Overlay elegante */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              {/* Texto Ver Imagen */}
              <div
                className="
                absolute inset-0 flex items-center justify-center
                opacity-0 group-hover:opacity-100
                text-(--color-secondary) font-semibold text-sm
                backdrop-blur-xs
                transition-opacity duration-300
              "
              >
                Ver imagen
              </div>
              {/* Línea decorativa inferior */}
              <span
                className="
                absolute bottom-0 left-0 w-full h-0.5
                bg-(--color-primary) dark:bg-(--color-secondary)
                scale-x-0 group-hover:scale-x-100
                origin-left transition-transform duration-500
              "
              />
            </motion.div>
          ))}
        </div>

        {/* BOTÓN VER MÁS */}
        {!showAll && images.length > limit && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -8 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="
                px-8 py-3 font-semibold tracking-wide
                bg-white dark:bg-(--card-border) text-(--color-primary)
                hover:bg-opacity-90
                shadow-lg hover:shadow-xl
                transition-all cursor-pointer hover:scale-115 duration-300
              "
            >
              Ver más…
            </button>
          </motion.div>
        )}
      </div>

      {/* MODAL */}
      <GalleryModal
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
}
