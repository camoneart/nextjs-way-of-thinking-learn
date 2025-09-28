import Link from 'next/link';

export const revalidate = 30;

async function getBuildTimeData() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: { revalidate: 30 },
  });
  return res.json();
}

export default async function StaticRenderingPage() {
  const buildTime = new Date().toISOString();
  const data = await getBuildTimeData();

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
          Static Rendering (SSG/ISR) デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Static Site Generation
            (SSG)は、ビルド時にHTMLを生成し、全リクエストで同じHTMLを再利用します。Incremental
            Static Regeneration
            (ISR)を使用すると、定期的にページを再生成できます。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>SSG:</strong> ビルド時に1回だけ生成（再デプロイまで固定）
            </li>
            <li>
              <strong>ISR:</strong>{' '}
              定期的に再生成（例: 30秒ごと、1時間ごと）
            </li>
            <li>
              <strong>メリット:</strong> 最速のレスポンス、CDNキャッシュ可能
            </li>
            <li>
              <strong>デメリット:</strong> リアルタイム性が低い
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 このページの設定:</strong> ISRで30秒ごとに再生成
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
          <h3 className="font-bold text-blue-900 mb-4">生成時の情報</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-1">ページ生成時刻</p>
              <p className="font-mono text-lg font-bold">{buildTime}</p>
            </div>

            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-2">
                GitHub Next.js リポジトリ情報（30秒キャッシュ）
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
                <div>
                  <p className="text-xs text-gray-500">Watchers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {data.watchers_count?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Open Issues</p>
                  <p className="text-2xl font-bold text-red-600">
                    {data.open_issues_count?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>現在の生成時刻をメモしてください</li>
            <li>
              何度リロードしても、30秒間は同じ時刻が表示されます（静的HTML）
            </li>
            <li>30秒後にリロードすると、新しい時刻に更新されます（ISR再生成）</li>
            <li>
              開発者ツールのNetworkタブを見ると、非常に高速なレスポンスが確認できます
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">SSG（通常）</h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`export default async function Page() {
  const data = await fetch(url);
  // ビルド時に1回だけ実行
  return <div>{data}</div>;
}`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">
              再デプロイまでデータ固定
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-gray-900 mb-2">ISR（推奨）</h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
              {`// ページレベル
export const revalidate = 30;

// fetchレベル
fetch(url, {
  next: { revalidate: 30 }
});`}
            </pre>
            <p className="text-xs text-gray-600 mt-2">30秒ごとに再生成</p>
          </div>
        </div>

        <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
          <h3 className="font-bold text-green-900 mb-2">適用例</h3>
          <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
            <li>ブログ記事・ニュース記事（ISR: 1時間）</li>
            <li>商品一覧ページ（ISR: 5分）</li>
            <li>ドキュメントサイト（SSG: 再デプロイまで）</li>
            <li>ランディングページ（SSG）</li>
          </ul>
        </div>
      </div>
    </main>
  );
}