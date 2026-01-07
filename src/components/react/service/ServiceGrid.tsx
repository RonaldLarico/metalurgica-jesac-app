import { motion } from "framer-motion";
import { slideFromLeft } from "../../utils/motion";
import ServiceCard from "./ServiceCard";
import type { ServiceGridProps } from "./types";

export default function ServiceGrid({ title, description, items }: ServiceGridProps) {
  return (
    <div className="space-y-12">
      {/* SUB HEADER */}
      <div className="max-w-3xl space-y-3">
        <motion.h3
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-3xl tracking-wide font-bold text-slate-700/90 dark:text-gray-300"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-lg text-slate-800/90 tracking-wide dark:text-slate-300/90"
        >
          {description}
        </motion.p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {items.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

