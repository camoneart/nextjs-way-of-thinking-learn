import { Product, User } from './types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    price: 249900,
    description: 'M3 Pro搭載の高性能ノートパソコン',
    category: 'ノートPC',
    image: '/images/macbook.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'iPad Pro 12.9"',
    price: 172800,
    description: 'M2チップ搭載のプロフェッショナルタブレット',
    category: 'タブレット',
    image: '/images/ipad.jpg',
    inStock: true,
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 39800,
    description: 'ノイズキャンセリング搭載の完全ワイヤレスイヤホン',
    category: 'オーディオ',
    image: '/images/airpods.jpg',
    inStock: false,
  },
  {
    id: 4,
    name: 'Magic Keyboard',
    price: 13800,
    description: 'Touch ID搭載のワイヤレスキーボード',
    category: 'アクセサリ',
    image: '/images/keyboard.jpg',
    inStock: true,
  },
];

export const mockUser: User = {
  id: 1,
  name: '山田太郎',
  email: 'yamada@example.com',
  role: 'customer',
};

// データフェッチ関数（擬似的な遅延を含む）
export async function fetchProducts(): Promise<Product[]> {
  // サーバーサイドでの処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
}

export async function fetchUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockUser;
}

export async function fetchProductById(id: number): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockProducts.find((product) => product.id === id);
}