import { motion } from "framer-motion";
import { slideFromLeft, slideFromRight } from "../../utils/motion";

export default function ServiceGrid({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: any[];
}) {
  return (
    <div className="space-y-12">
      {/* SUB HEADER */}
      <div className="max-w-3xl space-y-3">
        <motion.h3
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-2xl tracking-wide font-bold text-slate-700 dark:text-gray-300"
        >
          {title}
        </motion.h3>
        <motion.p
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-lg text-slate-600 tracking-wide dark:text-slate-500"
        >
          {description}
        </motion.p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item) => (
          <article
            key={item.id}
            className="
              group relative overflow-hidden
              bg-white dark:bg-slate-900
              border border-(--card-border)
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              hover:shadow-[#057EC4]/20
              dark:hover:shadow-[#38BDF8]/20
            "
          >
            {/* IMAGE */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="
                  h-full w-full object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* CONTENT */}
            <div className="relative p-6 space-y-4">
              {/* Accent line */}
              <span
                className="
                  block h-1 w-10 rounded-full
                  bg-linear-to-r
                  from-(--color-secondary)
                  to-(--color-secondary)
                "
              />

              <motion.h4
                variants={slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="font-bold text-sm uppercase tracking-wide text-(--color-primary) dark:text-[#38BDF8]"
              >
                {item.title}
              </motion.h4>

              {item.subtitle && (
                <motion.p
                  variants={slideFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className="text-slate-700 dark:text-slate-300 text-sm font-medium"
                >
                  {item.subtitle}
                </motion.p>
              )}

              {item.text && (
                <motion.p
                  variants={slideFromRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed"
                >
                  {item.text}
                </motion.p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
