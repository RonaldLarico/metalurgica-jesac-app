import { useState, useEffect } from "react";

interface DeleteServiceButtonProps {
  serviceId: number;
  onDeleted?: () => void;
}

export default function DeleteServiceButton({ serviceId, onDeleted }: DeleteServiceButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/services/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: serviceId }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al eliminar el servicio");
      }

      if (onDeleted) onDeleted();
      closeModal();
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setAnimateIn(true), 50); // animación de apertura
  };

  const closeModal = () => {
    setAnimateIn(false);
    setTimeout(() => setShowModal(false), 200); // esperar animación
  };

  return (
    <div className="">
      {/* Botón principal */}
      <button
        onClick={openModal}
        disabled={loading}
        className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-700 transition-all duration-300 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Eliminando..." : "X"}
      </button>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

      {/* Modal de confirmación */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            animateIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${
              animateIn ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirmar eliminación</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ¿Estás seguro que deseas eliminar este servicio? Se eliminara el servicio completo como sub-servicios y imagenes, esta acción <span className="font-semibold text-red-600">no se puede deshacer</span>.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
