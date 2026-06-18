import type { Metadata } from 'next';
import MayoristasClient from './MayoristasClient';

export const metadata: Metadata = {
  title: "Ventas a Mayoristas",
  description: "Precios especiales y condiciones exclusivas para negocios y revendedores. Descuentos por volumen, envíos gratis y atención personalizada.",
  keywords: ["mayoristas", "precios especiales", "revendedores", "compras al por mayor", "ambato berries", "Catamarca"],
  openGraph: {
    title: "Ventas a Mayoristas | Ambato Berries",
    description: "Precios especiales y condiciones exclusivas para negocios y revendedores. Descuentos por volumen, envíos gratis y atención personalizada.",
    url: "https://ambatoberries.com/mayoristas",
  },
  twitter: {
    title: "Ventas a Mayoristas | Ambato Berries",
    description: "Precios especiales y condiciones exclusivas para negocios y revendedores.",
  },
};

export default function MayoristasPage() {
  return <MayoristasClient />;
}