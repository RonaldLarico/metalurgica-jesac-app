import { FacebookIcon, TikTokIcon, WhatsAppIcon } from "../icons/icon";

export const homeHeroData = {

  company: {
    name: "Metalúrgica Jesac",
    tagline: "Soluciones industriales para la minería",
  },

  badge: "Ingeniería · Precisión · Calidad",

  title: {
    normal: "Soluciones integrales en",
    highlight: "Operaciones metalúrgicas y mecánicas",
  },

  description:
    "Proveedor de soluciones integrales en los servicios especializados en ingeniería metalmecánica, mantenimiento industrial y soluciones para operaciones mineras, cumpliendo los más altos estándares de calidad, seguridad y eficiencia.",

  cta: [
    {
      label: "Solicitar cotización",
      href: "/join-slack",
      primary: true,
    },
    {
      label: "Nuestros servicios",
      href: "#stats",
      primary: false,
    },
  ],

  stats: [
    {
      value: "5+ años",
      label: "de experiencia",
    },
    {
      value: "100+",
      label: "proyectos ejecutados",
    },
    {
      value: "100%",
      label: "cumplimiento operativo",
    },
  ],

  socials: [
    {
      name: "Facebook",
      href: "https://linkedin.com",
      icon: FacebookIcon, // lucide-react / heroicons / svg propio
    },
    {
      name: "WhatsApp",
      href: "https://facebook.com",
      icon: WhatsAppIcon,
    },
    {
      name: "Tiktok",
      href: "https://wa.me/51999999999",
      icon: TikTokIcon,
    },
  ],
};
