import Link from 'next/link';

export const dynamic = 'force-static';

async function getStaticData() {
  return {
    buildTime: new Date().toISOString(),
    randomValue: Math.random(),
  };
}

export default async function FullRouteCachePage() {
  const data = await getStaticData();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/cache-demo"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 戻る
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Full Route Cache デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Full Route
            Cacheは、ビルド時にサーバーコンポーネントをレンダリングし、その結果（React
            Server Component Payload と
            HTML）をキャッシュします。静的レンダリング時に有効です。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>スコープ:</strong> デプロイ全体（全てのリクエスト）
            </li>
            <li>
              <strong>期間:</strong>{' '}
              ビルド後永続的（再ビルドまたはrevalidateで更新）
            </li>
            <li>
              <strong>メリット:</strong>{' '}
              サーバーレンダリングのコストゼロ、最速レスポンス
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 実験内容:</strong>{' '}
            このページは静的にレンダリングされ、ビルド時の情報が表示されます。何度リロードしても同じ値が表示されます。
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mb-6">
          <h3 className="font-bold text-purple-900 mb-4">ビルド時の情報</h3>
          <div className="bg-white p-4 rounded">
            <p className="mb-2">
              <strong>ビルド時刻:</strong>{' '}
              <span className="font-mono text-sm">{data.buildTime}</span>
            </p>
            <p>
              <strong>ランダム値:</strong>{' '}
              <span className="font-mono text-sm">{data.randomValue}</span>
            </p>
          </div>
          <p className="text-sm text-purple-700 mt-4">
            これらの値はビルド時に決定され、全てのユーザーに同じ値が表示されます。
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>ページを何度リロードしても、上記の値は変わりません</li>
            <li>
              開発モード（`npm run dev`）では毎回レンダリングされるため、値が変わります
            </li>
            <li>
              本番ビルド（`npm run build && npm start`）では、ビルド時の値が固定されます
            </li>
            <li>再ビルドすると、新しい値に更新されます</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">
              静的レンダリング（デフォルト）
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`export const dynamic = 'force-static';

// または
export default async function Page() {
  const data = await fetch(url, {
    next: { revalidate: 3600 }
  });
  // ...
}`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              ビルド時に事前レンダリング
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">動的レンダリング</h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`export const dynamic = 'force-dynamic';

// または
export default async function Page() {
  const data = await fetch(url, {
    cache: 'no-store'
  });
  // ...
}`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              リクエストごとにレンダリング
            </p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2">
            Full Route Cacheが無効になるケース
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>動的関数を使用（cookies(), headers(), searchParams など）</li>
            <li>
              <code>dynamic = 'force-dynamic'</code> を設定
            </li>
            <li>
              <code>revalidate = 0</code> を設定
            </li>
            <li>
              fetch で <code>cache: 'no-store'</code> を使用
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}