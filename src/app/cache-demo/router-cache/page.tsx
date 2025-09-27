import Link from 'next/link';
import { RouterCacheDemo } from '@/components/cache-demo/RouterCacheDemo';

export default function RouterCachePage() {
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
          Router Cache デモ
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">仕組み</h2>
          <p className="text-gray-700 mb-4">
            Router Cache（クライアント側キャッシュ）は、Next.js App
            Routerがユーザーのブラウザメモリにページセグメントを保存するメカニズムです。
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>
              <strong>スコープ:</strong>{' '}
              ユーザーセッション（ブラウザメモリ内）
            </li>
            <li>
              <strong>期間:</strong>{' '}
              30秒（動的ページ）または5分（静的ページ）
            </li>
            <li>
              <strong>メリット:</strong>{' '}
              ページ間のナビゲーションが瞬時、スムーズなUX
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>📌 実験内容:</strong>{' '}
            Prefetchとページ遷移を体験し、Router
            Cacheによる高速ナビゲーションを確認します。
          </p>
        </div>

        <RouterCacheDemo />

        <div className="bg-gray-100 rounded-lg p-4 mt-6">
          <h3 className="font-bold text-gray-900 mb-3">
            Router Cacheの特徴
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-bold text-gray-800">自動Prefetch</h4>
              <p className="text-gray-600">
                ビューポート内の{'<Link>'}
                コンポーネントは自動的にprefetchされます
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">有効期間</h4>
              <ul className="list-disc list-inside text-gray-600 ml-4">
                <li>静的ページ: 5分間</li>
                <li>動的ページ: 30秒間</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">無効化方法</h4>
              <ul className="list-disc list-inside text-gray-600 ml-4">
                <li>
                  <code className="bg-gray-800 text-green-400 px-1 rounded text-xs">
                    router.refresh()
                  </code>{' '}
                  を呼び出す
                </li>
                <li>
                  <code className="bg-gray-800 text-green-400 px-1 rounded text-xs">
                    revalidatePath()
                  </code>{' '}
                  をサーバー側で実行
                </li>
                <li>
                  <code className="bg-gray-800 text-green-400 px-1 rounded text-xs">
                    cookies.set()
                  </code>{' '}
                  または{' '}
                  <code className="bg-gray-800 text-green-400 px-1 rounded text-xs">
                    cookies.delete()
                  </code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
            <li>
              開発者ツールのNetworkタブを開いて、実際のリクエスト数を確認してみましょう
            </li>
            <li>
              Prefetch後のナビゲーションでは、ネットワークリクエストが発生しないことに注目
            </li>
            <li>
              ブラウザバックでも、Router
              Cacheにより瞬時にページが復元されます
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}