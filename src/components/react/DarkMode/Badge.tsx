// components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  imgUrl?: string;
  size?: number;          // Tamaño del badge en px
  borderColor?: string;   // Color del borde
  bgColor?: string;       // Color de fondo
  className?: string;     // Clases adicionales
}

export default function Badge({
  imgUrl,
  size = 40,
  borderColor = "rgba(5,126,196,0.3)",
  bgColor = "rgba(5,126,196,0.8)",
  className,
}: BadgeProps) {
  return (
    <div
      className={`flex items-center justify-center border p-1 ${className || ""}`}
      style={{
        width: size,
        height: size,
        borderColor,
        backgroundColor: bgColor,
        borderStyle: "solid",
      }}
    >
      <img src={imgUrl} alt="icon" className="w-3/4 h-3/4 object-contain" />
    </div>
  );
}
