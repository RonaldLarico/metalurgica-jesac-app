import { useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      requestAnimationFrame(() => setVisible(true));
    } else {
      closeModal();
    }
  }, [open]);

  function closeModal() {
    setVisible(false);
    setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, 200);
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="
        border-none bg-transparent
        backdrop:bg-black/70
        mx-auto my-auto
      "
    >
      {/* CONTENEDOR */}
      <div
        className={`
          relative w-full max-w-md mx-auto
          rounded-2xl
          border border-(--card-border)
          transition-all duration-200 ease-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        style={{
          background: "var(--login-bg)",
        }}
      >
        {/* Barra superior corporativa */}
        {/* <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-t-2xl" /> */}

        <div className="px-8 py-8 space-y-8">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2
                className="
                  text-sm font-semibold tracking-[0.35em]
                  uppercase
                  text-(--color-primary)
                "
              >
                {mode === "login" ? "Acceso de usuario" : "Registro de usuario"}
              </h2>
              <div className="w-12 h-px bg-(--color-secondary)/60" />
            </div>

            <button
              onClick={closeModal}
              className="
                text-(--color-primary)/50
                hover:text-(--color-secondary)
                transition-colors text-xl cursor-pointer hover:scale-125 duration-300
              "
            >
              ✕
            </button>
          </div>

          {/* CONTENIDO */}
          <div className="pt-2">
            {mode === "login" ? (
              <LoginForm
                onSuccess={closeModal}
                onSwitchToRegister={() => setMode("register")}
              />
            ) : (
              <RegisterForm
                onSuccess={() => setMode("login")}
                onBackToLogin={() => setMode("login")}
              />
            )}
          </div>
        </div>

        {/* Base inferior */}
        <div className="h-px w-full bg-(--card-border)" />
      </div>
    </dialog>
  );
}
