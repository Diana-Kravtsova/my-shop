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

interface User {
  email: string;
  name: string;
}

interface AppState {
  favorites: number[];
  user: User | null;
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      user: null,

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
      },

      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'app-storage',
    }
  )
);
