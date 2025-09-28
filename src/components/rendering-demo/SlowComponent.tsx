async function slowFetch(delay: number, label: string) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return {
    label,
    loadedAt: new Date().toISOString(),
    delay,
  };
}

export async function SlowComponent({
  delay,
  label,
  color = 'blue',
}: {
  delay: number;
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const data = await slowFetch(delay, label);

  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
  };

  return (
    <div className={`p-4 rounded border ${colorClasses[color]}`}>
      <h3 className="font-bold mb-2">{data.label}</h3>
      <p className="text-xs">読み込み時間: {data.delay}ms</p>
      <p className="text-xs font-mono">{data.loadedAt}</p>
    </div>
  );
}