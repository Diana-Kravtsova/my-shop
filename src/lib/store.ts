import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface AppState {
  favorites: number[];
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (productId) => {
        set((state) => ({
          favorites: [...state.favorites, productId]
        }));
      },

      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(id => id !== productId)
        }));
      },

      toggleFavorite: (productId) => {
        const isFav = get().favorites.includes(productId);
        if (isFav) {
          get().removeFromFavorites(productId);
        } else {
          get().addToFavorites(productId);
        }
      },

      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      }
    }),
    {
      name: 'app-storage',
    }
  )
);
