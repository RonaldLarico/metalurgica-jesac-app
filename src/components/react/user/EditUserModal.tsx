import { useState } from "react";
import type { User } from "./UserContainer";

type Props = {
  user: User;
  onClose: () => void;
  onSave: (id: number, email: string, password?: string) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
        backdrop-blur-xl
        bg-black/40
      "
      onClick={onClose}   // 👈 click fuera cierra
    >
      <div
        className="
          relative
          w-full max-w-md
          bg-(--login-bg)
          border border-(--card-border)
          p-6
          shadow-lg
        "
        onClick={(e) => e.stopPropagation()} // 👈 evita cerrar al click interno
      >
        {/* BOTÓN X */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="
            absolute right-3 top-3
            text-slate-400
            transition
            hover:text-slate-600
            dark:hover:text-slate-200 cursor-pointer
          "
        >
          ✕
        </button>

        <h2
          className="
            mb-4
            text-lg font-semibold
            text-(--color-primary)
          "
        >
          Editar usuario
        </h2>

        <input
          className="
            mb-3 w-full
            border border-(--card-border)
            bg-transparent
            p-2 text-sm
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400
            focus:outline-none
            focus:ring-2
            focus:ring-(--color-primary)/30
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="
            mb-4 w-full
            border border-(--card-border)
            bg-transparent
            p-2 text-sm
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400
            focus:outline-none
            focus:ring-2
            focus:ring-(--color-primary)/30
          "
          type="password"
          placeholder="Nueva contraseña (opcional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2
              text-sm font-medium
              text-slate-600 dark:text-slate-300
              border border-(--card-border)
              transition
              hover:bg-slate-100/50
              dark:hover:bg-slate-800/50 cursor-pointer
            "
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(user.id, email, password || undefined)}
            className="
              px-4 py-2
              text-sm font-semibold
              text-white
              bg-(--color-primary)
              transition
              hover:bg-(--color-primary)/90
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-(--color-primary)/40 cursor-pointer
            "
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
