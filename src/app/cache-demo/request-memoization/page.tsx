import Link from 'next/link';

async function fetchData(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/demo-data?id=${id}`, {
    cache: 'no-store',
  });
  return res.json();
}

async function DataComponent({ id }: { id: string }) {
  const data = await fetchData(id);

  return (
    <div className="bg-blue-50 p-4 rounded border border-blue-200">
      <h3 className="font-bold text-blue-900">Component {id}</h3>
      <pre className="text-xs mt-2 bg-white p-2 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default async function RequestMemoizationPage() {
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
          Request Memoization デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            同じリクエスト内で同じURLへの複数のfetch呼び出しがある場合、Next.jsは自動的に結果をメモ化します。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>スコープ:</strong> 単一のサーバーリクエスト（React
              Component Tree）
            </li>
            <li>
              <strong>期間:</strong> リクエスト処理中のみ
            </li>
            <li>
              <strong>メリット:</strong>{' '}
              複数コンポーネントで同じデータが必要な時、実際のfetchは1回だけ
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 実験内容:</strong>{' '}
            下記3つのコンポーネントは同じURLに対してfetchを実行しますが、実際のAPI呼び出しは1回だけです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DataComponent id="A" />
          <DataComponent id="A" />
          <DataComponent id="A" />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">確認方法</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>ページをリロードして、3つのコンポーネントの内容を確認</li>
            <li>
              すべてのコンポーネントが同じ `timestamp` と `callCount`
              を持っています
            </li>
            <li>
              これは、3つのfetch呼び出しが実際には1回のリクエストにメモ化されたことを示します
            </li>
          </ol>
        </div>

        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2">
            無効化する方法（参考）
          </h3>
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
            {`// React cache() を使わない独自のfetch
const data = await fetch(url, {
  cache: 'no-store',
  next: { revalidate: 0 }
});`}
          </pre>
        </div>
      </div>
    </main>
  );
}