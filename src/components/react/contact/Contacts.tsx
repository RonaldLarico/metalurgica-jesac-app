import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="py-28 bg-(--login-bg) dark:bg-slate-950">
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

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-600 dark:text-slate-100">
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
            bg-white dark:bg-white/5
            border border-(--color-primary)
            rounded-2xl
            shadow-xl
            p-8 sm:p-12
          "
        >
          {/* INFO */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Información de contacto
            </h3>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Estamos disponibles para resolver tus dudas, cotizaciones o
              asesorías personalizadas.
            </p>

            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Email:</strong>{" "}
                <span className="ml-2">jesac@metalurgicajesac.com</span>
              </li>
              <li>
                <strong>Teléfono:</strong>{" "}
                <span className="ml-2">+51 957 033 871</span>
              </li>
              <li>
                <strong>Ubicación:</strong>{" "}
                <span className="ml-2">Juliaca, Perú</span>
              </li>
            </ul>
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
                  placeholder="Tu nombre"
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
