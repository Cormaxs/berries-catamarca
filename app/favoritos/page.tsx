'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function FavoritesPage() {
  const { favorites, addToCart, toggleFavorite } = useCartFavorites();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-[#D90429] mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-inter">Volver</span>
        </button>

        <h1 className="font-poppins font-bold text-3xl text-gray-800 mb-8">
          Mis Favoritos
        </h1>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="font-poppins font-semibold text-xl text-gray-800 mb-2">
              No tienes favoritos aún
            </h2>
            <p className="font-inter text-gray-500 mb-6">
              ¡Agrega productos a tus favoritos!
            </p>
            <Link 
              href="/productos"
              className="inline-block bg-[#D90429] text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-[#8D0801] transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(product => {
              const discountData = calculateDiscountPrice(product.precio, product.oferta || '');
              
              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all group"
                >
                  <Link href={`/producto/${product.id}`} className="block">
                    <div className="bg-gray-100 h-56 relative">
                      <Image 
                        src={product.imagen}
                        alt={product.nombre}
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
                    <Link href={`/producto/${product.id}`} className="block">
                      <h3 className="font-poppins font-semibold text-sm text-gray-800 mb-1">
                        {product.nombre}
                      </h3>
                      <p className="font-inter text-xs text-gray-500 mb-2">
                        {product.peso}
                      </p>
                      <div className="mb-3">
                        {discountData.discountedPrice ? (
                          <div className="flex items-center gap-2">
                            <p className="font-poppins font-bold text-[#D90429]">
                              {discountData.discountedPrice}
                            </p>
                            <p className="font-poppins text-xs text-gray-400 line-through">
                              {discountData.originalPrice}
                            </p>
                          </div>
                        ) : (
                          <p className="font-poppins font-bold text-[#D90429]">
                            {product.precio}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center justify-between gap-2">
                      <button 
                        onClick={() => toggleFavorite(product)}
                        className="p-4 border border-[#D90429] rounded-lg bg-[#D90429] text-white hover:bg-[#8D0801] transition-colors"
                      >
                        <Heart size={20} fill="currentColor" />
                      </button>
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-[#D90429] text-white px-3 py-2 rounded-lg font-poppins font-medium text-sm hover:bg-[#8D0801] transition-colors flex items-center justify-center gap-2"
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
        )}
      </div>
      
      <Footer />
    </main>
  );
}
