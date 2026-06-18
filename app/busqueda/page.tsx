import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import ProductsList from '@/components/ProductsList';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q;
  
  if (typeof query === 'string' && query.trim()) {
    return {
      title: `Resultados para "${query}" | Ambato Berries`,
      description: `Busca productos como "${query}". Encuentra frambuesas, arándanos, zarzamoras y más en Ambato Berries.`,
      keywords: [query, "busqueda", "productos", "ambato berries"],
      openGraph: {
        title: `Resultados para "${query}" | Ambato Berries`,
        description: `Busca productos como "${query}". Encuentra frambuesas, arándanos, zarzamoras y más en Ambato Berries.`,
        url: `https://ambatoberries.com/busqueda?q=${encodeURIComponent(query)}`,
      },
      twitter: {
        title: `Resultados para "${query}" | Ambato Berries`,
        description: `Busca productos como "${query}". Encuentra frambuesas, arándanos, zarzamoras y más en Ambato Berries.`,
      },
    };
  }
  
  return {
    title: "Busqueda | Ambato Berries",
    description: "Busca productos en Ambato Berries. Encuentra frambuesas, arándanos, zarzamoras y más.",
  };
}

export default function BusquedaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductsList />
    </Suspense>
  );
}
