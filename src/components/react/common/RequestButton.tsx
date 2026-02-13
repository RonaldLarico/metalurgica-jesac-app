import React from "react";
import { ServiceIcon } from "../../../icons/icon";

interface RequestButtonProps {
  item: {
    title: string;
  };
}

const RequestButton: React.FC<RequestButtonProps> = ({ item }) => {
  return (
    <div className="flex justify-end mt-4">
      <a
        onClick={(e) => e.stopPropagation()}
        href={`https://wa.me/+51957033871?text=Hola,%20deseo%20solicitar%20el%20servicio%20de%20${encodeURIComponent(
          item.title,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
                  inline-flex items-center gap-2 px-4 py-1.5
                  bg-(--color-primary) dark:bg-(--color-secondary)
                  text-white dark:text-slate-900/90 text-sm font-medium
                  rounded-md
                  shadow-sm
                  hover:bg-sky-600 dark:hover:bg-(--color-primary)
                  hover:text-gray-200
                  hover:shadow-lg
                  transition-all duration-300
                  hover:scale-110
                "
      >
        Solicitar servicio
        <ServiceIcon className="w-4 h-4" />
      </a>
    </div>
  );
};

export default RequestButton;
