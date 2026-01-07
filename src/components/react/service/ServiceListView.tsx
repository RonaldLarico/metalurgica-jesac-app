import { useEffect, useState } from "react";
import DeleteServiceButton from "./DeleteServiceButton";
import ImageActionsButtons from "./ImageActionsButtons";
import type { Service, ServiceImage } from "./types";
import UploadImageButton from "./UploadImageButton";
import UpdateServiceTitle from "./UpdateServiceTitle";
import UpdateSubtitle from "./updateSubtitle";
import ServiceSubtitleForm from "./CreateSubtitle";
import DeleteSubtitleButton from "./DeleteSubtitleButton";

export default function ServiceListView() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<ServiceImage | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/services/list", { credentials: "include" });
      if (!res.ok) throw new Error("Error al cargar los servicios");
      const data: Service[] = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDeleted = () => fetchServices();

  if (loading)
    return <p className="text-center text-gray-500">Cargando servicios...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!services.length)
    return (
      <p className="text-center text-gray-500">No hay servicios disponibles.</p>
    );

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-2xl p-2 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
            {/* Columna izquierda: título + actualizar */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900/80">
                  {service.title}
                </h2>

                {/* Botón actualizar título */}
                <UpdateServiceTitle
                  serviceId={service.id}
                  currentTitle={service.title}
                  currentCategory={service.category}
                  onUpdated={(newTitle, newCategory) => {
                    setServices((prev) =>
                      prev.map((s) =>
                        s.id === service.id
                          ? { ...s, title: newTitle, category: newCategory }
                          : s
                      )
                    );
                  }}
                />
                {/* eliminar servicio completo*/}
                <DeleteServiceButton
                  serviceId={service.id}
                  onDeleted={handleDeleted}
                />
              </div>

              {/* Fecha de creación */}
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Creado el:{" "}
                {new Date(service.createdAt).toLocaleDateString("es-PE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-600 font-medium">Categoría:</span>
            <span className="text-gray-900 font-semibold text-lg">
              {service.category || "Sin categoría"}
            </span>
          </div>

          {/* Subtítulos */}
          {service.subtitles.length > 0 && (
            <div className="mb-4">
              <h3 className="text-gray-700 font-semibold mb-2">
                Sub-servicios
              </h3>
              <ul className="space-y-2">
                {service.subtitles.map((sub) => (
                  <li
                    key={sub.id}
                    className="p-2 bg-gray-50  rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      {/* Texto del subtitle */}
                      <span className="text-gray-600">{sub.text}</span>
                      <div className="flex gap-2">
                        {/* Botón de editar subtitle */}
                        <UpdateSubtitle
                          subtitleId={sub.id}
                          currentText={sub.text}
                          onUpdated={(newText) => {
                            // Actualizar el estado de los subtitles en el padre
                            setServices((prev) =>
                              prev.map((s) =>
                                s.id === service.id
                                  ? {
                                      ...s,
                                      subtitles: s.subtitles.map((st) =>
                                        st.id === sub.id
                                          ? { ...st, text: newText }
                                          : st
                                      ),
                                    }
                                  : s
                              )
                            );
                          }}
                        />
                        {/* Botón de eliminar subtitle */}
                        <DeleteSubtitleButton
                          subtitleId={sub.id}
                          onDeleted={() => {
                            // Eliminar del estado del padre
                            setServices((prev) =>
                              prev.map((s) =>
                                s.id === service.id
                                  ? {
                                      ...s,
                                      subtitles: s.subtitles.filter(
                                        (st) => st.id !== sub.id
                                      ),
                                    }
                                  : s
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <ServiceSubtitleForm
              serviceId={service.id}
              onCreated={(newSubtitle) => {
                setServices((prev) =>
                  prev.map((s) =>
                    s.id === service.id
                      ? { ...s, subtitles: [...s.subtitles, newSubtitle] }
                      : s
                  )
                );
              }}
            />
          </div>

          {/* Imágenes */}
          {service.images.length > 0 && (
            <div className="mb-5">
              <h3 className="text-gray-700 font-semibold mb-2">Imágenes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {service.images.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className="overflow-hidden rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center w-full aspect-square cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={service.title}
                      className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <UploadImageButton
            serviceId={service.id}
            onUploaded={() => fetchServices()}
          />
        </div>
      ))}
      {/* Modal de imagen */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 flex flex-col items-center">
            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 cursor-pointer right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-700 font-bold"
              aria-label="Cerrar"
            >
              X
            </button>

            {/* Imagen */}
            <img
              src={selectedImage.url}
              alt="Vista previa"
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md"
            />

            {/* Botones de acción */}
            <ImageActionsButtons
              imageId={selectedImage.id}
              currentUrl={selectedImage.url}
              onDeleted={() => {
                setSelectedImage(null);
                fetchServices();
              }}
              onUpdated={(newUrl) => {
                setSelectedImage((prev) =>
                  prev ? { ...prev, url: newUrl } : null
                );
                fetchServices();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
