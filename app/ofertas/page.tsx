import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsList from '@/components/ProductsList';

export const metadata: Metadata = {
  title: "Ofertas Especiales",
  description: "Aprovecha nuestras ofertas exclusivas en berries premium. Descuentos en frambuesas, arándanos, zarzamoras y más.",
  keywords: ["ofertas", "descuentos", "promociones", "berries", "ambato berries", "Catamarca"],
  openGraph: {
    title: "Ofertas Especiales | Ambato Berries",
    description: "Aprovecha nuestras ofertas exclusivas en berries premium. Descuentos en frambuesas, arándanos, zarzamoras y más.",
    url: "https://ambatoberries.com/ofertas",
  },
  twitter: {
    title: "Ofertas Especiales | Ambato Berries",
    description: "Aprovecha nuestras ofertas exclusivas en berries premium.",
  },
};

export default function OfertasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductsList />
    </Suspense>
  );
}
