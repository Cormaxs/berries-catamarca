import type { Metadata, ResolvingMetadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { getAllDataFromSheet } from '@/lib/google-sheets';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const { products } = await getAllDataFromSheet();
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return {
        title: "Producto no encontrado",
        description: "El producto que buscas no está disponible en Ambato Berries.",
        robots: { index: false },
      };
    }
    
    const productTitle = `${product.nombre} | Ambato Berries`;
    const productDescription = product.descripcion || `Descubre ${product.nombre} - ${product.peso}. Berries premium de Catamarca, 100% naturales y frescos.`;
    
    return {
      title: productTitle,
      description: productDescription,
      keywords: [product.nombre, product.categorias, "berries", "Catamarca", "productos naturales"],
      openGraph: {
        title: productTitle,
        description: productDescription,
        images: [{ 
          url: product.imagen, 
          width: 800, 
          height: 800, 
          alt: product.nombre 
        }],
        url: `https://ambatoberries.com/producto/${id}`,
        type: "website",
        locale: "es_AR",
      },
      twitter: {
        card: "summary_large_image",
        title: productTitle,
        description: productDescription,
        images: [product.imagen],
      },
    };
  } catch (error) {
    return {
      title: "Producto | Ambato Berries",
      description: "Descubre nuestros productos de calidad premium.",
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}