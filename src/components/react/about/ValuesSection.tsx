import { motion } from "framer-motion";
import { startingFeatures } from "../../../constants/about.data";
import { slideFromLeft, slideFromRight } from "../../utils/motion";

export default function ValuesSection() {
  return (
    <section className="relative py-20 bg-[var(--login-bg)] dark:bg-slate-950 overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--color-primary)]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary)]/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
        {/* IZQUIERDA */}
        <motion.div
          className="flex-1 flex flex-col gap-10"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-1 w-10 bg-[var(--color-primary)] dark:bg-[var(--color-secondary)]" />
              <span className="tracking-[0.4em] uppercase font-semibold text-[var(--color-primary)] dark:text-[var(--color-secondary)]">
                Nuestros Valores
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-600 dark:text-gray-300 leading-tight">
              Principios que definen nuestra forma de trabajar
            </h2>
          </div>

          {/* Cards */}
          <div className="grid gap-6">
            {startingFeatures.map((feature, idx) => {
              const accents = [
                "from-[var(--color-primary)]/40 to-[var(--color-primary)]/15",
                "from-[var(--color-secondary)]/40 to-[var(--color-secondary)]/15",
                "from-slate-400/40 to-slate-400/15",
              ];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-6 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all"
                >
                  {/* Glow hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r blur-xl -z-10 from-[var(--color-primary)]/20 dark:to-[var(--color-secondary)]/50" />

                  <div className="flex items-start gap-5">
                    {/* Badge */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${
                        accents[idx % accents.length]
                      } flex items-center justify-center`}
                    >
                      <span className="text-lg font-bold tracking-widest text-[var(--color-primary)] dark:text-[var(--color-secondary)] opacity-60">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Texto */}
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-slate-700 dark:text-gray-300 tracking-[0.3em]">
                        {feature.title}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed tracking-wider">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* DERECHA */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          whileHover={{ y: -8 }}
        >
          <img
            src="/corporate-illustration.svg"
            alt="Valores de la empresa"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
