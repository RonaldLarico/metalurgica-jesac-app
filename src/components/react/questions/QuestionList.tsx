import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { staticQuestions } from "../../../data/data";

const QuestionList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="max-w-7xl mx-auto mt-20 mb-6 p-4">
      {/* Título con animación al aparecer en viewport */}
      <motion.h2
        className="flex justify-center text-3xl md:text-5xl font-extrabold mb-14 text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        Preguntas&nbsp;{" "}
        <span className="text-(--color-primary) dark:text-(--color-secondary)">Frecuentes</span>
      </motion.h2>

      <div className="space-y-5">
        {staticQuestions.map((q, index) => {
          const isExpanded = expandedId === q.id;

          return (
            <motion.div
              key={q.id}
              className="rounded-xl shadow-sm border border-(--color-primary)/30 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full flex justify-between items-center px-5 py-4 bg-(--color-primary)/10 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg md:text-xl cursor-pointer"
              >
                <span className="flex-1 text-left self-start">
                  {q.question}
                </span>
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 w-8 h-8 text-(--color-primary) dark:text-(--color-secondary)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden px-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 md:text-lg"
                  >
                    <div className="py-4 text-left self-start font-semibold text-gray-500 dark:text-gray-400 text-md md:text-lg leading-relaxed">
                      {q.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default QuestionList;
