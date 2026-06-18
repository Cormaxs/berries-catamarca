'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
  id: number | string;
  nombre: string;
  peso: string;
  precio: string;
  oferta?: string;
  imagen: string;
  categorias: string;
  destacado?: string;
  stock?: number;
  descripcion?: string;
}

interface DataContextType {
  products: Product[];
  categories: { name: string; image: string }[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Fallback data para mostrar instantáneamente
const fallbackData = {
  products: [],
  categories: [
    { name: 'Frambuesas', image: '/categorias/frambuesas.png' },
    { name: 'Arándanos', image: '/categorias/arandanos.png' },
    { name: 'Zarzamoras', image: '/categorias/zarzamoras.png' },
    { name: 'Frutillas', image: '/categorias/frutillas.png' },
    { name: 'Mix de Berries', image: '/categorias/miz de berries.png' },
  ],
  featuredProducts: []
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(fallbackData.products);
  const [categories, setCategories] = useState<{ name: string; image: string }[]>(fallbackData.categories);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(fallbackData.featuredProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localCache, setLocalCache] = useState<{
    products: Product[];
    categories: { name: string; image: string }[];
    featuredProducts: Product[];
    timestamp: number;
  } | null>(null);
  
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en cliente

  const loadFromLocalStorage = () => {
    try {
      const cached = localStorage.getItem('abatoberries-data');
      if (cached) {
        const parsed = JSON.parse(cached);
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_DURATION) {
          setLocalCache(parsed);
          setProducts(parsed.products);
          setCategories(parsed.categories);
          setFeaturedProducts(parsed.featuredProducts);
          return true;
        }
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return false;
  };

  const saveToLocalStorage = (data: {
    products: Product[];
    categories: { name: string; image: string }[];
    featuredProducts: Product[];
  }) => {
    try {
      const toCache = {
        ...data,
        timestamp: Date.now()
      };
      localStorage.setItem('abatoberries-data', JSON.stringify(toCache));
      setLocalCache(toCache);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const fetchData = async () => {
    try {
      setError(null);
      
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        const { products, categories, featuredProducts } = result.data;
        
        // Transformar categorías si vienen en otro formato
        const formattedCategories = categories.map((cat: any) => ({
          name: cat.nombre || cat.name,
          image: cat.imagen || cat.image
        }));
        
        setProducts(products);
        setCategories(formattedCategories);
        setFeaturedProducts(featuredProducts);
        
        // Guardar en caché local
        saveToLocalStorage({
          products,
          categories: formattedCategories,
          featuredProducts
        });
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      
      // Si hay caché local, usarla incluso si expiró
      if (localCache) {
        setProducts(localCache.products);
        setCategories(localCache.categories);
        setFeaturedProducts(localCache.featuredProducts);
      } else {
        setError(err instanceof Error ? err.message : 'Error loading data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    await fetchData();
  };

  useEffect(() => {
    // Primero intentar cargar desde localStorage para instantaneidad
    loadFromLocalStorage();
    
    // Siempre hacer fetch para actualizar datos en segundo plano
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{
      products,
      categories,
      featuredProducts,
      isLoading,
      error,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
