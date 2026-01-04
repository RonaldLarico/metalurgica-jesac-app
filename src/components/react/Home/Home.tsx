import { motion } from "framer-motion";
import HomeSlider from "./HomeSlider";
import { homeHeroData } from "../../../constants/home.data";
import { container, item } from "../../utils/motion";

export default function Hero() {
  const { company, badge, title, description, cta, stats, socials } =
    homeHeroData;

  return (
    <section className="relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative z-10 overflow-hidden">
        {/* Glow decorativo */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(circle_at_20%_25%,rgba(5,126,196,0.35),transparent_55%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.35),transparent_60%)]
            dark:bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_10%_50%,rgba(56,189,248,0.35),transparent_60%)]
          "
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* IZQUIERDA */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="max-w-3xl"
          >
            {/* <motion.div variants={item} className="space-y-1">
              <img
                src="/images/logo-icon.png"
                alt="metalurgica-jesac"
                width={150}
                height={150}
                className="mb-2 ml-28"
              />
            </motion.div> */}
            {/* BADGE */}
            <motion.span
              variants={item}
              className="inline-block mb-10 bg-[#057ec4]/15 dark:bg-[#38bdf8]/20 px-3 py-1 text-[13px] font-semibold tracking-[0.3em] uppercase text-[#057ec4] dark:text-[#38bdf8]"
            >
              {badge}
            </motion.span>
            {/* NOMBRE DE LA EMPRESA */}
            <motion.div variants={item} className="space-y-1">
              <span className="block mb-2 mt-5 text-[14px] tracking-[0.3em] uppercase text-slate-600 dark:text-slate-300 font-bold">
                {company.tagline}
              </span>
              <h2 className="uppercase mb-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-(--color-primary) dark:text-(--color-secondary)">
                {company.name}
              </h2>
            </motion.div>
            <motion.div variants={item} className="space-y-2">
              <span className="block mb-10 text-[14px] tracking-[0.3em] uppercase text-slate-600 dark:text-slate-300 font-bold">
                {title.highlight}
              </span>
            </motion.div>

            {/* DESCRIPCIÓN */}
            <motion.p
              variants={item}
              className="text-slate-600 mb-8 dark:text-slate-300 text-lg max-w-2xl tracking-wide"
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-10 mb-4"
            >
              {cta.map((button) =>
                button.primary ? (
                  <a
                    key={button.label}
                    href={button.href}
                    className="
                      inline-flex items-center gap-2
                      bg-[#057ec4]
                      dark:bg-[#38bd]
                      px-4 py-3 text-sm font-semibold text-white shadow-lg
                      transition-all duration-300 hover:scale-105 hover:shadow-xl
                    "
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
              {/* REDES SOCIALES */}
              <div className="flex items-center gap-10">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-slate-500 dark:text-slate-400
                      hover:text-[#057ec4] dark:hover:text-[#e4e879]
                      transition
                    "
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* STATS */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-between gap-8 pt-6"
            >
              <div className="flex flex-wrap gap-8 md:gap-20">
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
              </div>
            </motion.div>
          </motion.div>

          {/* DERECHA */}
          <HomeSlider />
        </div>
        {/* LINEA ONDULADA AL FINAL */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
      <svg
        className="relative block w-full h-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60"
          fill="none"
          stroke="#057ec4"           // Aquí va el color de la línea
          strokeWidth="3"            // Grosor de la línea
          strokeLinecap="round"      // Bordes redondeados
        />
      </svg>
    </div>
      </div>
    </section>
  );
}
