import React, { useState, useRef } from "react";
import { Copy } from "../../../icons/icon";
import type { SharePlatform } from "./type";

interface CopyButtonProps {
  url: string;
  targetId: number | string;
  logShare: (platform: SharePlatform) => void;
  type?: "SERVICE" | "BLOG";
}

const CopyButton: React.FC<CopyButtonProps> = ({
  url,
  targetId,
  logShare,
  type,
}) => {
  const isService = type === "SERVICE";
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    e.preventDefault();

    navigator.clipboard.writeText(url);
    logShare("COPY");

    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  // 🔹 Tamaño dinámico
  const buttonSize = isService ? "w-5 h-5" : "w-10 h-10";
  const iconSize = isService ? "w-5 h-5" : "w-5 h-5";

  const baseClass = `
    flex items-center justify-center
    ${buttonSize}
    rounded-lg
    transition-all duration-200 ease-in-out
    hover:scale-125
    cursor-pointer
  `;

  const blogClass =
    "shadow-md hover:shadow-xl bg-gray-500 hover:bg-gray-600 text-white";

  const serviceClass =
    "text-gray-700 dark:text-gray-300";

  return (
    <div className="relative inline-block">
      <a
        href="#"
        onClick={handleClick}
        ref={buttonRef}
        className={`${baseClass} ${
          isService ? serviceClass : blogClass
        }`}
        aria-label="Copiar enlace"
      >
        <Copy className={iconSize} />
      </a>

      {showTooltip && (
        <div
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium rounded-md shadow-md pointer-events-none ${
            isService
              ? "bg-gray-800 text-white"
              : "bg-gray-900 text-white"
          }`}
          style={{ whiteSpace: "nowrap" }}
        >
          Enlace copiado
        </div>
      )}
    </div>
  );
};

export default CopyButton;
