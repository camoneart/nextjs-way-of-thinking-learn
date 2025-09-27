'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RouterCacheDemo() {
  const router = useRouter();
  const [navigations, setNavigations] = useState<
    Array<{ time: string; action: string }>
  >([]);

  const addNavigation = (action: string) => {
    setNavigations((prev) => [
      ...prev,
      { time: new Date().toLocaleTimeString(), action },
    ]);
  };

  const handlePrefetch = () => {
    router.prefetch('/cache-demo/data-cache');
    addNavigation('Prefetch実行: /cache-demo/data-cache');
  };

  const handleNavigate = () => {
    addNavigation('ナビゲーション開始: /cache-demo/data-cache');
    router.push('/cache-demo/data-cache');
  };

  const handleRefresh = () => {
    router.refresh();
    addNavigation('router.refresh()実行（キャッシュ無効化）');
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <h3 className="font-bold text-orange-900 mb-4">
          インタラクティブデモ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <button
            onClick={handlePrefetch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition"
          >
            1. Prefetch実行
          </button>
          <button
            onClick={handleNavigate}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition"
          >
            2. ページ遷移
          </button>
          <button
            onClick={handleRefresh}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition"
          >
            3. キャッシュクリア
          </button>
        </div>

        <div className="bg-white p-4 rounded">
          <h4 className="font-bold mb-2">ナビゲーション履歴</h4>
          {navigations.length === 0 ? (
            <p className="text-gray-500 text-sm">
              まだアクションがありません
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {navigations.map((nav, i) => (
                <li key={i} className="font-mono">
                  <span className="text-gray-500">[{nav.time}]</span>{' '}
                  {nav.action}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-3">操作手順</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
          <li>
            <strong>「Prefetch実行」</strong>ボタンをクリック
            → Data
            Cacheページのデータがバックグラウンドで取得され、Router
            Cacheに保存されます
          </li>
          <li>
            <strong>「ページ遷移」</strong>ボタンをクリック
            →
            すでにキャッシュされているため、瞬時にページが表示されます（ローディングなし）
          </li>
          <li>
            ブラウザの戻るボタンでこのページに戻ってくる →
            このページもRouter Cacheに保存されているため高速表示
          </li>
          <li>
            <strong>「キャッシュクリア」</strong>ボタンをクリック
            → router.refresh()でRouter Cacheが無効化されます
          </li>
        </ol>
      </div>
    </div>
  );
}