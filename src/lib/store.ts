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
  favorites: number[];
  user: User | null;
  addToFavorites: (productId: number) => void;
  removeFromFavorites: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
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

      addToFavorites: productId => {
        set(state => ({
          favorites: [...state.favorites, productId],
        }));
      },

      removeFromFavorites: productId => {
        set(state => ({
          favorites: state.favorites.filter(id => id !== productId),
        }));
      },

      toggleFavorite: productId => {
        const isFav = get().favorites.includes(productId);
        if (isFav) {
          get().removeFromFavorites(productId);
        } else {
          get().addToFavorites(productId);
        }
      },

      isFavorite: productId => {
        return get().favorites.includes(productId);
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
