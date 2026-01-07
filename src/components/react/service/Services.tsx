import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideFromLeft } from "../../utils/motion";
import ServiceGrid from "./ServiceGrid";

interface ServiceItem {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  subtitles: { id: number; text: string }[];
  images: { id: number; url: string }[];
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: "mineria", title: "Servicios para minería", description: "Procesos metalúrgicos, plantas concentradoras y soluciones técnicas para operaciones mineras." },
    { key: "metalmecanica", title: "Servicios para metalmecánica", description: "Fabricación y soporte metalmecánico especializado como complemento estratégico para la minería." },
    { key: "otros", title: "Servicios en general", description: "Servicios complementarios y especializados que apoyan a diferentes industrias." }
  ];

  useEffect(() => {
    fetch("/api/services/list-public")
      .then(res => res.json())
      .then((data: ServiceItem[]) => setServices(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Cargando servicios...</p>;

  return (
    <section id="services" className="relative py-28 overflow-hidden">
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#057ec4] to-[#ccd33b]">
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

        {/* SERVICES BY CATEGORY */}
        {categories.map((cat, index) => (
          <section key={index} className="space-y-14 text-4xl">
            <ServiceGrid
              title={cat.title}
              description={cat.description}
              items={services.filter(s => s.category?.toLowerCase() === cat.key.toLowerCase())}
            />
          </section>
        ))}
      </div>
    </section>
  );
}
