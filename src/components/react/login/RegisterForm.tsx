import { useState } from "react";

type Message = {
  type: "success" | "error";
  text: string;
};

export default function RegisterForm({
  onSuccess,
  onBackToLogin,
}: {
  onSuccess: () => void;
  onBackToLogin: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      return setMessage({
        type: "error",
        text: "Todos los campos son obligatorios.",
      });
    }

    if (!email.includes("@")) {
      return setMessage({
        type: "error",
        text: "El correo electrónico no es válido.",
      });
    }

    if (password.length < 6) {
      return setMessage({
        type: "error",
        text: "La contraseña debe tener al menos 6 caracteres.",
      });
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 409) {
        return setMessage({
          type: "error",
          text: "Este correo ya está registrado.",
        });
      }

      if (!res.ok) {
        return setMessage({
          type: "error",
          text: "Ocurrió un error inesperado. Inténtalo nuevamente.",
        });
      }

      setMessage({
        type: "success",
        text: "Cuenta creada correctamente. Ya puedes iniciar sesión.",
      });

      setTimeout(() => {
        onSuccess();
      }, 1200);
    } catch {
      setMessage({
        type: "error",
        text: "Error de conexión. Verifica tu internet.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* MENSAJE */}
      {message && (
        <div
          className={`
            px-4 py-3 text-sm font-medium
            border
            ${
              message.type === "success"
                ? "bg-(--color-primary)/10 text-(--color-primary) border-(--color-primary)/30"
                : "bg-red-500/10 text-red-600 border-red-500/30"
            }
          `}
        >
          {message.text}
        </div>
      )}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          w-full px-4 py-2
          bg-white dark:bg-transparent
          border border-(--card-border)
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400
          transition-colors duration-200
          focus:outline-none
          focus:border-(--color-primary)
        "
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="
          w-full px-4 py-2
          bg-white dark:bg-transparent
          border border-(--card-border)
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400
          transition-colors duration-200
          focus:outline-none
          focus:border-(--color-primary)
        "
      />

      <button
        disabled={loading}
        className="
          w-full py-2
          font-semibold text-sm
          text-white
          bg-(--color-primary)
          border border-(--color-primary)
          transition-all duration-200 ease-out
          hover:bg-transparent hover:text-(--color-primary)
          disabled:opacity-60 cursor-pointer
        "
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>

      <button
        type="button"
        onClick={onBackToLogin}
        className="
          w-full text-sm
          text-(--color-primary)
          transition-colors
          hover:text-(--color-secondary) cursor-pointer
        "
      >
        ← Volver a iniciar sesión
      </button>
    </form>
  );
}
