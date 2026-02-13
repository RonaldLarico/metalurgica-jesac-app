import { useState } from "react";
import type { Image } from "./types";
import Modal from "../common/Modal";
import ActionButton from "../common/Button";
import ConfirmModal from "../common/ConfirmModal";

function formatBytes(bytes: number) {
  if (!bytes) return "";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

const ImageCard = ({
  image,
  onDelete,
  onUpdate,
}: {
  image: Image;
  onDelete: (id: number) => void;
  onUpdate: (id: number, file: File) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(image.id);
    setConfirmOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (file: File) => {
    setLoading(true);
    try {
      await onUpdate(image.id, file);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="
          relative group
          overflow-hidden
          border border-(--card-border)
          bg-(--login-bg)
          transition-transform duration-300
          hover:scale-[1.03]
          cursor-pointer
        "
      >
        {image.format === "mp4" ? (
          <video
            src={image.url}
            className="w-full h-52 object-cover"
            controls
            autoPlay
            muted
            loop
          />
        ) : (
          <img
            src={image.url}
            alt={image.url}
            loading="lazy"
            className="w-full h-52 object-cover"
          />
        )}

        {/* INFO BAR */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            bg-(--login-bg)/20
            backdrop-blur-sm
            border-t border-(--card-border)
            px-3 py-2
            flex items-center justify-between
            text-[10px]
            text-(--color-secondary)
          "
        >
          <span>{formatBytes(image.size)}</span>
          <span className="">
            {image.width}x{image.height}.{image.format}
          </span>
        </div>

        {/* ACTIONS */}
        <div
          className="
            absolute inset-0
            bg-black/50
            opacity-0 group-hover:opacity-100
            transition
            flex items-end justify-center gap-3 pb-4
          "
        >
          {loading && (
            <div
              className="
                absolute inset-0
                flex items-center justify-center
                bg-black/60
                text-(--color-primary)
                text-sm
              "
            >
              Actualizando…
            </div>
          )}

          <ActionButton
            text="Actualizar"
            icon="✏️"
            fileInput
            loading={loading}
            onFileChange={handleUpdate}
          />

          <ActionButton
            text="Eliminar"
            icon="🗑"
            color="
              bg-transparent
              border border-red-500/50
              text-red-500
              hover:bg-red-500/20
            "
            onClick={handleDeleteClick}
          />
        </div>
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          className="
            relative
            border border-(--card-border)
            bg-(--login-bg)/30
          "
        >
          {image.format === "mp4" ? (
            <video
              src={image.url}
              className="max-w-[80vw] max-h-[80vh] object-contain"
              controls
              autoPlay
              muted
              loop
            />
          ) : (
            <img
              src={image.url}
              alt=""
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
          )}

          {/* INFO */}
          <div
            className="
              absolute bottom-0 left-0 right-0
              bg-(--login-bg)/20
              backdrop-blur-sm
              border-t border-(--card-border)
              px-3 py-2
              flex justify-between
              text-[12px]
              text-(--color-secondary)
            "
          >
            <span>{formatBytes(image.size)}</span>
            <span>
              {image.width}x{image.height}.{image.format}
            </span>
          </div>

          {/* ACTIONS */}
          <div className="absolute inset-0 flex items-end justify-center gap-3 pb-6">
            {loading && (
              <div
                className="
                  absolute inset-0
                  flex items-center justify-center
                  bg-black/60
                  text-(--color-primary)
                  text-sm
                "
              >
                Actualizando…
              </div>
            )}

            <ActionButton
              text="Actualizar"
              icon="✏️"
              fileInput
              disabled={loading}
              loading={loading}
              onFileChange={handleUpdate}
            />

            <ActionButton
              text="Eliminar"
              icon="🗑"
              color="
                bg-transparent
                border border-red-500/50
                text-red-500
                hover:bg-red-500/30
              "
              onClick={handleDeleteClick}
            />
          </div>
        </div>
      </Modal>

      {/* CONFIRM */}
      <ConfirmModal
        open={confirmOpen}
        message="¿Estás seguro de eliminar esta imagen?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default ImageCard;
