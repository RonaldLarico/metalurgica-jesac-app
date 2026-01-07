import { useState } from "react";

type Message = {
  type: "error" | "success";
  text: string;
};

export default function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: {
  onSuccess?: () => void;
  onSwitchToRegister: () => void;
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
        text: "Debes completar todos los campos.",
      });
    }

    if (!email.includes("@")) {
      return setMessage({
        type: "error",
        text: "El correo electrónico no es válido.",
      });
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        return setMessage({
          type: "error",
          text: "Correo o contraseña incorrectos.",
        });
      }

      if (!res.ok) {
        return setMessage({
          type: "error",
          text: "No se pudo iniciar sesión. Inténtalo nuevamente.",
        });
      }

      setMessage({
        type: "success",
        text: "Inicio de sesión exitoso...",
      });

      setTimeout(() => {
        onSuccess?.();
        window.location.href = "/dashboard";
      }, 800);
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* MENSAJE */}
      {message && (
        <div
          className={`
            px-4 py-3 rounded-lg text-sm font-medium border
            ${
              message.type === "success"
                ? "bg-(--overlay-bottom) text-gray-900 dark:text-gray-100 border-(--color-secondary)/40"
                : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-400/40"
            }
          `}
        >
          {message.text}
        </div>
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Correo electrónico"
        className="
          w-full px-4 py-3
          bg-gray-100 dark:bg-[#0f2538]
          border border-(--card-border)
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          focus:outline-none focus:ring-2
          focus:ring-(--color-primary)/40
          transition
        "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Contraseña"
        className="
          w-full px-4 py-3
          bg-gray-100 dark:bg-[#0f2538]
          border border-(--card-border)
          text-gray-900 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          focus:outline-none focus:ring-2
          focus:ring-(--color-primary)/40
          transition
        "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full py-3 font-semibold
          bg-(--color-primary)
          text-white
          hover:brightness-110
          transition
          disabled:opacity-60 cursor-pointer
        "
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>

      {/* SWITCH */}
      {/* <button
        type="button"
        onClick={onSwitchToRegister}
        className="
          w-full text-sm font-medium
          text-(--color-primary)
          hover:text-(--color-secondary)
          transition-colors cursor-pointer
        "
      >
        ¿No tienes cuenta? Regístrate
      </button> */}
    </form>
  );
}
