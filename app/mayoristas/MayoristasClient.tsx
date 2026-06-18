'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MayoristasClient() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#D90429]">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800">Mayoristas</span>
          </div>
          </div>
          </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl text-gray-800 mb-6 text-center">
            Ventas a Mayoristas
          </h1>
          
          <p className="font-inter text-lg text-gray-600 mb-10 text-center">
            Precios especiales y condiciones exclusivas para negocios y revendedores
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Precios Especiales
              </h3>
              <p className="font-inter text-gray-600">
                Descuentos exclusivos por volumen de compra
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Envíos Gratuitos
              </h3>
              <p className="font-inter text-gray-600">
                Envío gratis desde compras mayores a cierto monto
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-poppins font-semibold text-xl text-gray-800 mb-3">
                Atención Personalizada
              </h3>
              <p className="font-inter text-gray-600">
                Asesor dedicado para atender tus necesidades
              </p>
            </div>
          </div>
          
          <div className="bg-[#F5F5F5] p-8 rounded-2xl mb-12">
            <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-6">
              ¿Cómo funciona?
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#D90429] text-white rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-800 mb-1">
                    Contáctanos
                  </h3>
                  <p className="font-inter text-gray-600">
                    Envíanos tu información y cuéntanos sobre tu negocio
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#D90429] text-white rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-800 mb-1">
                    Recibe nuestra propuesta
                  </h3>
                  <p className="font-inter text-gray-600">
                    Te enviaremos precios y condiciones según tu volumen estimado
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#D90429] text-white rounded-full flex items-center justify-center flex-shrink-0 font-poppins font-bold mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-800 mb-1">
                    Comienza a comprar
                  </h3>
                  <p className="font-inter text-gray-600">
                    Realiza tu primer pedido y disfruta de los beneficios
                  </p>
                </div>
                  </li>
                  </ol>
                  </div>
          
          <div className="bg-gradient-to-r from-[#D90429] to-[#8D0801] p-8 rounded-2xl text-white text-center">
            <h2 className="font-poppins font-bold text-2xl mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="font-inter mb-6 opacity-90">
              Contáctanos y te ayudaremos con el proceso
            </p>
            <Link 
              href="/contacto"
              className="inline-block bg-white text-[#D90429] px-8 py-4 rounded-full font-poppins font-semibold hover:bg-gray-100 transition-colors"
            >
              Contactanos Ahora
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}