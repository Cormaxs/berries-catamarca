'use client';
// Catalog component - simple like the website

import { useData } from '@/contexts/DataContext';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { calculateDiscountPrice, getAbsoluteUrl } from '@/lib/utils';

// Function to preload images
const preloadImages = (urls: string[]): Promise<void> => {
  return Promise.all(
    urls.map(url => {
      return new Promise<void>((resolve) => {
        if (!url) {
          resolve();
          return;
        }
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
        // Set a timeout to resolve even if image takes too long
        setTimeout(() => resolve(), 3000);
      });
    })
  ).then(() => {});
};

interface CatalogPDFProps {
  onDownload?: () => void;
}

export default function CatalogPDF({ onDownload }: CatalogPDFProps) {
  const { products } = useData();
  const [IsClient, setIsClient] = useState(false);
  const [IsDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateAndDownloadPDF = async () => {
    if (onDownload) onDownload();
    setIsDownloading(true);

    try {
      // Preload all images first
      const imageUrls = products.map(p => getAbsoluteUrl(p.imagen)).filter(Boolean);
      await preloadImages(imageUrls);
      
      // Give extra time for images to settle
      await new Promise(resolve => setTimeout(resolve, 500));

      // Dynamically import html2pdf
      const html2pdf = (await import('html2pdf.js')).default;

      // Create HTML exactly like the website
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #D90429;">
            <h1 style="color: #D90429; margin: 0; font-size: 36px; font-weight: 700;">CATÁLOGO AMBATO BERRIES</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 18px;">Sabores naturales de Catamarca</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            ${products.map(product => {
              const discountData = calculateDiscountPrice(product.precio, product.oferta || '');
              const isOutOfStock = product.stock === 0 || (typeof product.stock === 'string' && parseInt(product.stock) === 0);
              const imageUrl = getAbsoluteUrl(product.imagen);
              
              return `
                <div style="background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid;">
                  <div style="background: #f3f4f6; height: 220px; position: relative;">
                    <img src="${imageUrl}" alt="${product.nombre}" style="
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      padding: 16px;
                    " onerror="
                      this.style.display='none';
                      this.parentElement.innerHTML='<div style=\\'font-size:60px;\\'>🍓</div>';
                    ">
                    ${isOutOfStock ? `
                      <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                        <div style="background: white; padding: 12px 24px; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                          <span style="color: #D90429; font-weight: 700; font-size: 16px;">AGOTADO</span>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                  <div style="padding: 16px;">
                    <h3 style="margin: 0; font-weight: 600; font-size: 16px; color: #1f2937;">${product.nombre}</h3>
                    <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">${product.peso}</p>
                    <div style="margin-top: 12px;">
                      ${discountData.discountedPrice ? `
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <span style="font-weight: 700; color: #D90429; font-size: 18px;">${discountData.discountedPrice}</span>
                          <span style="font-size: 14px; color: #9ca3af; text-decoration: line-through;">${discountData.originalPrice}</span>
                        </div>
                      ` : `
                        <span style="font-weight: 700; color: #D90429; font-size: 18px;">${product.precio}</span>
                      `}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 14px;">
            Contacto: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}
          </div>
        </div>
      `;

      // Simple PDF options
      const opt = {
        margin: 15,
        filename: 'catalogo-ambato-berries.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const
        },
        pagebreak: { mode: 'avoid-all' as const }
      };

      await html2pdf().set(opt).from(tempContainer).save();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un problema al generar el catálogo. Por favor intenta de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  if (!IsClient) {
    return (
      <div className="flex items-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-xl font-poppins font-semibold text-sm cursor-not-allowed">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Cargando...
      </div>
    );
  }

  return (
    <button
      onClick={generateAndDownloadPDF}
      disabled={IsDownloading}
      className={`
        inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-poppins font-bold transition-all duration-200
        ${IsDownloading 
          ? 'bg-gray-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-[#D90429] to-[#b91c1c] text-white hover:from-[#b91c1c] hover:to-[#991b1b] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
        }
      `}
    >
      {IsDownloading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Generando PDF...
        </>
      ) : (
        <>
          <Download size={20} />
          Descargar Catálogo PDF
        </>
      )}
    </button>
  );
}
