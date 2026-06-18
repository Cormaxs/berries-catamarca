import type { Metadata } from 'next';
import ContactoClient from './ContactoClient';

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para consultas, pedidos o mayoristas. Atención personalizada por WhatsApp, teléfono y correo. Estamos en Catamarca, Argentina.",
  keywords: ["contacto", "mayoristas", "pedidos", "consultas", "Ambato Berries", "Catamarca"],
  openGraph: {
    title: "Contacto | Ambato Berries",
    description: "Contáctanos para consultas, pedidos o mayoristas. Atención personalizada por WhatsApp, teléfono y correo.",
    url: "https://ambatoberries.com/contacto",
  },
  twitter: {
    title: "Contacto | Ambato Berries",
    description: "Contáctanos para consultas, pedidos o mayoristas. Atención personalizada.",
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}