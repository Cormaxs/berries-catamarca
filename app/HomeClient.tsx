'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, ShieldCheck, Leaf, Headphones, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { useData } from '@/contexts/DataContext';
import { FeaturedProductsSkeleton, CategoriesSkeleton } from '@/components/SkeletonLoader';

const heroImages = ['/1.jpeg', '/2.jpeg', '/3.jpeg'];

const fallbackCategorias = [
  { name: 'Frambuesas', image: '/categorias/frambuesas.png' },
  { name: 'Arándanos', image: '/categorias/arandanos.png' },
  { name: 'Zarzamoras', image: '/categorias/zarzamoras.png' },
  { name: 'Frutillas', image: '/categorias/frutillas.png' },
  { name: 'Mix de Berries', image: '/categorias/miz de berries.png' },
];

const beneficios = [
  { title: 'Entrega rápida', desc: 'Envíos a todo el país en 24/48 hs', icon: Truck, color: 'bg-red-50 text-red-600' },
  { title: 'Pago seguro', desc: 'Protegemos tus pagos con tecnología segura', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600' },
  { title: 'Productos naturales', desc: 'Sin químicos ni conservantes, 100% naturales', icon: Leaf, color: 'bg-green-50 text-green-600' },
  { title: 'Atención personalizada', desc: 'Estamos para ayudarte siempre', icon: Headphones, color: 'bg-purple-50 text-purple-600' },
];

const recetas = [
  { title: 'Smoothie de Frutas Rojas', emoji: '🥤' },
  { title: 'Cheesecake de Frambuesas', emoji: '🍰' },
  { title: 'Mermelada de Frambuesa', emoji: '🫙' },
  { title: 'Yogur con Granola y Berries', emoji: '🥣' },
];

// Función para calcular precio con descuento
const calculateDiscountPrice = (price: string, discount: string) => {
  // Extraer el número del precio (ej: "$2.300" → 2300)
  const priceNumber = parseInt(price.replace(/[^0-9]/g, ''))
  const discountNumber = parseInt(discount)
  
  if (isNaN(priceNumber) || isNaN(discountNumber) || discountNumber <= 0) {
    return { originalPrice: price, discountedPrice: null, discountText: null }
  }
  
  const discountAmount = Math.floor(priceNumber * (discountNumber / 100))
  const finalPrice = priceNumber - discountAmount
  
  // Formatear los precios con puntos para miles
  const formatPrice = (num: number) => {
    return '$' + num.toLocaleString('es-AR')
  }
  
  return {
    originalPrice: formatPrice(priceNumber),
    discountedPrice: formatPrice(finalPrice),
    discountText: `${discountNumber}% OFF`
  }
}

export default function HomeClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { categories, featuredProducts, isLoading } = useData();
  const { addToCart, toggleFavorite, isFavorite, isInCart } = useCartFavorites();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Usar categorías del contexto o fallback
  const categorias = categories.length > 0 ? categories : fallbackCategorias;
  const productosDestacados = featuredProducts;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 4 segundos de pausa por slide

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Carrusel con pausa y transición rápida */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroImages.map((src, index) => (
            <div key={index} className="min-w-full relative">
              {/* Responsive Image Container - Fit completely */}
              <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center">
                <Image 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  fill 
                  className="object-contain"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Botones de navegación */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          ←
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          →
        </button>
        
        {/* Indicadores (puntitos) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#D90429] w-8' : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-6 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {beneficios.map((beneficio, index) => {
              const IconComponent = beneficio.icon;
              return (
                <div 
                  key={index} 
                  className="flex-shrink-0 flex items-center gap-3 p-4 rounded-xl bg-gray-50 min-w-[250px]"
                >
                  <div className={`w-10 h-10 rounded-xl ${beneficio.color} flex items-center justify-center flex-shrink-0`}>
                    <IconComponent size={20} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-poppins font-semibold text-sm text-[#1A1A1A]">{beneficio.title}</h4>
                    <p className="font-inter text-xs text-gray-600">{beneficio.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-2xl text-center text-[#1A1A1A] mb-8">
            Categorías
          </h2>
          {isLoading ? (
            <CategoriesSkeleton />
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categorias.map((categoria, index) => (
                <Link 
                  key={index}
                  href={`/busqueda?q=${encodeURIComponent(categoria.name)}`}
                  className="flex-shrink-0 w-36 bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <Image 
                      src={categoria.image} 
                      alt={categoria.name} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-poppins font-medium text-sm text-gray-800">
                    {categoria.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-poppins font-bold text-2xl text-[#1A1A1A]">
                Productos Destacados
              </h2>
              <p className="font-inter text-sm text-gray-500">Los favoritos de nuestros clientes</p>
            </div>
            <Link href="/productos" className="font-poppins font-semibold text-[#D90429]">
              Ver todos →
            </Link>
          </div>
          
          <div className="relative">
            {/* Botón izquierdo - visible solo en desktop */}
            <button 
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg z-10 flex items-center justify-center hover:bg-gray-100 transition-colors hidden lg:flex"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>

            {isLoading ? (
              <FeaturedProductsSkeleton />
            ) : (
              <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {productosDestacados.map((producto, index) => {
                  const productForContext = {
                    id: producto.id,
                    nombre: producto.nombre,
                    peso: producto.peso,
                    precio: producto.precio,
                    oferta: producto.oferta,
                    imagen: producto.imagen,
                  };
                  const discountData = calculateDiscountPrice(producto.precio, producto.oferta || '')
                  
                  return (
                    <div 
                      key={producto.id || index} 
                    className="flex-shrink-0 w-72 bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
                    >
                      <Link href={`/producto/${producto.id}`}>
                        <div className="bg-gray-100 h-56 relative">
                          <Image 
                            src={producto.imagen} 
                            alt={producto.nombre} 
                            fill 
                            loading="lazy"
                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                          {discountData.discountText && (
                            <div className="absolute top-2 left-2 bg-[#D90429] text-white text-xs font-bold px-2 py-1 rounded">
                              {discountData.discountText}
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/producto/${producto.id}`}>
                          <h3 className="font-poppins font-semibold text-sm">{producto.nombre}</h3>
                          <p className="font-inter text-xs text-gray-500 mb-2">{producto.peso}</p>
                          <div className="mb-3">
                            {discountData.discountedPrice ? (
                              <div className="flex items-center gap-2">
                                <p className="font-poppins font-bold text-[#D90429]">{discountData.discountedPrice}</p>
                                <p className="font-poppins text-xs text-gray-400 line-through">{discountData.originalPrice}</p>
                              </div>
                            ) : (
                              <p className="font-poppins font-bold text-[#D90429]">{producto.precio}</p>
                            )}
                          </div>
                        </Link>
                        <div className="flex items-center justify-between gap-2">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(productForContext);
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              isFavorite(producto.id) 
                                ? 'bg-[#D90429] text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Heart size={18} fill={isFavorite(producto.id) ? 'currentColor' : 'none'} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(productForContext);
                            }}
                            className="flex-1 bg-[#D90429] text-white py-2 px-3 rounded-lg font-poppins font-medium text-sm hover:bg-[#8D0801] transition-colors flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            <span>Agregar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Botón derecho - visible solo en desktop */}
            <button 
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg z-10 flex items-center justify-center hover:bg-gray-100 transition-colors hidden lg:flex"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}