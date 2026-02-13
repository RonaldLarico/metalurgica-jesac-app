import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Question {
  id: number;
  question: string;
  answer: string;
  blogId: number;
}

interface QuestionListProps {
  blogId: number;
}

const QuestionList: React.FC<QuestionListProps> = ({ blogId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (!blogId) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/blog/${blogId}/questions/question`);
        const data = await res.json();
        if (data.success) setQuestions(data.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, [blogId]);

  if (questions.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-4 mb-6">
      <h2 className="text-3xl font-extrabold mb-6 text-(--color-primary) dark:text-(--color-secondary)">
        Preguntas frecuentes
      </h2>

      <div className="space-y-3">
        {questions.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full flex justify-between items-center px-2 md:px-5 py-2 md:py-4 bg-gray-50 dark:bg-gray-800 font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-md md:text-xl cursor-pointer"
              >
                <span className="flex-1 text-left self-start">
                  {q.question}
                </span>
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 w-8 h-8 text-gray-800 dark:text-gray-200"
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
                    className="overflow-hidden px-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700 text-base leading-relaxed md:text-lg"
                  >
                    <div className="py-4">{q.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuestionList;
