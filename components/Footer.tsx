'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Datos fallback
const fallbackCategories = ['Frambuesas', 'Arándanos', 'Zarzamoras', 'Frutillas', 'Mix de Berries'];

export default function Footer() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  
  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/products');
        const result = await response.json();
        if (result.success && result.data.categories && result.data.categories.length > 0) {
          // Tomar las primeras 5 categorías
          const categoryNames = result.data.categories
            .slice(0, 5)
            .map((cat: any) => cat.nombre || cat.name);
          setCategories(categoryNames);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  return (
    <footer>
      {/* Footer Principal */}
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo y Descripción */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12">
                  <Image 
                    src="/logo.jpeg" 
                    alt="Ambato Berries" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-poppins font-black text-xl text-white">
                    <span className="text-[#D90429]">AMBATO</span> BERRIES
                  </h3>
                  <p className="font-inter text-xs text-gray-400">
                    Sabores naturales de Catamarca
                  </p>
                </div>
              </div>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/nosotros" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categorías */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Categorías</h4>
              <ul className="space-y-2">
                {categories.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href={`/busqueda?q=${encodeURIComponent(item)}`} 
                      className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ayuda */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Ayuda</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/productos" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link href="/ofertas" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="/mayoristas" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Mayoristas
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-400 hover:text-[#D90429] transition-colors text-sm font-inter">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto y Newsletter */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Contacto</h4>
              <ul className="space-y-2 mb-6">
                <li className="text-gray-400 text-sm font-inter">
                  543834-901162
                </li>
                <li className="text-gray-400 text-sm font-inter">
                  hola@ambatoberries.com.ar
                </li>
                <li className="text-gray-400 text-sm font-inter">
                  Ambato, Catamarca
                </li>
              </ul>

              <div className="flex gap-3 mb-6">
                {['FB', 'IG', 'TK', 'YT'].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D90429] transition-colors"
                  >
                    <span className="text-sm font-bold">{social}</span>
                  </a>
                ))}
              </div>

              <div>
                <h5 className="font-poppins font-semibold mb-4">Suscribete</h5>
                <p className="text-gray-400 text-xs mb-4">Suscribite y recibí ofertas exclusivas y novedades!</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Tu email" 
                    className="flex-1 px-4 py-2 rounded text-gray-800 text-sm"
                  />
                  <button className="bg-[#D90429] text-white px-4 py-2 rounded hover:bg-[#8D0801] transition-colors">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <div className="bg-[#0D0D0D] py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Ambato Berries | Todos los derechos reservados |  Creado por <a href='https://facstock.com ' target="_blank" rel="noopener noreferrer"> Facstock</a>
          </p>
          
        </div>
      </div>
    </footer>
  );
}
