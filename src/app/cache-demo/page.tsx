import Link from 'next/link';

export default function CacheDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Next.js キャッシュメカニズム学習デモ
        </h1>
        <p className="text-center text-gray-600 mb-12">
          4種類のキャッシュの動作を視覚的に理解しよう
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/cache-demo/request-memoization">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-600 mb-3">
                1. Request Memoization
              </h2>
              <p className="text-gray-700 mb-4">
                同じリクエスト内で同一のfetch呼び出しを自動的にメモ化
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>スコープ: 単一のサーバーリクエスト</li>
                <li>期間: リクエスト処理中のみ</li>
                <li>自動実行（手動無効化可能）</li>
              </ul>
            </div>
          </Link>

          <Link href="/cache-demo/data-cache">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500">
              <h2 className="text-2xl font-bold text-green-600 mb-3">
                2. Data Cache
              </h2>
              <p className="text-gray-700 mb-4">
                サーバー側でfetchレスポンスを永続的にキャッシュ
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>スコープ: デプロイ全体</li>
                <li>期間: 永続的（再デプロイまで）</li>
                <li>revalidate制御可能</li>
              </ul>
            </div>
          </Link>

          <Link href="/cache-demo/full-route-cache">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500">
              <h2 className="text-2xl font-bold text-purple-600 mb-3">
                3. Full Route Cache
              </h2>
              <p className="text-gray-700 mb-4">
                ビルド時にサーバーコンポーネントをレンダリングしてキャッシュ
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>スコープ: デプロイ全体</li>
                <li>期間: ビルド後永続的</li>
                <li>静的レンダリング時に有効</li>
              </ul>
            </div>
          </Link>

          <Link href="/cache-demo/router-cache">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-500">
              <h2 className="text-2xl font-bold text-orange-600 mb-3">
                4. Router Cache
              </h2>
              <p className="text-gray-700 mb-4">
                クライアント側でページセグメントをメモリキャッシュ
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>スコープ: ユーザーセッション</li>
                <li>期間: 30秒（動的）/ 5分（静的）</li>
                <li>ナビゲーション高速化</li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            キャッシュの関係性
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Request Memoization</strong> → 最も内側、単一リクエスト内での重複排除
            </p>
            <p>
              <strong>Data Cache</strong> → サーバー側の永続キャッシュ、fetchの結果を保存
            </p>
            <p>
              <strong>Full Route Cache</strong> → ページ全体の事前レンダリング結果を保存
            </p>
            <p>
              <strong>Router Cache</strong> → 最も外側、クライアント側のナビゲーションキャッシュ
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}