import { motion } from "framer-motion";
import { miningCard, metalCard } from "../../../constants/service.data";
import ServiceGrid from "./ServiceGrid";
import { slideFromLeft } from "../../utils/motion";

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-28 bg-slate-50 dark:bg-slate-950 overflow-hidden"
    >
      {/* Decoración sutil de fondo */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(circle_at_15%_20%,rgba(5,126,196,0.2),transparent_45%)]
          dark:bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.3),transparent_45%)]
        "
      />

      <div className="relative max-w-7xl mx-auto px-4 space-y-10">
        {/* HEADER */}
        <header className="max-w-4xl space-y-6">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView={["visible", "float"]}
            viewport={{ once: false, amount: 0.4 }}
            className="flex items-center gap-4"
          >
            <span className="h-1 w-10 bg-[#057ec4]/60 dark:bg-[#38bdf8]/60" />
            <span className="tracking-[0.4em] uppercase font-semibold text-[#057ec4] dark:text-[#38bdf8]">
              Servicios
            </span>
          </motion.div>

          <motion.h2
            variants={slideFromLeft}
            initial="hidden"
            whileInView={["visible", "float"]}
            viewport={{ once: false, amount: 0.4 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-600 dark:text-gray-300"
          >
            Ingeniería y fabricación para la{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#057ec4] to-[#ccd33b] dark:from-[#38bdf8] dark:to-[#e4e879]">
                minería moderna
              </span>
            </span>
          </motion.h2>

          <motion.p
            variants={slideFromLeft}
            initial="hidden"
            whileInView={["visible", "float"]}
            viewport={{ once: false, amount: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl tracking-wider"
          >
            En{" "}
            <strong className="dark:text-(--color-secondary) text-(--color-primary)">
              Metalúrgica Jesac
            </strong>{" "}
            brindamos soluciones integrales orientadas a la{" "}
            <strong className="dark:text-(--color-secondary) text-(--color-primary)">
              industria minera,
            </strong>{" "}
            combinando experiencia técnica,{" "}
            <strong className="dark:text-(--color-secondary) text-(--color-primary)">
              ingeniería aplicada
            </strong>{" "}
            y fabricación especializada para maximizar la{" "}
            <strong className="dark:text-(--color-secondary) text-(--color-primary)">
              eficiencia operativa.
            </strong>
          </motion.p>
        </header>

        {/* SERVICIOS MINEROS */}
        <section className="space-y-14">
          <ServiceGrid
            title="Servicios para minería"
            description="Procesos metalúrgicos, plantas concentradoras y soluciones técnicas para operaciones mineras."
            items={miningCard}
          />
        </section>

        {/* DIVISOR */}
        <div className="h-1 bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* SERVICIOS METALMECÁNICOS */}
        <section className="space-y-14">
          <ServiceGrid
            title="Servicios para metalmecánica"
            description="Fabricación y soporte metalmecánico especializado como complemento estratégico para la minería."
            items={metalCard}
          />
        </section>
      </div>
    </section>
  );
}
