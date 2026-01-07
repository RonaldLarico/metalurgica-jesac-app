// DeleteSubtitleButton.tsx
"use client";

import { useState } from "react";

interface DeleteSubtitleButtonProps {
  subtitleId: number;
  onDeleted?: () => void;
}

export default function DeleteSubtitleButton({ subtitleId, onDeleted }: DeleteSubtitleButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services/delete-subtitle", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subtitleId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Error al eliminar el subtítulo");
        setLoading(false);
        return;
      }

      setShowModal(false);
      onDeleted?.();
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BOTÓN ELIMINAR */}
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1 border border-red-600 text-red-600 rounded-md text-sm hover:bg-red-700 hover:text-gray-100 transition cursor-pointer"
      >
        X
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md ">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-100">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar este subtítulo? Esta acción no se puede deshacer.
            </p>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition cursor-pointer"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
