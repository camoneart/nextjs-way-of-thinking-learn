import Link from 'next/link';

async function fetchWithCache() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    next: { revalidate: 60 },
  });
  return res.json();
}

async function fetchWithoutCache() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function DataCachePage() {
  const cachedData = await fetchWithCache();
  const freshData = await fetchWithoutCache();

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
          Data Cache デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Data
            Cacheは、サーバー側でfetchの結果を永続的にキャッシュします。デフォルトではfetchの結果は無期限にキャッシュされます。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>スコープ:</strong> デプロイ全体（全てのリクエスト）
            </li>
            <li>
              <strong>期間:</strong> 永続的（revalidateで制御可能）
            </li>
            <li>
              <strong>メリット:</strong>{' '}
              外部APIへのリクエスト数を削減、レスポンス高速化
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 実験内容:</strong>{' '}
            同じGitHub
            APIを呼び出しますが、一方はキャッシュあり（60秒）、もう一方はキャッシュなしです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              キャッシュあり（60秒）
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded mb-3 overflow-x-auto">
              {`fetch(url, {
  next: { revalidate: 60 }
})`}
            </pre>
            <div className="bg-white p-3 rounded text-xs">
              <p>
                <strong>Stars:</strong> {cachedData.stargazers_count}
              </p>
              <p>
                <strong>Forks:</strong> {cachedData.forks_count}
              </p>
              <p className="text-gray-500 mt-2">
                この数値は60秒間キャッシュされます
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              キャッシュなし
            </h3>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded mb-3 overflow-x-auto">
              {`fetch(url, {
  cache: 'no-store'
})`}
            </pre>
            <div className="bg-white p-3 rounded text-xs">
              <p>
                <strong>Stars:</strong> {freshData.stargazers_count}
              </p>
              <p>
                <strong>Forks:</strong> {freshData.forks_count}
              </p>
              <p className="text-gray-500 mt-2">
                この数値は常に最新データを取得します
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>ページを何度かリロードしてみてください</li>
            <li>
              キャッシュありの方は60秒間同じ数値が表示され続けます（更新されません）
            </li>
            <li>
              キャッシュなしの方は毎回最新の数値を取得します（わずかに変わる可能性があります）
            </li>
            <li>60秒後に再度リロードすると、キャッシュありも更新されます</li>
          </ol>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2">キャッシュ制御オプション</h3>
          <div className="space-y-3 text-sm">
            <div>
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">
                {`{ cache: 'force-cache' }`}
              </code>
              <p className="text-gray-600 mt-1">デフォルト。永続的にキャッシュ</p>
            </div>
            <div>
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">
                {`{ cache: 'no-store' }`}
              </code>
              <p className="text-gray-600 mt-1">キャッシュを使用しない</p>
            </div>
            <div>
              <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">
                {`{ next: { revalidate: 60 } }`}
              </code>
              <p className="text-gray-600 mt-1">60秒ごとにキャッシュを再検証</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}