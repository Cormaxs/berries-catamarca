import type { Metadata } from 'next';
import NosotrosClient from './NosotrosClient';

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce Ambato Berries. Empresa familiar dedicada al cultivo y comercialización de berries frescos y naturales desde Catamarca con más de 10 años de experiencia.",
  keywords: ["nosotros", "Ambato Berries", "empresa familiar", "Catamarca", "productos naturales", "berries"],
  openGraph: {
    title: "Nosotros | Ambato Berries",
    description: "Conoce Ambato Berries. Empresa familiar dedicada al cultivo y comercialización de berries frescos y naturales desde Catamarca.",
    url: "https://ambatoberries.com/nosotros",
  },
  twitter: {
    title: "Nosotros | Ambato Berries",
    description: "Conoce Ambato Berries. Empresa familiar dedicada al cultivo y comercialización de berries frescos y naturales.",
  },
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}