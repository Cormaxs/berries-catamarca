'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingCart, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { useData } from '@/contexts/DataContext';
import { ProductGridSkeleton } from '@/components/SkeletonLoader';

// Función para calcular precio con descuento
const calculateDiscountPrice = (price: string, discount: string) => {
  const priceNumber = parseInt(price.replace(/[^0-9]/g, ''))
  const discountNumber = parseInt(discount)
  
  if (isNaN(priceNumber) || isNaN(discountNumber) || discountNumber <= 0) {
    return { originalPrice: price, discountedPrice: null, discountText: null }
  }
  
  const discountAmount = Math.floor(priceNumber * (discountNumber / 100))
  const finalPrice = priceNumber - discountAmount
  
  const formatPrice = (num: number) => {
    return '$' + num.toLocaleString('es-AR')
  }
  
  return {
    originalPrice: formatPrice(priceNumber),
    discountedPrice: formatPrice(finalPrice),
    discountText: `${discountNumber}% OFF`
  }
}

const PRODUCTS_PER_PAGE = 8;

export default function ProductsList() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { products, isLoading } = useData();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart, toggleFavorite, isFavorite } = useCartFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtros
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [sortBy, setSortBy] = useState('mas-vendidos');
  
  // Obtener categorías únicas
  const categories = ['todas', ...new Set(products.map(p => p.categorias))];
  
  // Calcular productos de la página actual
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Función para normalizar texto (quitar tildes y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };
  
  // Determinar qué tipo de página es
  const pageType = pathname === '/ofertas' ? 'ofertas' : 
                   pathname === '/productos' ? 'productos' : 'busqueda';
  
  // Título y breadcrumb según la página
  const getPageTitle = () => {
    if (pageType === 'ofertas') return 'Ofertas Especiales';
    if (pageType === 'productos') return 'Todos los Productos';
    return `Resultados para "${query}"`;
  };
  
  const getPageSubtitle = () => {
    if (pageType === 'ofertas') return 'Aprovecha nuestros descuentos exclusivos antes de que terminen';
    if (pageType === 'productos') return 'Descubre nuestra selección completa de berries frescos y naturales';
    return '';
  };
  
  const getBreadcrumb = () => {
    if (pageType === 'ofertas') return 'Ofertas';
    if (pageType === 'productos') return 'Productos';
    return `Resultados para "${query}"`;
  };
  
  // Filtrar productos por búsqueda, categoría y ordenar
  useEffect(() => {
    let filtered = [...products];
    
    // Si es la página de ofertas, filtrar solo productos en oferta primero
    if (pageType === 'ofertas') {
      filtered = filtered.filter(p => p.oferta && parseInt(p.oferta) > 0);
    } 
    
    // Filtrar por búsqueda (solo si es la página de búsqueda)
    if (pageType === 'busqueda' && query) {
      const normalizedQuery = normalizeText(query);
      filtered = filtered.filter(p => 
        normalizeText(p.nombre).includes(normalizedQuery) ||
        normalizeText(p.categorias).includes(normalizedQuery) ||
        (p.descripcion && normalizeText(p.descripcion).includes(normalizedQuery))
      );
    }
    
    // Filtrar por categoría (todas las páginas)
    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(p => p.categorias === selectedCategory);
    }
    
    // Ordenar
    if (sortBy === 'precio-asc') {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.precio.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.precio.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'precio-desc') {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.precio.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.precio.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando cambien los filtros
  }, [query, products, selectedCategory, sortBy, pageType]);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#D90429]">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800">{getBreadcrumb()}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros - Sidebar (todas las páginas) */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-poppins font-semibold text-gray-800">Filtros</h3>
                <button 
                  className="text-sm text-[#D90429] hover:underline"
                  onClick={() => {
                    setSelectedCategory('todas');
                    setSortBy('mas-vendidos');
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
              
              {/* Categorías */}
              <div className="mb-6">
                <h4 className="font-poppins font-medium text-gray-700 mb-3">Categorías</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="text-[#D90429] focus:ring-[#D90429]"
                      />
                      <span className="text-sm text-gray-600 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Precio (placeholder para futuro) */}
              <div className="mb-6">
                <h4 className="font-poppins font-medium text-gray-700 mb-3">Precio</h4>
                <div className="text-sm text-gray-400">Próximamente</div>
              </div>
            </div>
          </aside>
          
          {/* Resultados */}
          <div className="flex-1">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="font-poppins font-bold text-2xl text-gray-800">
                  {pageType === 'busqueda' ? (
                    <>Resultados para: <span className="text-[#D90429]">&quot;{query}&quot;</span></>
                  ) : (
                    getPageTitle()
                  )}
                </h1>
                {getPageSubtitle() && (
                  <p className="text-gray-600 mt-2">{getPageSubtitle()}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {/* Ordenar */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D90429] focus:border-transparent"
                >
                  <option value="mas-vendidos">Más vendidos</option>
                  <option value="precio-asc">Precio: Menor a mayor</option>
                  <option value="precio-desc">Precio: Mayor a menor</option>
                  <option value="nombre">Nombre: A - Z</option>
                </select>
              </div>
            </div>
            
            {/* Loading */}
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="font-poppins font-semibold text-gray-700 text-xl mb-2">
                  {pageType === 'ofertas' 
                    ? 'No hay ofertas disponibles en este momento' 
                    : 'No se encontraron resultados'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {pageType === 'ofertas' 
                    ? '¡Vuelve pronto para ver nuestras nuevas promociones!' 
                    : 'Intenta con otros términos de búsqueda'}
                </p>
                <Link 
                  href="/"
                  className="inline-block bg-[#D90429] text-white px-6 py-3 rounded-full hover:bg-[#8D0801] transition-colors font-poppins"
                >
                  Volver al inicio
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((producto) => {
                    const discountData = calculateDiscountPrice(producto.precio, producto.oferta || '')
                    
                    return (
                      <div 
                        key={producto.id} 
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
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
                            {producto.descripcion && (
                              <p className="font-inter text-xs text-gray-400 mb-3 line-clamp-2">{producto.descripcion}</p>
                            )}
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
                                toggleFavorite(producto);
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
                                addToCart(producto);
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
                
                {/* Paginación */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}