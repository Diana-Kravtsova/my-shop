import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "./api";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  images?: string[];
  thumbnail?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  warrantyInformation?: string;
  availabilityStatus?: string;
}

interface User {
  username: string;
  email: string;
  name: string;
  image?: string;
}

interface AppState {
  favorites: Product[];
  user: User | null;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      user: null,

      addToFavorites: product => {
        set(state => ({
          favorites: [...state.favorites, product],
        }));
      },

      removeFromFavorites: productId => {
        set(state => ({
          favorites: state.favorites.filter(p => p.id !== productId),
        }));
      },

      toggleFavorite: product => {
        const isFav = get().favorites.some(p => p.id === product.id);
        if (isFav) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      isFavorite: productId => {
        return get().favorites.some(p => p.id === productId);
      },

      clearFavorites: () => set({ favorites: [] }),
      login: async (username, password) => {
        const userData = await loginUser({ username, password });
        set({
          user: {
            username: userData.username,
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            image: userData.image,
          },
        });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: "app-storage",
    },
  ),
);
