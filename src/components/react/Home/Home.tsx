import { motion, type Variants } from "framer-motion";
import HomeSlider from "./HomeSlider";
import { homeHeroData } from "../../../constants/home.data";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const { badge, title, description, cta, stats } = homeHeroData;

  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative z-10 overflow-hidden">
        {/* Glow decorativo */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(5,126,196,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.15),transparent_55%)] pointer-events-none" /> */}
        <div className="
  absolute inset-0 pointer-events-none
  bg-[radial-gradient(circle_at_20%_25%,rgba(5,126,196,0.35),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(5,126,196,0.18),transparent_60%)]
  dark:bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_10%_50%,rgba(5,126,196,0.18),transparent_60%)]
" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* IZQUIERDA */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="max-w-3xl space-y-8"
          >
            <motion.span
              variants={item}
              className="inline-block rounded-full bg-[#057ec4]/20 dark:bg-[#38bdf8]/10 px-4 py-1 text-xs font-semibold tracking-[0.3em] uppercase text-[#057ec4] dark:text-[#38bdf8]"
            >
              {badge}
            </motion.span>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              {title.normal}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#057ec4] to-[#ccd33b] dark:from-[#38bdf8] dark:to-[#e4e879]">
                {title.highlight}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl max-w-2xl"
            >
              {description}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4"
            >
              {cta.map((button) =>
                button.primary ? (
                  <a
                    key={button.label}
                    href={button.href}
                    className="relative inline-flex items-center gap-2 rounded-full 
                      bg-linear-to-r from-[#057ec4] to-[#ccd33b]
                      dark:from-[#38bdf8] dark:to-[#e4e879]
                      px-8 py-3 text-sm font-semibold text-white shadow-lg
                      transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    {button.label}
                  </a>
                ) : (
                  <a
                    key={button.label}
                    href={button.href}
                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#057ec4] dark:hover:text-[#e4e879] transition"
                  >
                    {button.label}
                  </a>
                )
              )}
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-8 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-[#057ec4] dark:text-[#38bdf8]">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* DERECHA */}
          <HomeSlider />
        </div>
      </div>
    </section>
  );
}
