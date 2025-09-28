import Link from 'next/link';
import { Suspense } from 'react';

async function StaticContent() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
      <h3 className="font-bold text-blue-900 mb-2">
        静的コンテンツ（ビルド時に生成）
      </h3>
      <p className="text-sm text-gray-700">
        このセクションはビルド時に生成され、全ユーザーに同じ内容が配信されます。
      </p>
      <div className="mt-4 bg-white p-3 rounded">
        <p className="text-xs text-gray-600">生成時刻（固定）:</p>
        <p className="font-mono text-sm font-bold">
          {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}

async function DynamicContent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
      <h3 className="font-bold text-green-900 mb-2">
        動的コンテンツ（リクエスト時に生成）
      </h3>
      <p className="text-sm text-gray-700">
        このセクションはリクエストごとに生成され、最新の情報が表示されます。
      </p>
      <div className="mt-4 bg-white p-3 rounded">
        <p className="text-xs text-gray-600">生成時刻（動的）:</p>
        <p className="font-mono text-sm font-bold text-green-600">
          {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}

function DynamicLoadingFallback() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="bg-white p-3 rounded">
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function PPRPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/rendering-demo"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← 戻る
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Partial Pre-Rendering (PPR) デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            PPRは、Next.js
            14で導入された次世代レンダリング手法です。1つのページ内で静的部分と動的部分を組み合わせることができます。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>静的シェル:</strong>{' '}
              ページの骨格をビルド時に生成（即座に配信）
            </li>
            <li>
              <strong>動的ホール:</strong>{' '}
              Suspense境界内をリクエスト時に生成
            </li>
            <li>
              <strong>ベストミックス:</strong> 静的の速さ +
              動的の柔軟性を両立
            </li>
            <li>
              <strong>実験的機能:</strong> Next.js 14+
              で利用可能（next.config.jsで有効化が必要）
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>⚠️ 注意:</strong> PPRは実験的機能です。
          </p>
          <p className="text-xs text-yellow-700">
            有効化するには <code>next.config.js</code> に以下を追加:
          </p>
          <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded mt-2 overflow-x-auto">
            {`module.exports = {
  experimental: {
    ppr: true,
  },
};`}
          </pre>
        </div>

        <div className="space-y-6 mb-6">
          <StaticContent />

          <Suspense fallback={<DynamicLoadingFallback />}>
            <DynamicContent />
          </Suspense>

          <StaticContent />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              ページを開くと、静的コンテンツ（青）が即座に表示されます
            </li>
            <li>
              動的コンテンツ（緑）は少し遅れて表示されます（1秒のディレイ）
            </li>
            <li>
              ページをリロードすると、静的部分の時刻は変わりませんが、動的部分は更新されます
            </li>
            <li>
              本番ビルドでは、静的部分はCDNからキャッシュ配信され、動的部分のみサーバーで生成されます
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2 text-sm">
              従来の静的レンダリング
            </h3>
            <p className="text-xs text-gray-700">
              全てが静的 → 高速だがパーソナライズ不可
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <h3 className="font-bold text-orange-900 mb-2 text-sm">
              PPR（推奨）
            </h3>
            <p className="text-xs text-gray-700">
              静的シェル + 動的ホール → 高速 & 柔軟
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-bold text-green-900 mb-2 text-sm">
              従来の動的レンダリング
            </h3>
            <p className="text-xs text-gray-700">
              全てが動的 → 柔軟だが遅い
            </p>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
          <h3 className="font-bold text-orange-900 mb-2">適用例</h3>
          <ul className="list-disc list-inside text-sm text-orange-800 space-y-1">
            <li>
              ECサイト:
              商品情報（静的）+在庫状況/カート（動的）
            </li>
            <li>
              ニュースサイト: 記事本文（静的）+
              コメント/いいね数（動的）
            </li>
            <li>
              SNS: タイムライン構造（静的）+
              投稿内容/通知（動的）
            </li>
            <li>
              ダッシュボード: レイアウト（静的）+
              ユーザーデータ（動的）
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h3 className="font-bold text-purple-900 mb-2">💡 Tips</h3>
          <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
            <li>
              PPRは「ページ全体を静的にするか動的にするか」の二択を解消する
            </li>
            <li>
              Suspense境界を戦略的に配置することで、最適なパフォーマンスを実現
            </li>
            <li>
              SEOに重要な部分は静的に、パーソナライズ部分は動的にするのが理想
            </li>
            <li>
              開発モードでは毎回レンダリングされるため、本番ビルドで真価を発揮
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}