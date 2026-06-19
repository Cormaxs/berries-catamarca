'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Datos fallback
const fallbackCategories = ['Frambuesas', 'Arándanos', 'Zarzamoras', 'Frutillas', 'Mix de Berries'];

// Social media icons
const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const mapsLocation = process.env.NEXT_PUBLIC_MAPS_LOCATION;
  const socialFacebook = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "#";
  const socialInstagram = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "#";
  const socialTiktok = process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || "#";
  const socialYoutube = process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "#";
  
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo, Descripción y Mapa */}
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
              
              {/* Mapa */}
              {mapsLocation && (
                <div className="mt-4">
                  <iframe 
                    src={mapsLocation}
                    width="100%" 
                    height="200" 
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
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
                  54 {whatsappNumber}
                </li>
                <li className="text-gray-400 text-sm font-inter">
                  hola@ambatoberries.com.ar
                </li>
                <li className="text-gray-400 text-sm font-inter">
                  Ambato, Catamarca
                </li>
              </ul>

              <div className="flex gap-3">
                <a 
                  href={socialFacebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D90429] transition-colors"
                >
                  <FacebookIcon size={20} />
                </a>
                <a 
                  href={socialInstagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D90429] transition-colors"
                >
                  <InstagramIcon size={20} />
                </a>
                <a 
                  href={socialTiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D90429] transition-colors"
                >
                  <TikTokIcon size={20} />
                </a>
                <a 
                  href={socialYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D90429] transition-colors"
                >
                  <YoutubeIcon size={20} />
                </a>
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
