import { useEffect, useState, useRef } from "react";
import type { ServiceItem } from "./types";
import { motion } from "framer-motion";

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const images = item.images || [];

  useEffect(() => {
    images.forEach((img) => {
      const preloaded = new Image();
      preloaded.src = img.url;
    });
  }, [images]);

  useEffect(() => {
    if (!images.length || images.length === 1) return;

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, images.length]);

  if (!images.length) return null;

  return (
    <article className="group relative flex flex-col overflow-hidden bg-gray-100/80 dark:bg-slate-900 border-2 border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#057EC4]/40 dark:hover:shadow-[#38BDF8]/40 h-full hover:border-(--color-primary)">
      
      {/* IMAGE SLIDER */}
      <div className="relative h-80 overflow-hidden">
        {images.map((img, index) => {
          const isActive = index === current;
          return (
            <motion.img
              key={img.id}
              src={img.url}
              alt={item.title}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.2, ease: "linear" }} // Cambio casi inmediato
              className="absolute inset-0 h-full w-full object-cover"
            />
          );
        })}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* CONTENT + BUTTON */}
      <div className="relative flex flex-col flex-1 p-6 space-y-4 justify-between">
        <div className="space-y-4">
          <span className="block h-1 w-10 rounded-full dark:bg-(--color-secondary) bg-(--color-primary)" />

          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-5 bg-[#057ec4]/15 dark:bg-[#38bdf8]/20 px-3 py-1 text-[16px] font-semibold tracking-[0.3em] uppercase text-[#057ec4] dark:text-[#38bdf8]"
          >
            {item.title}
          </motion.h4>

          {item.subtitles.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-slate-700 dark:text-slate-300 text-[16px] font-medium list-none space-y-3 tracking-wide"
            >
              {item.subtitles.map((s) => (
                <li key={s.id} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-(--color-secondary) shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{s.text}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* COTIZAR BUTTON */}
        <div className="flex justify-end mt-4">
          <a
            href={`https://wa.me/+51957033871?text=Hola,%20deseo%20solicitar%20el%20servicio%20de%20${encodeURIComponent(
              item.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-1.5
              bg-(--color-primary) dark:bg-(--color-secondary)
              text-white dark:text-slate-900/90 text-sm font-medium
              rounded-md
              shadow-sm
              hover:bg-sky-600 dark:hover:bg-(--color-primary)
              hover:text-gray-200
              hover:shadow-lg
              transition-all duration-300
              hover:scale-110
            "
          >
            Solicitar servicio
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
