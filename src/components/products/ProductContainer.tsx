import { fetchProducts, fetchUser } from '@/lib/mock-data';
import { ProductPresentation } from './ProductPresentation';

export async function ProductContainer() {
  // サーバーサイドでデータフェッチ（並行実行）
  const [products, user] = await Promise.all([
    fetchProducts(),
    fetchUser(),
  ]);

  // フェッチしたデータをPresentational Componentに渡す
  return <ProductPresentation products={products} user={user} />;
}