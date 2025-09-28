import Link from 'next/link';
import { Suspense } from 'react';
import { SlowComponent } from '@/components/rendering-demo/SlowComponent';

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="bg-gray-100 p-4 rounded border border-gray-300 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

export default function StreamingSSRPage() {
  const pageLoadTime = new Date().toISOString();

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
          Streaming SSR デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Streaming
            SSRは、HTMLを段階的にブラウザへストリーミング配信します。React
            Suspenseを使用して、重い処理を並列化し、完了したものから順次表示します。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>TTFB:</strong> Time To First Byte
              が高速（すぐに画面表示開始）
            </li>
            <li>
              <strong>並列処理:</strong>{' '}
              複数のデータ取得を同時に実行（Suspense境界ごと）
            </li>
            <li>
              <strong>UX改善:</strong>{' '}
              ローディング状態を見せることで体感速度向上
            </li>
            <li>
              <strong>通常のSSR:</strong> 全データ取得完了まで画面真っ白 →
              3秒待つ
            </li>
            <li>
              <strong>Streaming SSR:</strong> すぐに画面表示 →
              各部分が段階的に完成
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 このページの設定:</strong> 各コンポーネントが異なる速度
            (1秒/2秒/3秒) でロードされます
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded mb-6">
          <p className="text-sm font-bold mb-1">
            ページレンダリング開始時刻（即座に表示）
          </p>
          <p className="font-mono text-xs">{pageLoadTime}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Suspense fallback={<LoadingCard label="コンポーネント1" />}>
            <SlowComponent delay={1000} label="コンポーネント1 (1秒)" color="blue" />
          </Suspense>

          <Suspense fallback={<LoadingCard label="コンポーネント2" />}>
            <SlowComponent delay={2000} label="コンポーネント2 (2秒)" color="green" />
          </Suspense>

          <Suspense fallback={<LoadingCard label="コンポーネント3" />}>
            <SlowComponent delay={3000} label="コンポーネント3 (3秒)" color="orange" />
          </Suspense>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>
              ページを開くと、すぐにヘッダーとローディング状態が表示されます（TTFB高速）
            </li>
            <li>1秒後に最初のコンポーネントが表示されます</li>
            <li>2秒後に2番目、3秒後に3番目が順次表示されます</li>
            <li>
              開発者ツールのNetworkタブで、HTMLがストリーミングされていることを確認できます
            </li>
            <li>
              通常のSSRなら3秒待ってから全て表示されますが、Streamingでは段階的に表示されます
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-red-50 p-4 rounded border border-red-200">
            <h3 className="font-bold text-red-900 mb-2">
              通常のSSR（Suspenseなし）
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto mb-2">
              {`export default async function Page() {
  const slow1 = await fetch1(); // 1秒
  const slow2 = await fetch2(); // 2秒
  const slow3 = await fetch3(); // 3秒
  // 合計6秒後に画面表示
  return <div>...</div>;
}`}
            </pre>
            <p className="text-xs text-red-700">
              ❌ 全て完了するまで画面真っ白（6秒）
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">
              Streaming SSR（推奨）
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto mb-2">
              {`export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SlowComponent1 /> {/* 1秒 */}
      </Suspense>
      {/* 並列実行される */}
    </>
  );
}`}
            </pre>
            <p className="text-xs text-green-700">
              ✅ すぐに画面表示、段階的に完成（最大3秒）
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
          <h3 className="font-bold text-purple-900 mb-2">適用例</h3>
          <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
            <li>ダッシュボード（複数のAPIを並列取得）</li>
            <li>ニュースサイト（記事リスト + おすすめ + 広告）</li>
            <li>ECサイト（商品詳細 + レビュー + 関連商品）</li>
            <li>SNS（フィード + トレンド + 通知）</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>
              Suspense境界ごとに並列実行されるため、戦略的に配置することが重要
            </li>
            <li>重要なコンテンツは上部に、重い処理は下部のSuspenseに</li>
            <li>
              ローディング状態のデザインも重要（スケルトンスクリーンを使う）
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}