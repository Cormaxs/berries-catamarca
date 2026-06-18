import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Inicio",
  description: "Ambato Berries: Tienda online de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
  openGraph: {
    title: "Inicio | Ambato Berries",
    description: "Ambato Berries: Tienda online de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
    url: "https://ambatoberries.com",
  },
  twitter: {
    title: "Inicio | Ambato Berries",
    description: "Ambato Berries: Tienda online de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
  },
};

export default function Home() {
  return <HomeClient />;
}