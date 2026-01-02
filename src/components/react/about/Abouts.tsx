import { motion } from "framer-motion";
import { newFeatures, startingFeatures } from "../../../constants/about.data";
import { slideFromLeft, slideFromRight } from "../../utils/motion";
import Badge from "../DarkMode/Badge";

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="relative py-10 bg-[var(--login-bg)] dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center">
        {/* IZQUIERDA: Imagen o ilustración */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <img
            src="/corporate-illustration.svg"
            alt="Sobre Nosotros"
            className="w-80 h-auto"
          />
        </motion.div>

        {/* DERECHA: Texto principal y bloques */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          {/* Título principal */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView={["visible", "float"]}
            viewport={{ once: false, amount: 0.4 }}
            className="flex items-center gap-4"
          >
            <span className="h-1 w-10 bg-[var(--color-primary)] dark:bg-[var(--color-secondary)]" />
            <span className="tracking-[0.4em] uppercase font-semibold text-[var(--color-primary)] dark:text-[var(--color-secondary)]">
              Sobre nosotros
            </span>
          </motion.div>

          <motion.p
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed tracking-widest"
          >
            En Metalúrgica Jesac nos enfocamos en la excelencia, innovación y
            compromiso, siendo un referente en la industria metalúrgica
            nacional.
          </motion.p>

          {/* BLOQUES DE MISIÓN Y VISIÓN CON BADGES */}
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="space-y-12"
          >
            {newFeatures.map((feature, idx) => {
              const colors = [
                {
                  border: "rgba(5,126,196,0.5)",
                  bg: "rgba(5,126,196,0.5)",
                  text: "var(--color-primary)",
                },
                {
                  border: "rgba(204,211,59,0.9)",
                  bg: "rgba(204,211,59,0.6)",
                  text: "var(--color-secondary)",
                },
              ];
              const style = colors[idx % colors.length];
              return (
                <div key={feature.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    {/* Badge con colores dinámicos según modo claro/oscuro */}
                    <Badge
                      imgUrl={feature.imgUrl}
                      size={60}
                      borderColor={style.border}
                      bgColor={style.bg}
                      className="rounded-md p-3"
                    />
                    <h3
                      className="text-xl tracking-widest font-semibold"
                      style={{ color: style.text }}
                    >
                      {feature.title}
                    </h3>
                    <div
                      className="w-12 h-[2px]"
                      style={{ backgroundColor: style.border }}
                    />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 tracking-widest">
                    {feature.subtitle}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
