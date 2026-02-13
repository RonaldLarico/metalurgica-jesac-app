import { useState } from "react";

interface UploadImageButtonProps {
  serviceId: number;
  onUploaded?: (urls: string[]) => void;
}

export default function UploadImageButton({
  serviceId,
  onUploaded,
}: UploadImageButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length)
      return setError("Selecciona al menos una imagen");
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("serviceId", String(serviceId));
      selectedFiles.forEach((file) => {formData.append("image", file, file.name)});

      const res = await fetch("/api/services/create-image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al subir las imágenes");
      }

      const data = await res.json();
      if (onUploaded) onUploaded(data.urls);

      setSelectedFiles([]);
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Botón principal */}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-1 border border-green-300 text-green-600 hover:text-green-400 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 cursor-pointer"
      >
        Cargar Imágenes
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col items-center transition-colors duration-300">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 font-bold text-lg cursor-pointer"
              aria-label="Cerrar"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Selecciona imágenes
            </h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="mb-4 w-full text-gray-700 dark:text-gray-200 file:border-2 file:border-gray-300 dark:file:border-gray-600 file:rounded-lg file:px-3 file:py-2 file:bg-gray-100 dark:file:bg-gray-700 file:text-gray-700 dark:file:text-gray-200 file:cursor-pointer hover:file:bg-gray-200 dark:hover:file:bg-gray-600 transition-all"
            />

            {selectedFiles.length > 0 && (
              <div className="mb-4 w-full grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-auto p-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                {selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="max-h-32 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  />
                ))}
              </div>
            )}

            {error && (
              <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
            )}

            <button
              onClick={handleUpload}
              disabled={loading}
              className="px-5 py-2 mt-2 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 cursor-pointer"
            >
              {loading
                ? "Subiendo..."
                : `Subir ${selectedFiles.length} Imagen(es)`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
