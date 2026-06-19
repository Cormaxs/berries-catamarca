import type { Metadata } from "next";
import { Poppins, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { CartFavoritesProvider } from "@/contexts/CartFavoritesContext";
import { DataProvider } from "@/contexts/DataContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ambatoberries.com'),
  title: {
    default: "Ambato Berries - Sabores naturales de Catamarca",
    template: "%s | Ambato Berries",
  },
  description: "Descubre nuestra selección de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
  keywords: ["berries", "frambuesas", "arándanos", "zarzamoras", "Catamarca", "frutas naturales", "tienda online", "productos naturales", "mix de berries"],
  authors: [{ name: "Ambato Berries" }],
  creator: "Ambato Berries",
  publisher: "Ambato Berries",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Ambato Berries",
    title: "Ambato Berries - Sabores naturales de Catamarca",
    description: "Descubre nuestra selección de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ambato Berries - Frutas naturales de Catamarca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ambatoberries",
    creator: "@ambatoberries",
    title: "Ambato Berries - Sabores naturales de Catamarca",
    description: "Descubre nuestra selección de berries premium de Catamarca. Frambuesas, arándanos, zarzamoras, mix de berries y más. Envíos a todo el país.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${montserrat.variable} ${inter.variable} font-inter`}>
        <DataProvider>
          <CartFavoritesProvider>
            {children}
            <WhatsAppButton />
          </CartFavoritesProvider>
        </DataProvider>
      </body>
    </html>
  );
}
