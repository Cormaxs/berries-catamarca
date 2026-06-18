'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartFavorites } from '@/contexts/CartFavoritesContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
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

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useCartFavorites();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = 0;
    cart.forEach(item => {
      const discountData = calculateDiscountPrice(item.precio, item.oferta || '');
      const price = discountData.discountedPrice 
        ? parseInt(discountData.discountedPrice.replace(/[^0-9]/g, '')) 
        : parseInt(item.precio.replace(/[^0-9]/g, ''));
      newTotal += price * item.quantity;
    });
    setTotal(newTotal);
  }, [cart]);

  const formatPrice = (num: number) => {
    return '$' + num.toLocaleString('es-AR');
  };

  const generateWhatsAppMessage = () => {
    let message = 'Hola! Quiero hacer el siguiente pedido:%0A%0A';
    cart.forEach(item => {
      const discountData = calculateDiscountPrice(item.precio, item.oferta || '');
      const price = discountData.discountedPrice || item.precio;
      const productUrl = `http://localhost:3001/producto/${item.id}`;
      message += `* ${item.nombre} (${item.peso}) x${item.quantity} = ${price}%0A`;
      message += `Link: ${productUrl}%0A`;
    });
    message += `%0ATOTAL: ${formatPrice(total)}`;
    return message;
  };

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
          Carrito de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="font-poppins font-semibold text-xl text-gray-800 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="font-inter text-gray-500 mb-6">
              ¡Agrega productos para empezar!
            </p>
            <Link 
              href="/productos"
              className="inline-block bg-[#D90429] text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:bg-[#8D0801] transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => {
                const discountData = calculateDiscountPrice(item.precio, item.oferta || '');
                const price = discountData.discountedPrice || item.precio;
                const itemTotal = (discountData.discountedPrice 
                  ? parseInt(discountData.discountedPrice.replace(/[^0-9]/g, '')) * item.quantity 
                  : parseInt(item.precio.replace(/[^0-9]/g, '')) * item.quantity);

                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
                  >
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                      <Image 
                        src={item.imagen}
                        alt={item.nombre}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={`/producto/${item.id}`}
                        className="font-poppins font-semibold text-gray-800 hover:text-[#D90429]"
                      >
                        {item.nombre}
                      </Link>
                      <p className="font-inter text-xs text-gray-500 mb-2">
                        {item.peso}
                      </p>
                      <p className="font-poppins font-bold text-[#D90429] mb-3">
                        {price}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 font-poppins font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-poppins font-bold text-gray-800">
                        {formatPrice(itemTotal)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="font-poppins font-semibold text-xl text-gray-800 mb-4">
                  Resumen del Pedido
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="font-inter text-gray-600">Subtotal</span>
                  <span className="font-poppins font-bold text-gray-800">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="font-poppins font-semibold text-gray-800">Total</span>
                    <span className="font-poppins font-bold text-[#D90429] text-xl">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <a 
                    href={`https://wa.me/5493834901162?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#D90429] text-white text-center px-6 py-4 rounded-lg font-poppins font-semibold hover:bg-[#8D0801] transition-colors"
                  >
                    Hacer Pedido por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
