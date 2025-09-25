'use client';

import { Product, User } from '@/lib/types';
import { useState } from 'react';

interface ProductPresentationProps {
  products: Product[];
  user: User;
}

export function ProductPresentation({ products, user }: ProductPresentationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // カテゴリー一覧を取得
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // フィルタリング処理
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const stockMatch = !showOnlyInStock || product.inStock;
    return categoryMatch && stockMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ユーザー情報 */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">ログイン中:</p>
        <p className="font-semibold">{user.name}</p>
      </div>

      {/* フィルター */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全て' : category}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyInStock}
            onChange={(e) => setShowOnlyInStock(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>在庫ありのみ表示</span>
        </label>
      </div>

      {/* 商品一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* 画像プレースホルダー */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                  ¥{product.price.toLocaleString()}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    product.inStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.inStock ? '在庫あり' : '在庫なし'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          該当する商品が見つかりません
        </p>
      )}
    </div>
  );
}