'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NosotrosClient() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#D90429]">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800">Nosotros</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl text-gray-800 mb-6 text-center">
            Sobre Ambato Berries
          </h1>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-10">
            <p className="font-inter text-lg text-gray-700 leading-relaxed mb-6">
              Somos una empresa familiar dedicada al cultivo y comercialización de berries frescos y naturales desde Catamarca.
              Con más de 10 años de experiencia, llevamos la frescura de nuestra tierra a tu mesa.
            </p>
            <p className="font-inter text-lg text-gray-700 leading-relaxed">
              Trabajamos con productores locales seleccionados para garantizar la mejor calidad en cada uno de nuestros productos.
              Sin químicos, sin conservantes, solo la pureza y sabor de las frutas como deben ser.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <h2 className="font-poppins font-bold text-2xl text-[#D90429] mb-4">
                Nuestra Misión
              </h2>
              <p className="font-inter text-gray-700 leading-relaxed">
                Llevar productos naturales y saludables a todas las familias, promoviendo una alimentación consciente
                y apoyando a los productores locales de nuestra región.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <h2 className="font-poppins font-bold text-2xl text-green-700 mb-4">
                Nuestra Visión
              </h2>
              <p className="font-inter text-gray-700 leading-relaxed">
                Ser la empresa de berries de referencia en todo el país, reconocida por la calidad de sus productos
                y su compromiso con la sostenibilidad.
              </p>
            </div>
          </div>
          
          <h2 className="font-poppins font-bold text-3xl text-gray-800 mb-8 text-center">
            Nuestros Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Sostenibilidad
              </h3>
              <p className="font-inter text-gray-600">
                Prácticas agrícolas que respetan el medio ambiente
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Compromiso
              </h3>
              <p className="font-inter text-gray-600">
                Apoyo a las comunidades locales y productores
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Excelencia
              </h3>
              <p className="font-inter text-gray-600">
                Calidad impecable en cada producto
              </p>
            </div>
          </div>
          
          <div className="bg-[#F5F5F5] p-8 rounded-2xl text-center">
            <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-4">
              ¿Quieres ser parte de nuestra historia?
            </h2>
            <p className="font-inter text-gray-600 mb-6">
              Conoce nuestros productos y únete a la familia Ambato Berries
            </p>
            <Link 
              href="/productos"
              className="inline-block bg-[#D90429] text-white px-8 py-4 rounded-full font-poppins font-semibold hover:bg-[#8D0801] transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}