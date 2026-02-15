import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

export default function CreateServiceForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subtitles, setSubtitles] = useState([""]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSubtitle = (i: number, v: string) => {
    const copy = [...subtitles];
    copy[i] = v;
    setSubtitles(copy);
  };

  const addSubtitle = () => setSubtitles([...subtitles, ""]);
  const removeSubtitle = (i: number) =>
    setSubtitles(subtitles.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title.trim()) return setError("El título es obligatorio");
    if (files.length === 0) return setError("Debes subir al menos una imagen");

    setLoading(true);
    try {
      const images = files
        .map((f: any) => {
          const parsed =
            typeof f.serverId === "string"
              ? JSON.parse(f.serverId)
              : f.serverId;
          return Array.isArray(parsed) ? parsed : [parsed];
        })
        .flat();

      const res = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          category,
          subtitles: subtitles.filter(Boolean),
          images,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al crear el servicio");
      }

      setSuccess(true);
      setTitle("");
      setSubtitles([""]);
      setFiles([]);
    } catch (err: any) {
      setError(err.message ?? "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto space-y-6 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Crear Servicio
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Nombre de servicio
        </label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Categoría
        </label>
        <div className="relative">
          <select
            className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 transition-all cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="mineria">mineria</option>
            <option value="metalmecanica">metalmecanica</option>
            <option value="otros">otros</option>
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

      {/* Subtitles */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Sub-servicios
        </label>
        <div className="space-y-2">
          {subtitles.map((sub, i) => (
            <div
              key={i}
              className="flex gap-2 items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-2 py-1"
            >
              <input
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 transition-all"
                value={sub}
                onChange={(e) => updateSubtitle(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeSubtitle(i)}
                className="text-red-500 hover:text-red-600 text-xl font-bold transition-transform transform hover:scale-125 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSubtitle}
          className="mt-2 text-sm text-green-600 dark:text-green-400 hover:scale-105 transition-transform cursor-pointer"
        >
          + Agregar sub-servicios
        </button>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
          Imágenes (mínimo 1)
        </label>
        <FilePond
          name="file"
          files={files}
          onupdatefiles={setFiles}
          allowMultiple
          maxFiles={5}
          instantUpload={true}
          acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
          maxFileSize="16MB"
          server={{
            process: {
              url: "/api/services/upload",
              method: "POST",
              withCredentials: true,
              ondata: (formData) => formData,
              onload: (response) => response,
              onerror: (err) => {
                console.error("Error FilePond:", err);
                setError("Error al subir la imagen");
              },
            },
          }}
          labelIdle='Arrastra imágenes o <span class="filepond--label-action">haz click aquí</span>'
          credits={false}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && (
        <p className="uppercase font-semibold text-green-400">
          Servicio creado correctamente!
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creando Servicio y blog..." : "Crear Servicio"}
      </button>
    </form>
  );
}
