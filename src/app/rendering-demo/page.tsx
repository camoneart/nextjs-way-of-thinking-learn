import Link from 'next/link';

export default function RenderingDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Next.js レンダリング戦略学習デモ
        </h1>
        <p className="text-center text-gray-600 mb-12">
          4種類のレンダリング手法を視覚的に理解しよう
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/rendering-demo/static">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <h2 className="text-2xl font-bold text-blue-600 mb-3">
                1. Static Rendering (SSG/ISR)
              </h2>
              <p className="text-gray-700 mb-4">
                ビルド時にHTMLを生成し、全リクエストで再利用
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>タイミング: ビルド時</li>
                <li>パフォーマンス: 最速（CDNキャッシュ可能）</li>
                <li>用途: ブログ、ドキュメント、商品一覧</li>
                <li>ISR: 定期的な再検証で更新可能</li>
              </ul>
            </div>
          </Link>

          <Link href="/rendering-demo/dynamic">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-green-500">
              <h2 className="text-2xl font-bold text-green-600 mb-3">
                2. Dynamic Rendering (SSR)
              </h2>
              <p className="text-gray-700 mb-4">
                リクエストごとにサーバーでHTMLを生成
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>タイミング: リクエスト時</li>
                <li>パフォーマンス: サーバー処理時間が発生</li>
                <li>用途: ダッシュボード、ユーザー専用ページ</li>
                <li>常に最新データを表示</li>
              </ul>
            </div>
          </Link>

          <Link href="/rendering-demo/streaming">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500">
              <h2 className="text-2xl font-bold text-purple-600 mb-3">
                3. Streaming SSR
              </h2>
              <p className="text-gray-700 mb-4">
                HTMLを段階的にストリーミングして配信
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>タイミング: リクエスト時（段階的）</li>
                <li>パフォーマンス: 初期表示が高速（TTFB改善）</li>
                <li>用途: 重いデータ取得を含むページ</li>
                <li>Suspenseで部分的にローディング</li>
              </ul>
            </div>
          </Link>

          <Link href="/rendering-demo/ppr">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-500">
              <h2 className="text-2xl font-bold text-orange-600 mb-3">
                4. Partial Pre-Rendering (PPR)
              </h2>
              <p className="text-gray-700 mb-4">
                静的部分と動的部分を組み合わせた次世代レンダリング
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>タイミング: ビルド時 + リクエスト時</li>
                <li>パフォーマンス: 静的と動的の良いとこ取り</li>
                <li>用途: ECサイト、ニュースサイト</li>
                <li>実験的機能（Next.js 14+）</li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            レンダリング戦略の選択基準
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">戦略</th>
                  <th className="p-3 text-left">TTFB</th>
                  <th className="p-3 text-left">データ鮮度</th>
                  <th className="p-3 text-left">サーバー負荷</th>
                  <th className="p-3 text-left">おすすめ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-bold text-blue-600">Static</td>
                  <td className="p-3">⚡⚡⚡</td>
                  <td className="p-3">△（ISRで改善）</td>
                  <td className="p-3">最小</td>
                  <td className="p-3">マーケティングページ</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-green-600">Dynamic</td>
                  <td className="p-3">△</td>
                  <td className="p-3">⚡⚡⚡</td>
                  <td className="p-3">高い</td>
                  <td className="p-3">管理画面</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-600">Streaming</td>
                  <td className="p-3">⚡⚡</td>
                  <td className="p-3">⚡⚡⚡</td>
                  <td className="p-3">中程度</td>
                  <td className="p-3">複雑なダッシュボード</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-orange-600">PPR</td>
                  <td className="p-3">⚡⚡⚡</td>
                  <td className="p-3">⚡⚡</td>
                  <td className="p-3">低い</td>
                  <td className="p-3">Eコマース</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tips:</strong>{' '}
            それぞれのデモページで開発者ツールのNetworkタブを開き、レスポンスの違いを確認してみてください。
          </p>
        </div>
      </div>
    </main>
  );
}