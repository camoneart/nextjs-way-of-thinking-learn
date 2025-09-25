export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}