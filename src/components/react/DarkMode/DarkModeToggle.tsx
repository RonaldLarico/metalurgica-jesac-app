import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    // 👉 SI NO HAY NADA GUARDADO → OSCURO POR DEFECTO
    if (!stored || stored === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  function toggleTheme() {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        className="
          relative inline-flex items-center justify-center
          w-9 h-9
          border border-(--card-border) dark:border-(--color-secondary)/60
          text-(--color-primary)
          bg-transparent
          transition-all duration-200 ease-out
          hover:bg-(--color-primary)/10
          hover:-translate-y-0.5
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-(--color-primary)/30
          cursor-pointer
        "
      >
        <span
          className={`
            transition-transform duration-300
            ${isDark ? "rotate-0" : "rotate-180"}
          `}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </button>

      {/* TOOLTIP */}
      <span
        className="
          pointer-events-none
          absolute -bottom-5 left-1/2 -translate-x-1/2
          whitespace-nowrap
          bg-(--login-bg)
          border border-(--card-border)
          p-0.5
          text-[8px]
          text-(--color-primary)
          opacity-0 scale-95
          transition-all duration-200
          group-hover:opacity-100 group-hover:scale-100
        "
      >
        {isDark ? "Modo claro" : "Modo oscuro"}
      </span>
    </div>
  );
}
