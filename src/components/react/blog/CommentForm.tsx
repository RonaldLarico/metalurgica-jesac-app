import { useEffect, useState } from "react";
import { CommentIcon } from "../../../icons/icon";

interface Props {
  blogId: number;
  parentId?: number | null;
  onSubmit: (content: string, name: string, parentId?: number) => Promise<void>;
}

const CommentForm: React.FC<Props> = ({ blogId, parentId, onSubmit }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("commenterName");
    if (savedName) setName(savedName);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setSubmitting(true);

    await onSubmit(content, name, parentId ?? undefined);
    localStorage.setItem("commenterName", name);

    setContent("");
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 p-4 mb-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 space-y-2"
    >
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
      />

      <textarea
        placeholder="Escribe tu comentario..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={4}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-gray-100"
      />

      <button
        type="submit"
        disabled={submitting}
        className="
          flex items-center gap-1 text-[#057ec4] font-medium px-2 py-1 rounded-md text-sm
          hover:bg-[#38bdf8]/20 transition-colors duration-300
          disabled:opacity-40 disabled:cursor-not-allowed
          focus:outline-none focus:ring-1 cursor-pointer
        "
      >
        <CommentIcon />
        {submitting ? "Publicando..." : "Comentar"}
      </button>
    </form>
  );
};
export default CommentForm;
