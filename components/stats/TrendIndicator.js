export default function TrendIndicator({ current, previous }) {
  if (!previous || Number(previous) === 0) return null;
  const diff = Number(current) - Number(previous);
  if (Math.abs(diff) < 0.05) return null;
  return diff > 0 ? (
    <span className="text-green-500 text-xs">▲ {diff.toFixed(1)}</span>
  ) : (
    <span className="text-red-500 text-xs">▼ {Math.abs(diff).toFixed(1)}</span>
  );
}
