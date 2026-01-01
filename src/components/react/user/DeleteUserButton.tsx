import { useState } from "react";

type Props = {
  userId: number;
  onDelete: (id: number) => void;
};

export default function DeleteUserButton({ userId, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    onDelete(userId);
    setOpen(false);
  }

  return (
    <>
      {/* BOTÓN ELIMINAR */}
      <button
        onClick={() => setOpen(true)}
        className="
          px-3 py-1
          text-xs font-semibold
          border
          border-(--card-border)
          text-red-500
          transition
          hover:bg-(--color-primary)/10 cursor-pointer
        "
      >
        Eliminar
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/40
            backdrop-blur-xl
          "
          onClick={() => setOpen(false)}
        >
          <div
            className="
              relative
              w-full max-w-sm
              bg-(--login-bg)
              border border-(--card-border)
              p-6
              shadow-lg
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTÓN X */}
            <button
              onClick={() => setOpen(false)}
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

            {/* TEXTO */}
            <h3
              className="
                mb-2
                text-sm font-semibold
                text-(--color-primary)
              "
            >
              Confirmar eliminación
            </h3>

            <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
              ¿Estás seguro de que deseas eliminar este usuario?  
              Esta acción no se puede deshacer.
            </p>

            {/* ACCIONES */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="
                  px-4 py-2
                  text-sm font-medium
                  border border-(--card-border)
                  text-slate-600 dark:text-slate-300
                  transition
                  hover:bg-slate-100/50
                  dark:hover:bg-slate-800/50 cursor-pointer
                "
              >
                Cancelar
              </button>

              <button
                onClick={handleConfirm}
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
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
