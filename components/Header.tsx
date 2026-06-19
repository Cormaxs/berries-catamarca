'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Search, Heart, ShoppingCart, Download } from 'lucide-react';
import CatalogPDF from './CatalogPDF';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { useData } from '@/contexts/DataContext';

// Datos fallback
const fallbackProducts = [
  { id: 1, nombre: 'Frambuesas', peso: '125 gr', precio: '$2.300', oferta: '15', imagen: '/productos-destacados/frambuesas.png', categorias: 'Frambuesas', destacado: 'si', stock: 50, descripcion: 'Frutas frescas' },
  { id: 2, nombre: 'Arándanos', peso: '125 gr', precio: '$2.500', imagen: '/productos-destacados/arandanos.png', categorias: 'Arándanos', destacado: 'si', stock: 30, descripcion: 'Frutas importadas' },
  { id: 3, nombre: 'Zarzamoras', peso: '125 gr', precio: '$2.200', imagen: '/productos-destacados/zarzamoras.png', categorias: 'Zarzamoras', destacado: 'si', stock: 40, descripcion: 'Frutas orgánicas' },
  { id: 4, nombre: 'Mix de Berries', peso: '250 gr', precio: '$2.800', oferta: '10', imagen: '/productos-destacados/mix de berries.png', categorias: 'Mix de Berries', destacado: 'si', stock: 25, descripcion: 'Mix de 4 frutas' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { cartCount, favoritesCount } = useCartFavorites();
  const { products } = useData(); // Use products from DataContext instead of fetching separately
  const pathname = usePathname();
  
  const isActivePath = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };
  
  // Buscador
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(fallbackProducts.slice(0, 5));
  
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get carousel texts from .env or use defaults
  const carouselTextsEnv = process.env.NEXT_PUBLIC_HEADER_CAROUSEL_TEXTS;
  const topSlides = carouselTextsEnv 
    ? carouselTextsEnv.split(',').map(text => text.trim()).filter(text => text).slice(0, 5)
    : [
        'Envíos a todo el país',
        'Productos 100% naturales de Catamarca',
        'Atención personalizada por WhatsApp',
        'Transferencia Bancaria - 10% de descuento',
        'Compra Mayorista - Precios especiales',
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Función para normalizar texto (quitar tildes y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };
  
  // Filtrar productos (insensible a mayúsculas y tildes)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    
    const normalizedQuery = normalizeText(searchQuery);
    const filtered = products
      .filter(p => 
        normalizeText(p.nombre).includes(normalizedQuery) ||
        normalizeText(p.categorias).includes(normalizedQuery) ||
        (p.descripcion && normalizeText(p.descripcion).includes(normalizedQuery))
      )
      .slice(0, 5);
    
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Función para buscar
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/busqueda?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full">
      {/* Top Bar Carousel - Infinite Linear Scroll */}
      <div className="bg-[#8D0801] text-white py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-infinite-scroll">
          {/* Duplicate slides for infinite effect */}
          {[...topSlides, ...topSlides, ...topSlides].map((slide, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 px-6"
            >
              <span className="font-inter font-medium text-sm whitespace-nowrap">{slide}</span>
              <span className="opacity-50 whitespace-nowrap">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Header - Fixed when scrolled */}
      <div className={`bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo y Menú Hamburguesa */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image 
                  src="/logo.jpeg" 
                  alt="Ambato Berries Logo" 
                  fill 
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-poppins font-black text-xl text-[#1A1A1A]">
                  <span className="text-[#D90429]">AMBATO</span> BERRIES
                </h1>
                <p className="font-inter text-xs text-gray-600">
                  Sabores naturales de Catamarca
                </p>
              </div>
            </div>

            {/* Search Bar y Botones - Desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md" ref={searchRef}>
              <div className="relative flex-1">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#D90429] font-inter text-sm"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D90429]">
                    <Search size={18} />
                  </button>
                </form>
                
                {/* Dropdown de resultados */}
                {isSearchOpen && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    {filteredProducts.length > 0 ? (
                      <>
                        <div className="p-2">
                          {filteredProducts.map((producto) => (
                            <Link 
                              key={producto.id}
                              href={`/producto/${producto.id}`}
                              onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery('')
                              }}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="relative w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                                <Image 
                                  src={producto.imagen}
                                  alt={producto.nombre}
                                  fill
                                  className="object-contain p-1"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-poppins font-medium text-sm text-gray-800 truncate">{producto.nombre}</p>
                                <p className="font-inter text-xs text-gray-500">{producto.peso}</p>
                                <p className="font-poppins font-bold text-sm text-[#D90429]">{producto.precio}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-gray-200">
                          <Link 
                            href={`/busqueda?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-center gap-2 p-4 text-[#D90429] font-poppins font-medium hover:bg-gray-50 transition-colors"
                          >
                            <Search size={16} />
                            Ver todos los resultados
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-gray-500 text-sm">No se encontraron resultados</p>
                        <p className="text-gray-400 text-xs mt-1">Intenta con otros términos</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Botones - Desktop */}
              <div className="flex items-center gap-3">
                <button className="flex flex-col items-center text-gray-700 hover:text-[#D90429] transition-colors">
                  <span className="text-xs font-inter">Ingresar</span>
                </button>
                <Link href="/favoritos" className="flex flex-col items-center text-gray-700 hover:text-[#D90429] transition-colors relative">
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#D90429] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                  <Heart size={18} fill={favoritesCount > 0 ? "currentColor" : "none"} />
                  <span className="text-xs font-inter">Favoritos</span>
                </Link>
                <Link href="/carrito" className="flex flex-col items-center text-gray-700 hover:text-[#D90429] transition-colors relative">
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#D90429] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <ShoppingCart size={18} />
                  <span className="text-xs font-inter">Carrito</span>
                </Link>
              </div>
            </div>

            {/* Botón de Búsqueda - Mobile */}
            <div className="flex items-center gap-3 lg:hidden">
              <button 
                className="text-gray-700"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* Search Bar Desplegable - Mobile */}
          {isMobileSearchOpen && (
            <div className="mt-3" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  className="w-full pl-4 pr-24 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-[#D90429] font-inter text-sm"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="bg-[#D90429] text-white p-2 rounded-full hover:bg-[#8D0801] transition-colors"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>
              
              {/* Dropdown de resultados - Mobile */}
              {isSearchOpen && searchQuery.trim() && (
                <div className="mt-3 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  {filteredProducts.length > 0 ? (
                    <>
                      <div className="p-2">
                        {filteredProducts.map((producto) => (
                          <Link 
                            key={producto.id}
                            href={`/producto/${producto.id}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setIsMobileSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="relative w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                              <Image 
                                src={producto.imagen}
                                alt={producto.nombre}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-poppins font-medium text-sm text-gray-800 truncate">{producto.nombre}</p>
                              <p className="font-inter text-xs text-gray-500">{producto.peso}</p>
                              <p className="font-poppins font-bold text-sm text-[#D90429]">{producto.precio}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-200">
                        <Link 
                          href={`/busqueda?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setIsMobileSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-center gap-2 p-4 text-[#D90429] font-poppins font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Search size={16} />
                          Ver todos los resultados
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 text-sm">No se encontraron resultados</p>
                      <p className="text-gray-400 text-xs mt-1">Intenta con otros términos</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menú de Navegación - Desktop */}
        <div className="hidden lg:block bg-[#F4F4F4] border-t border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-8 py-2">
              <Link 
                href="/" 
                className={`font-poppins font-semibold pb-1 transition-colors ${
                  isActivePath('/') 
                    ? 'text-[#D90429] border-b-2 border-[#D90429]' 
                    : 'text-gray-700 hover:text-[#D90429]'
                }`}
              >
                Inicio
              </Link>
              <Link 
                href="/productos" 
                className={`font-poppins font-semibold pb-1 transition-colors ${
                  isActivePath('/productos') 
                    ? 'text-[#D90429] border-b-2 border-[#D90429]' 
                    : 'text-gray-700 hover:text-[#D90429]'
                }`}
              >
                Productos
              </Link>
              <Link 
                href="/ofertas" 
                className={`font-poppins font-semibold pb-1 transition-colors ${
                  isActivePath('/ofertas') 
                    ? 'text-[#D90429] border-b-2 border-[#D90429]' 
                    : 'text-gray-700 hover:text-[#D90429]'
                }`}
              >
                Ofertas
              </Link>
              <Link 
                href="/mayoristas" 
                className={`font-poppins font-semibold pb-1 transition-colors ${
                  isActivePath('/mayoristas') 
                    ? 'text-[#D90429] border-b-2 border-[#D90429]' 
                    : 'text-gray-700 hover:text-[#D90429]'
                }`}
              >
                Mayoristas
              </Link>
              <Link 
                href="/contacto" 
                className={`font-poppins font-semibold pb-1 transition-colors ${
                  isActivePath('/contacto') 
                    ? 'text-[#D90429] border-b-2 border-[#D90429]' 
                    : 'text-gray-700 hover:text-[#D90429]'
                }`}
              >
                Contacto
              </Link>
              <div className="ml-auto">
                <CatalogPDF />
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image 
                      src="/logo.jpeg" 
                      alt="Ambato Berries Logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-poppins font-black text-lg text-[#1A1A1A]">
                      <span className="text-[#D90429]">AMBATO</span> BERRIES
                    </h2>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className={`block font-poppins font-semibold py-2 transition-colors ${
                    isActivePath('/') ? 'text-[#D90429]' : 'text-gray-700 hover:text-[#D90429]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="/productos" 
                  className={`block font-poppins font-semibold py-2 transition-colors ${
                    isActivePath('/productos') ? 'text-[#D90429]' : 'text-gray-700 hover:text-[#D90429]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link 
                  href="/ofertas" 
                  className={`block font-poppins font-semibold py-2 transition-colors ${
                    isActivePath('/ofertas') ? 'text-[#D90429]' : 'text-gray-700 hover:text-[#D90429]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link 
                  href="/mayoristas" 
                  className={`block font-poppins font-semibold py-2 transition-colors ${
                    isActivePath('/mayoristas') ? 'text-[#D90429]' : 'text-gray-700 hover:text-[#D90429]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mayoristas
                </Link>
                <Link 
                  href="/contacto" 
                  className={`block font-poppins font-semibold py-2 transition-colors ${
                    isActivePath('/contacto') ? 'text-[#D90429]' : 'text-gray-700 hover:text-[#D90429]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>

              {/* Botones - Móvil */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex flex-col gap-3">
                  <div>
                    <CatalogPDF onDownload={() => setIsMobileMenuOpen(false)} />
                  </div>
                  <button className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#D90429] transition-colors">
                    <span className="font-poppins font-medium">Ingresar</span>
                  </button>
                  <Link 
                    href="/favoritos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#D90429] transition-colors"
                  >
                    <span className="font-poppins font-medium">Favoritos</span>
                    {favoritesCount > 0 && (
                      <span className="bg-[#D90429] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {favoritesCount}
                      </span>
                    )}
                  </Link>
                  <Link 
                    href="/carrito"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[#D90429] transition-colors"
                  >
                    <span className="font-poppins font-medium">Carrito</span>
                    {cartCount > 0 && (
                      <span className="bg-[#D90429] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      {isScrolled && <div className="h-[120px]" />}

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: 800%; /* 3 sets of slides */
          animation: infiniteScroll 120s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation-duration: 20s;
          }
        }
      `}</style>
    </header>
  );
}
