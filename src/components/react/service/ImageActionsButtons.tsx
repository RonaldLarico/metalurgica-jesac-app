import { useState } from "react";
import type { ImageActionsButtonsProps } from "./types";

export default function ImageActionsButtons({
  imageId,
  currentUrl,
  onDeleted,
  onUpdated,
}: ImageActionsButtonsProps) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // Modal de confirmación

  // Eliminar imagen
  const handleDelete = async () => {
    setLoadingDelete(true);

    try {
      const res = await fetch("/api/services/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: imageId }),
      });

      if (!res.ok) throw new Error("Error al eliminar la imagen");

      if (onDeleted) onDeleted();
      setShowConfirm(false);
    } catch (err: any) {
      alert(err.message || "Error inesperado");
    } finally {
      setLoadingDelete(false);
    }
  };

  // Actualizar imagen
  const handleUpdate = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("imageId", String(imageId));
      formData.append("image", file);

      setLoadingUpdate(true);
      try {
        const res = await fetch("/api/services/update-image", {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error al actualizar la imagen");
        }

        const data = await res.json();
        if (onUpdated)
          onUpdated(
            data.url,
            data.name,
            data.size,
            data.width,
            data.height,
            data.format,
          );
      } catch (err: any) {
        alert(err.message || "Error inesperado");
      } finally {
        setLoadingUpdate(false);
      }
    };

    fileInput.click();
  };

  return (
    <>
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handleUpdate}
          disabled={loadingUpdate}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {loadingUpdate ? "Actualizando..." : "Actualizar"}
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          disabled={loadingDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
        >
          {loadingDelete ? "Eliminando..." : "Eliminar"}
        </button>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Confirmar eliminación
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              ¿Estás seguro que deseas eliminar esta imagen? Esta acción no se
              puede deshacer.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
              >
                {loadingDelete ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
