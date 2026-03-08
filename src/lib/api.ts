import { type Product } from "./store";

const API_BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 3600 },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    console.error(`Fetch failed: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    cache: "no-store"
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

  return res.json();
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}
