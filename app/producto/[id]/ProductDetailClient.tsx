'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, ArrowLeft, Star, Check, Truck, Shield, Leaf, Headphones } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { useData } from '@/contexts/DataContext';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';

// Función para calcular precio con descuento
const calculateDiscountPrice = (price: string, discount: string) => {
  const priceNumber = parseInt(price.replace(/[^0-9]/g, ''));
  const discountNumber = parseInt(discount);
  
  if (isNaN(priceNumber) || isNaN(discountNumber) || discountNumber <= 0) {
    return { originalPrice: price, discountedPrice: null, discountText: null };
  }
  
  const discountAmount = Math.floor(priceNumber * (discountNumber / 100));
  const finalPrice = priceNumber - discountAmount;
  
  const formatPrice = (num: number) => {
    return '$' + num.toLocaleString('es-AR');
  };
  
  return {
    originalPrice: formatPrice(priceNumber),
    discountedPrice: formatPrice(finalPrice),
    discountText: `${discountNumber}% OFF`
  };
};

interface ProductDetailClientProps {
  id: string;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const router = useRouter();
  const productId = parseInt(id);
  
  const { products, isLoading } = useData();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleFavorite, isFavorite } = useCartFavorites();
  
  // Obtener producto y productos relacionados directamente del contexto
  const product = products.find((p: any) => parseInt(p.id) === productId);
  
  const relatedProducts = products
    .filter((p: any) => p.categorias === product?.categorias && parseInt(p.id) !== productId)
    .slice(0, 4);
  
  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <ProductGridSkeleton count={4} />
        </div>
        <Footer />
      </main>
    );
  }
  
  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-4">Producto no encontrado</h2>
            <Link href="/" className="inline-block bg-[#D90429] text-white px-6 py-3 rounded-full hover:bg-[#8D0801] transition-colors font-poppins">
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
  
  const discountData = calculateDiscountPrice(product.precio, product.oferta || '');
  const inStock = (product.stock ? Number(product.stock) : 0) > 0;
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#D90429]">Inicio</Link>
            <span>/</span>
            <Link href={`/busqueda?q=${encodeURIComponent(product.categorias)}`} className="hover:text-[#D90429] capitalize">{product.categorias}</Link>
            <span>/</span>
            <span className="text-gray-800 truncate">{product.nombre}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Producto Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Imagen */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <Image 
                src={product.imagen}
                alt={product.nombre}
                fill
                className="object-contain p-8"
                priority
              />
              {discountData.discountText && (
                <div className="absolute top-4 left-4 bg-[#D90429] text-white text-sm font-bold px-4 py-2 rounded-lg">
                  {discountData.discountText}
                </div>
              )}
            </div>
          </div>
          
          {/* Información */}
          <div className="space-y-6">
            {/* Volver */}
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-500 hover:text-[#D90429] transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-inter">Volver</span>
            </button>
            
            {/* Título y categoría */}
            <div>
              <p className="text-[#D90429] font-poppins font-medium text-sm uppercase tracking-wider mb-2">
                {product.categorias}
              </p>
              <h1 className="font-poppins font-bold text-3xl lg:text-4xl text-gray-800 mb-3">
                {product.nombre}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-inter">(4.8 · 124 opiniones)</span>
              </div>
            </div>
            
            {/* Precio */}
            <div className="flex items-baseline gap-3">
              {discountData.discountedPrice ? (
                <>
                  <span className="font-poppins font-bold text-3xl lg:text-4xl text-[#D90429]">
                    {discountData.discountedPrice}
                  </span>
                  <span className="font-poppins text-xl text-gray-400 line-through">
                    {discountData.originalPrice}
                  </span>
                </>
              ) : (
                <span className="font-poppins font-bold text-3xl lg:text-4xl text-[#D90429]">
                  {product.precio}
                </span>
              )}
            </div>
            
            {/* Stock */}
            <div className="flex items-center gap-2">
              {inStock ? (
                <>
                  <Check size={18} className="text-green-500" />
                  <span className="text-sm text-green-600 font-inter font-medium">
                    En stock
                  </span>
                </>
              ) : (
                <span className="text-sm text-red-500 font-inter font-medium">
                  Agotado temporalmente
                </span>
              )}
            </div>
            
            {/* Descripción */}
            <div>
              <p className="text-gray-600 font-inter leading-relaxed">
                {product.descripcion}
              </p>
            </div>
            
            {/* Peso */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-inter">Presentación:</span>
              <span className="font-poppins font-semibold text-gray-800">{product.peso}</span>
            </div>
            
            {/* Cantidad y botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Cantidad */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-4 py-3 font-poppins font-medium text-gray-800 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              {/* Botones */}
                    <button 
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 bg-[#D90429] text-white px-8 py-4 rounded-lg font-poppins font-semibold hover:bg-[#8D0801] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!inStock}
                    >
                      <ShoppingCart size={20} />
                      Agregar al carrito
                    </button>
                    
                    <button 
                      onClick={() => toggleFavorite(product)}
                      className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                        isFavorite(product.id) 
                          ? 'border-[#D90429] bg-[#D90429] text-white' 
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      <Heart size={20} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
                    </button>
            </div>
            
            {/* Beneficios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-sm text-gray-800">Envíos rápidos</p>
                  <p className="text-xs text-gray-500 font-inter">24-48 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-sm text-gray-800">Pago seguro</p>
                  <p className="text-xs text-gray-500 font-inter">100% protegido</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Leaf size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-sm text-gray-800">100% Natural</p>
                  <p className="text-xs text-gray-500 font-inter">Sin conservantes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Headphones size={20} className="text-red-600" />
                </div>
                <div>
                  <p className="font-poppins font-medium text-sm text-gray-800">Atención 24/7</p>
                  <p className="text-xs text-gray-500 font-inter">Estamos aquí</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Productos Relacionados */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-8">
              También te podría gustar
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
              const relatedDiscountData = calculateDiscountPrice(relatedProduct.precio, relatedProduct.oferta || '');
              
              return (
                <div 
                  key={relatedProduct.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
                >
                  <Link href={`/producto/${relatedProduct.id}`}>
                    <div className="bg-gray-100 h-56 relative">
                      <Image 
                        src={relatedProduct.imagen}
                        alt={relatedProduct.nombre}
                        fill
                        loading="lazy"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      {relatedDiscountData.discountText && (
                        <div className="absolute top-2 left-2 bg-[#D90429] text-white text-xs font-bold px-2 py-1 rounded">
                          {relatedDiscountData.discountText}
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/producto/${relatedProduct.id}`}>
                      <h3 className="font-poppins font-semibold text-sm text-gray-800 mb-1">
                        {relatedProduct.nombre}
                      </h3>
                      <p className="font-inter text-xs text-gray-500 mb-2">
                        {relatedProduct.peso}
                      </p>
                      <div className="mb-3">
                        {relatedDiscountData.discountedPrice ? (
                          <>
                            <p className="font-poppins font-bold text-[#D90429]">
                              {relatedDiscountData.discountedPrice}
                            </p>
                            <p className="font-poppins text-xs text-gray-400 line-through">
                              {relatedDiscountData.originalPrice}
                            </p>
                          </>
                        ) : (
                          <p className="font-poppins font-bold text-[#D90429]">
                            {relatedProduct.precio}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center justify-between gap-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(relatedProduct);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isFavorite(relatedProduct.id) 
                            ? 'bg-[#D90429] text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart size={18} fill={isFavorite(relatedProduct.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(relatedProduct);
                        }}
                        className="flex-1 bg-[#D90429] text-white py-2 px-3 rounded-lg font-poppins font-medium text-sm hover:bg-[#8D0801] transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}