import { useState } from "react";
import CreateServiceForm from "./CreateServiceForm"; // tu componente hijo
import ServiceListView from "./ServiceListView";

type ActiveView = "view" | "create" | "update" | "delete";

export default function ServiceBadgeButtons() {
  const [active, setActive] = useState<ActiveView>("view");

  const buttons: { label: string; view: ActiveView }[] = [
    { label: "Crear", view: "create" },
    { label: "Ver", view: "view" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-2">
      {/* Barra horizontal tipo badge */}
      <div className="flex gap-2 bg-gray-100 rounded-full p-1 shadow-md overflow-hidden">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => setActive(btn.view)}
            className={`
              flex-1 flex justify-center items-center py-2
              text-xs sm:text-sm md:text-base font-medium
              rounded-full transition-colors duration-200 truncate cursor-pointer
              ${active === btn.view ? "bg-(--color-primary)/80 text-white shadow-xl" : "text-gray-600 hover:bg-gray-300"}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {active === "create" && <CreateServiceForm />}
        {active === "view" && <ServiceListView />}
      </div>
    </div>
  );
}
