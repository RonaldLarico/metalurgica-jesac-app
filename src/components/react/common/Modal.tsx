import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        bg-black/60
        backdrop-blur-md
        flex items-center justify-center
        px-1
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          max-w-[90vw] max-h-[90vh]
          border border-(--card-border)
          bg-(--login-bg)
          animate-zoomIn
          flex flex-col
        "
      >
        <div className="flex justify-end p-1">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="
              w-8 h-8
              flex items-center justify-center
              text-sm
              text-(--color-primary)/70
              hover:text-(--color-primary)
              hover:bg-black/5 dark:hover:bg-white/5
              transition-colors
            "
          >
            ✕
          </button>
        </div>
        <div className="px-3 pb-3 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
