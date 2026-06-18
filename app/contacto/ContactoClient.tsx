'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactoClient() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#D90429]">Inicio</Link>
            <span>/</span>
            <span className="text-gray-800">Contacto</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl text-gray-800 mb-6 text-center">
            Contáctanos
          </h1>
          
          <p className="font-inter text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos por cualquier consulta que tengas.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#D90429]" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                      Ubicación
                    </h3>
                    <p className="font-inter text-sm text-gray-600">
                      Catamarca, Argentina
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                      Teléfono
                    </h3>
                    <p className="font-inter text-sm text-gray-600">
                      +54 3834 901162
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                      Email
                    </h3>
                    <p className="font-inter text-sm text-gray-600">
                      info@amatoberries.com
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-800 mb-2">
                      Horarios
                    </h3>
                    <p className="font-inter text-sm text-gray-600">
                      Lun - Vie: 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#D90429] to-[#8D0801] p-8 rounded-2xl text-white">
                <h3 className="font-poppins font-bold text-2xl mb-4">
                  ¡También por WhatsApp!
                </h3>
                <p className="font-inter mb-6 opacity-90">
                  Escribe directamente para una atención más rápida
                </p>
                <a 
                  href="https://wa.me/5493834901162" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#D90429] px-8 py-4 rounded-full font-poppins font-semibold hover:bg-gray-100 transition-colors"
                >
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="font-poppins font-bold text-2xl text-gray-800 mb-6">
                Envíanos un mensaje
              </h3>
              
              {submitted ? (
                <div className="bg-green-100 text-green-800 p-6 rounded-xl text-center">
                  <h4 className="font-poppins font-semibold text-xl mb-2">
                    ¡Mensaje enviado!
                  </h4>
                  <p className="font-inter">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block font-poppins font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D90429] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block font-poppins font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D90429] focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block font-poppins font-medium text-gray-700 mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D90429] focus:border-transparent"
                      placeholder="+54 3834 901162"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block font-poppins font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D90429] focus:border-transparent resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#D90429] text-white px-8 py-4 rounded-lg font-poppins font-semibold hover:bg-[#8D0801] transition-colors"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}