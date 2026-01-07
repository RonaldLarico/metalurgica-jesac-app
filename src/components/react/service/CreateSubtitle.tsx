// ServiceSubtitleForm.tsx
"use client";

import { useState } from "react";

interface ServiceSubtitleFormProps {
  serviceId: number; // Id del Service al que agregaremos el subtitle
  onCreated?: (subtitle: { id: number; text: string }) => void; // Callback opcional después de crear
}

export default function ServiceSubtitleForm({ serviceId, onCreated }: ServiceSubtitleFormProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); // Controla si se muestra el input

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!text.trim()) {
      setError("El texto es obligatorio");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/services/create-subtitle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, text }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Error al crear el subtítulo");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setText("");
      setShowForm(false);
      onCreated?.(data.subtitle);
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full mb-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-2 font-medium text-[#057EC4] hover:shadow-lg transition cursor-pointer underline"
        >
          Agregar un sub-servicio
          <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-2 mt-2 w-full">
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="grow px-3 py-2 border border-gray-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#057EC4] dark:focus:ring-[#38BDF8] transition"
              placeholder="Ingrese el sub-servicio"
              disabled={loading}
            />
            <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 border border-[#057EC4]/80  text-white rounded-r-md shadow hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center cursor-pointer hover:scale-110 duration-300"
      >
        {loading ? (
          "Guardando..."
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#057EC4]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
}
