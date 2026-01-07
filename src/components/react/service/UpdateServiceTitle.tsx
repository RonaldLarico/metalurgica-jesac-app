import { useState } from "react";
import type { UpdateServiceTitleProps } from "./types";

export default function UpdateServiceTitle({
  serviceId,
  currentTitle,
  currentCategory,
  onUpdated,
}: UpdateServiceTitleProps) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [category, setCategory] = useState(currentCategory || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!title.trim()) return setError("El título no puede estar vacío");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/services/update-title", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, title, category }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al actualizar el título");
      }

      if (onUpdated) onUpdated(title, category); // actualizamos en el componente padre
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Botón principal */}
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 flex items-center justify-center cursor-pointer"
        aria-label="Editar título"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536M4 20h4.768l12.536-12.536a2 2 0 00-2.768-2.768L4 17.232V20z"
          />
        </svg>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-lg transition-colors cursor-pointer"
            >
              X
            </button>

            <h2 className="uppercase text-md font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Editar nombre de servicio
            </h2>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Servicio
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-colors mb-4"
                placeholder="Nuevo título"
              />
            </div>

            {/* Selección de categoría */}
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Categoría
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 transition-all cursor-pointer"
                >
                  {/* Mostramos la categoría actual primero */}
                  {category &&
                    !["mineria", "metalmecanica", "otros"].includes(
                      category
                    ) && <option value={category}>{category}</option>}

                  {/* Opciones fijas */}
                  {["mineria", "metalmecanica", "otros"].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
            )}

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 dark:hover:bg-green-700 transition-all duration-200 disabled:opacity-50 w-full cursor-pointer"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
