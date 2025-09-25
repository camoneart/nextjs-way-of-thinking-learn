import { ProductContainer } from '@/components/products/ProductContainer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-12">
        <h1 className="text-3xl font-bold text-center mb-8">商品一覧</h1>
        {/* Server ComponentのContainerを配置 */}
        <ProductContainer />
      </div>
    </main>
  );
}