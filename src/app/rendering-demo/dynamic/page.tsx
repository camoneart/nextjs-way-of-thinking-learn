import Link from 'next/link';
import { headers, cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getDynamicData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function DynamicRenderingPage() {
  const renderTime = new Date().toISOString();
  const data = await getDynamicData();
  const headersList = await headers();
  const cookieStore = await cookies();

  const userAgent = headersList.get('user-agent') || 'Unknown';

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
          Dynamic Rendering (SSR) デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Server-Side Rendering
            (SSR)は、リクエストごとにサーバーでHTMLを生成します。常に最新のデータを取得できますが、サーバー処理時間が発生します。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>タイミング:</strong> リクエストごとにレンダリング
            </li>
            <li>
              <strong>メリット:</strong> 常に最新データ、パーソナライズ可能
            </li>
            <li>
              <strong>デメリット:</strong> レスポンスが遅い、サーバー負荷高
            </li>
            <li>
              <strong>トリガー:</strong> headers(), cookies(),
              searchParams使用時に自動的にSSRになる
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 このページの設定:</strong>{' '}
            リクエストごとにサーバーでレンダリング
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
          <h3 className="font-bold text-green-900 mb-4">
            リクエスト情報（毎回変わる）
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">レンダリング時刻</p>
              <p className="font-mono text-sm font-bold text-green-600">
                {renderTime}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ページをリロードするたびに更新されます
              </p>
            </div>

            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">User-Agent</p>
              <p className="font-mono text-xs break-all">{userAgent}</p>
            </div>

            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-2">
                GitHub Next.js リポジトリ情報（キャッシュなし）
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Stars</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {data.stargazers_count?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Forks</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {data.forks_count?.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                毎回最新のデータを取得
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>ページをリロードするたびに、レンダリング時刻が更新されます</li>
            <li>
              開発者ツールのNetworkタブを見ると、サーバー処理時間が確認できます
            </li>
            <li>
              Static
              Renderingと比較すると、レスポンスが少し遅いことが分かります
            </li>
            <li>しかし、常に最新のデータが表示されています</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">
              動的関数を使用（自動SSR）
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`import { headers } from 'next/headers';

export default async function Page() {
  const headersList = await headers();
  // 自動的にSSRになる
  return <div>...</div>;
}`}
            </pre>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">手動でSSR指定</h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`export const dynamic = 'force-dynamic';

// または
fetch(url, {
  cache: 'no-store'
});`}
            </pre>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-bold text-green-900 mb-2">適用例</h3>
          <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
            <li>ユーザー専用ダッシュボード（認証情報に基づく）</li>
            <li>検索結果ページ（クエリパラメータに基づく）</li>
            <li>リアルタイムデータ表示（株価、天気など）</li>
            <li>A/Bテスト（ユーザーごとに異なる表示）</li>
          </ul>
        </div>

        <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4">
          <h3 className="font-bold text-red-900 mb-2">注意点</h3>
          <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
            <li>サーバー負荷が高くなるため、スケーリング戦略が必要</li>
            <li>CDNキャッシュが効かないため、レスポンスが遅くなる可能性</li>
            <li>本当に必要な部分だけSSRにし、他は静的にすることを検討</li>
          </ul>
        </div>
      </div>
    </main>
  );
}