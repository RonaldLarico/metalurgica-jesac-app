import { motion } from "framer-motion";
import { homeHeroData } from "../../../constants/home.data";

export default function ContactSection() {
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-1 w-10 bg-(--color-primary) dark:bg-(--color-secondary)" />
            <span className="tracking-[0.35em] uppercase font-semibold text-(--color-primary) dark:text-(--color-secondary)">
              Contacto
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-600 dark:text-slate-100/90">
            Hablemos de tu próximo proyecto
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed tracking-wide">
            Escríbenos y uno de nuestros especialistas se pondrá en contacto
            contigo a la brevedad.
          </p>
        </motion.div>

        {/* CONTENIDO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            grid grid-cols-1 lg:grid-cols-2
            gap-14
            bg-white dark:bg-slate-900
            border border-(--color-primary)
            rounded-2xl
            shadow-xl
            p-3 sm:p-12
          "
        >
          {/* INFO */}
          <div className="space-y-10">
            {/* TÍTULO */}
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-wide text-slate-800/70 dark:text-slate-100/90">
                Información de contacto
              </h3>

              <p className="text-slate-600/80 dark:text-slate-400 leading-relaxed max-w-md tracking-wide">
                Estamos disponibles para resolver tus dudas, cotizaciones o
                asesorías personalizadas.
              </p>
            </div>

            {/* DATOS DE CONTACTO */}
            <ul className="space-y-6 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-4">
                <span
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full
                    bg-slate-100 dark:bg-slate-800
                      text-(--color-primary)"
                >
                  ✉️
                </span>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <p className="font-medium text-slate-800/70 dark:text-slate-100/90">
                    operaciones@metalurgicajesac.com
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full
                       bg-slate-100 dark:bg-slate-800
                       text-(--color-primary)"
                >
                  ☎
                </span>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Teléfono
                  </p>
                  <p className="font-medium text-slate-800/70 dark:text-slate-100/90">
                    +51 957 033 871
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span
                  className="w-10 h-10 flex items-center justify-center rounded-full
                       bg-slate-100 dark:bg-slate-800
                       text-(--color-primary)"
                >
                  📍
                </span>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Ubicación
                  </p>
                  <p className="font-medium text-slate-800/70 dark:text-slate-100/90">
                    Juliaca, Perú
                  </p>
                </div>
              </li>
            </ul>

            {/* REDES SOCIALES */}
            <div className="pt-6 border-t border-slate-300 dark:border-slate-600">
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                Síguenos
              </p>
              <div className="flex items-center gap-4">
                {homeHeroData.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="social-btn"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FORMULARIO */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="
                    w-full px-4 py-3
                    rounded-lg
                    bg-transparent
                    border border-slate-300 dark:border-slate-600
                    focus:outline-none focus:ring-2
                    focus:ring-(--color-primary)
                    text-slate-800 dark:text-slate-100
                  "
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="
                    w-full px-4 py-3
                    rounded-lg
                    bg-transparent
                    border border-slate-300 dark:border-slate-600
                    focus:outline-none focus:ring-2
                    focus:ring-(--color-primary)
                    text-slate-800 dark:text-slate-100
                  "
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Asunto
              </label>
              <input
                type="text"
                placeholder="Asunto"
                className="
                    w-full px-4 py-3
                    rounded-lg
                    bg-transparent
                    border border-slate-300 dark:border-slate-600
                    focus:outline-none focus:ring-2
                    focus:ring-(--color-primary)
                    text-slate-800 dark:text-slate-100
                  "
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Mensaje
              </label>
              <textarea
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto..."
                className="
                  w-full px-4 py-3
                  rounded-lg
                  bg-transparent
                  border border-slate-300 dark:border-slate-600
                  focus:outline-none focus:ring-2
                  focus:ring-(--color-primary)
                  text-slate-800 dark:text-slate-100
                  resize-none
                "
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex items-center justify-center
                px-8 py-3
                rounded-full
                font-semibold tracking-wide
                bg-(--color-primary)
                text-white
                hover:opacity-90
                transition-all
                shadow-lg hover:shadow-xl
              "
            >
              Enviar mensaje
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
