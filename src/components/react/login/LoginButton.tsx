import { useState } from "react";
import LoginModal from "./LoginModal";

export default function LoginButton({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  // 👉 AUTENTICADO → CERRAR SESIÓN
  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className="
          relative inline-flex items-center justify-center
          px-5 py-2.5
          font-medium text-sm
          text-white
          bg-red-600
          shadow-sm
          transition-all duration-200 ease-out
          hover:bg-(--color-secondary) hover:-translate-y-0.5
          disabled:opacity-60 disabled:translate-y-0 cursor-pointer
        "
      >
        {loading ? "Cerrando…" : "Cerrar sesión"}
      </button>
    );
  }

  // 👉 NO AUTENTICADO → LOGIN
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          group relative inline-flex items-center justify-center
          px-6 py-2.5
          font-semibold text-sm
          tracking-wide
          text-white
          bg-(--color-primary)
          border border-(--color-primary)
          transition-all duration-200 ease-out
          hover:bg-transparent hover:text-(--color-primary)
          hover:-translate-y-0.5
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-(--color-primary)/40 cursor-pointer
        "
      >
        Login
      </button>

      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
