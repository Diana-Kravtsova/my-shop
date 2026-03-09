import { type Product } from "./store";

const API_BASE_URL = "https://dummyjson.com";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Login failed: ${res.status}`);
  }

  return res.json();
}

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products?limit=50`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();
  return data.products;
}

export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch products by category: ${res.status}`);
  }

  const data = await res.json();
  return data.products;
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const data = await res.json();
  return data.map((c: any) => (typeof c === "string" ? c : c.slug || c.name || String(c)));
}
