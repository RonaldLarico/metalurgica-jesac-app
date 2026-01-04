import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "../../../icons/GalleryIcon";

type ImageItem = {
  id: number;
  url: string;
};

type Props = {
  images: ImageItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function GalleryModal({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: Props) {
  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm
                     flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              max-w-[92vw] sm:max-w-[90vw]
              max-h-[85vh]
              flex items-center justify-center
            "
          >
            {/* Imagen */}
            <img
              src={images[activeIndex].url}
              alt="Imagen ampliada"
              className="
                max-w-full max-h-[85vh]
                object-contain
                shadow-2xl
                border-2 border-(--color-primary)
              "
            />

            {/* Cerrar */}
            <button
              onClick={onClose}
              className="
                absolute top-0 right-0
                w-12 h-12
                rounded-full
                bg-black/70 hover:bg-black/90
                text-white
                flex items-center justify-center
                transition cursor-pointer hover:scale-125 duration-300
              "
            >
              <CloseIcon className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* Anterior */}
            <button
              onClick={onPrev}
              className="
                absolute left-2 sm:-left-14
                top-1/2 -translate-y-1/2
                w-12 h-12
                rounded-full
                bg-black/50 hover:bg-black/80
                text-white
                flex items-center justify-center
                transition cursor-pointer hover:scale-125 duration-300
              "
            >
              <ArrowLeftIcon className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* Siguiente */}
            <button
              onClick={onNext}
              className="
                absolute right-2 sm:-right-14
                top-1/2 -translate-y-1/2
                w-12 h-12
                rounded-full
                bg-black/50 hover:bg-black/80
                text-white
                flex items-center justify-center
                transition cursor-pointer hover:scale-125 duration-300
              "
            >
              <ArrowRightIcon className="w-5 h-5 md:w-7 md:h-7" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
