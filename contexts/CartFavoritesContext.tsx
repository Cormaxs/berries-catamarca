'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Product = {
  id: number | string;
  nombre: string;
  precio: string;
  peso: string;
  imagen: string;
  oferta?: string;
  categorias?: string;
  descripcion?: string;
  stock?: number;
};

type CartItem = Product & {
  quantity: number;
};

type CartFavoritesContextType = {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number | string) => void;
  updateCartQuantity: (productId: number | string, quantity: number) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (productId: number | string) => boolean;
  isFavorite: (productId: number | string) => boolean;
  cartCount: number;
  favoritesCount: number;
};

const CartFavoritesContext = createContext<CartFavoritesContextType | undefined>(undefined);

export function CartFavoritesProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Cargar desde localStorage al montar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);
      
      if (isAlreadyFavorite) {
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const isInCart = (productId: number | string) => {
    return cart.some(item => item.id === productId);
  };

  const isFavorite = (productId: number | string) => {
    return favorites.some(item => item.id === productId);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <CartFavoritesContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleFavorite,
        isInCart,
        isFavorite,
        cartCount,
        favoritesCount,
      }}
    >
      {children}
    </CartFavoritesContext.Provider>
  );
}

export function useCartFavorites() {
  const context = useContext(CartFavoritesContext);
  if (context === undefined) {
    throw new Error('useCartFavorites must be used within a CartFavoritesProvider');
  }
  return context;
}
