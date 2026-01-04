import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

// FIX iconos Leaflet (OBLIGATORIO)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const position: [number, number] = [-15.475404, -70.1551175]; // Juliaca

export default function MapSection() {
  return (
    <section className="py-10 bg-(--login-bg) dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-1 w-10 bg-(--color-primary) dark:bg-(--color-secondary)" />
            <span className="tracking-[0.4em] uppercase font-semibold text-(--color-primary) dark:text-(--color-secondary)">
              Ubicación
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-600 dark:text-slate-300">
            Encuéntranos fácilmente
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 tracking-wide">
            Nuestra oficina se encuentra en una ubicación estratégica para
            atenderte mejor.
          </p>
        </motion.div>

        {/* MAPA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border-2 border-(--color-primary)
            shadow-xl
          "
        >
          <MapContainer
            center={position}
            zoom={15}
            scrollWheelZoom={false}
            className="h-105 w-full z-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Tooltip permanent direction="top" offset={[0, -12]} opacity={1}>
                <strong className="text-(--color-primary) text-sm">
                  Metalúrgica Jesac
                </strong>{" "}
                <br />
                Juliaca, Perú
                <br />
                <p className="text-gray-500 text-xs">Av.Sacsayhuaman 1680</p>
              </Tooltip>
            </Marker>
          </MapContainer>

          {/* Overlay UI elegante */}
          <div
            className="
            absolute inset-0 pointer-events-none
            ring-1 ring-inset ring-white/10
          "
          />
        </motion.div>
      </div>
    </section>
  );
}
