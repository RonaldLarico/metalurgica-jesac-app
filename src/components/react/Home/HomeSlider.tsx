import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ImageFromAPI {
  id: string;
  url: string;
}

const SPEED = 40;

export default function HomeSlider() {
  const [images, setImages] = useState<string[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);

  const [rowWidth, setRowWidth] = useState(0);
  const [colHeight, setColHeight] = useState(0);

  useEffect(() => {
    fetch("/api/image/listPublic")
      .then((res) => res.json())
      .then((data: ImageFromAPI[]) => {
        setImages(data.map((img) => img.url));
      });
  }, []);

  useEffect(() => {
    if (rowRef.current) {
      setRowWidth(rowRef.current.scrollWidth / 2);
    }
    if (colRef.current) {
      setColHeight(colRef.current.scrollHeight / 2);
    }
  }, [images]);

  if (!images.length) return null;

  const loopImages = [...images, ...images];

  return (
    <div className="relative w-full h-90 md:h-130 lg:h-170 overflow-hidden bg-transparent">
      {/* 📱 MOBILE / TABLET */}
      <div className="flex flex-col gap-4 lg:hidden mt-5">
        {/* overlay izquierdo */}
        <div
          className="
            pointer-events-none absolute left-0 top-0 z-10 h-full w-4
            bg-linear-to-r from-[#d7ecff] to-transparent
            dark:from-[#021e2e]
          "
        />

        {/* overlay derecho */}
        <div
          className="
            pointer-events-none absolute right-0 top-0 z-10 h-full w-4
            bg-linear-to-l from-[#d7ecff] to-transparent
            dark:from-[#021e2e]
          "
        />

        <motion.div
          ref={rowRef}
          animate={{ x: [-rowWidth, 0] }}
          transition={{
            duration: rowWidth / SPEED,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 flex-nowrap will-change-transform"
        >
          {loopImages.map((src, i) => (
            <img
              key={`m1-${i}`}
              src={src}
              alt=""
              className="
                h-40 w-48 object-cover shrink-0
                border-2 border-[#057ec4]/20
                dark:border-[#38bdf8]/45
              "
            />
          ))}
        </motion.div>

        <motion.div
          animate={{ x: [0, -rowWidth] }}
          transition={{
            duration: rowWidth / SPEED,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4 flex-nowrap will-change-transform"
        >
          {loopImages.map((src, i) => (
            <img
              key={`m2-${i}`}
              src={src}
              alt=""
              className="
                h-40 w-48 object-cover shrink-0
                border-2 border-[#057ec4]/20
                dark:border-[#38bdf8]/45
              "
            />
          ))}
        </motion.div>
      </div>

      {/* 🖥 DESKTOP */}
      <div className="hidden lg:grid grid-cols-2 gap-6 h-full">
        {/* sombra superior */}
        <div
          className="
            pointer-events-none absolute top-0 left-0 z-10 h-8 w-full
            bg-linear-to-b from-[#d7ecff] to-transparent
            dark:from-[#021e2e]
          "
        />

        {/* sombra inferior */}
        <div
          className="
            pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full
            bg-linear-to-t from-[#d7ecff] to-transparent
            dark:from-[#021e2e]
          "
        />

        <motion.div
          ref={colRef}
          animate={{ y: [0, -colHeight] }}
          transition={{
            duration: colHeight / SPEED,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-6 will-change-transform"
        >
          {loopImages.map((src, i) => (
            <img
              key={`d1-${i}`}
              src={src}
              alt=""
              className="
                h-72 w-full object-cover
                border-2 border-[#057ec4]/20
                dark:border-[#38bdf8]/45
              "
            />
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [-colHeight, 0] }}
          transition={{
            duration: colHeight / SPEED,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col gap-6 will-change-transform"
        >
          {loopImages.map((src, i) => (
            <img
              key={`d2-${i}`}
              src={src}
              alt=""
              className="
                h-72 w-full object-cover
                border-2 border-[#057ec4]/20
                dark:border-[#38bdf8]/45
              "
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
