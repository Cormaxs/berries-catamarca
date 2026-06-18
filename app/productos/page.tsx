import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsList from '@/components/ProductsList';

export const metadata: Metadata = {
  title: "Todos los Productos",
  description: "Descubre nuestra selección completa de berries frescos y naturales. Frambuesas, arándanos, zarzamoras, mix de berries y más.",
  keywords: ["productos", "berries", "frambuesas", "arándanos", "zarzamoras", "ambato berries", "Catamarca"],
  openGraph: {
    title: "Todos los Productos | Ambato Berries",
    description: "Descubre nuestra selección completa de berries frescos y naturales. Frambuesas, arándanos, zarzamoras, mix de berries y más.",
    url: "https://ambatoberries.com/productos",
  },
  twitter: {
    title: "Todos los Productos | Ambato Berries",
    description: "Descubre nuestra selección completa de berries frescos y naturales.",
  },
};

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductsList />
    </Suspense>
  );
}
