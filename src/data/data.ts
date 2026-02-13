export interface Question {
  id: number;
  question: string;
  answer: string;
}

export const staticQuestions: Question[] = [
  {
    id: 1,
    question:
      "¿Cómo adaptamos nuestros servicios a distintos tamaños de proyectos?",
    answer:
      "Nuestros procesos y recursos se ajustan según la escala del proyecto, asegurando que tanto operaciones pequeñas como grandes reciban un servicio óptimo.",
  },
  {
    id: 2,
    question: "¿Cómo realizamos la consultoría para proyectos específicos?",
    answer:
      "Ofrecemos asesoría especializada evaluando las necesidades del proyecto y recomendando procesos y tecnologías más eficientes para cada caso.",
  },
  {
    id: 3,
    question: "¿Qué tipo de informes y análisis entregamos a los clientes?",
    answer:
      "Generamos reportes detallados de resultados metalúrgicos, composición de minerales y recomendaciones de proceso, facilitando la toma de decisiones.",
  },
  {
    id: 4,
    question: "¿Cómo gestionamos el mantenimiento de los equipos metalúrgicos?",
    answer:
      "Realizamos mantenimiento preventivo y correctivo, asegurando que los equipos operen con eficiencia y minimizando tiempos de inactividad.",
  },
  {
    id: 5,
    question:
      "¿Qué iniciativas de innovación implementamos en nuestros procesos metalúrgicos?",
    answer:
      "Desarrollamos y aplicamos nuevas técnicas, tecnologías y metodologías para mejorar la eficiencia, calidad y sostenibilidad de nuestros procesos metalúrgicos.",
  },

  {
    id: 6,
    question: "¿Cómo evaluamos la sostenibilidad de nuestros procesos?",
    answer:
      "Aplicamos prácticas que optimizan recursos, reducen residuos y cumplen con normativas ambientales, fomentando operaciones responsables y sostenibles.",
  },
  {
    id: 7,
    question:
      "¿Qué niveles de personalización ofrecemos en nuestros análisis y estudios?",
    answer:
      "Adaptamos los estudios y análisis según las necesidades del cliente, considerando el tipo de mineral, el proyecto y los objetivos específicos.",
  },
  {
    id: 8,
    question:
      "¿Cómo acceden los clientes a los resultados de nuestros servicios?",
    answer:
      "Los resultados y reportes se entregan de forma clara y accesible, ya sea mediante informes digitales, reuniones técnicas o plataformas de seguimiento según el proyecto.",
  },
];
