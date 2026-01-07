import { useState } from "react";
import type { UpdateSubtitleProps } from "./types";

export default function UpdateSubtitle({
  subtitleId,
  currentText,
  onUpdated,
}: UpdateSubtitleProps) {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(currentText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (text.trim() === "") return setError("El texto no puede estar vacío");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/services/update-subtitle", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitleId, text }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al actualizar el subtitle");
      }

      const data = await res.json();
      if (onUpdated) onUpdated(data.subtitle.text);

      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón de abrir modal */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-1 border border-yellow-600/50 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-700 transition-all duration-200 cursor-pointer"
        title="Editar Subtitle"
      >
        ✏️
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative flex flex-col">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-lg cursor-pointer"
            >
              X
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Editar sub-servicios
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              rows={3}
              placeholder="Escribe el nuevo texto del subtitle"
            />

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold shadow hover:bg-yellow-700 transition-all duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
