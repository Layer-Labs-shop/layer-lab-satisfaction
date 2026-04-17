interface Props {
  label: string;
  value: number; // 0-10
}

export function SatisfactionMeter({ label, value }: Props) {
  const pct = (value / 10) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-xs font-bold text-foreground">{value}/10</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-brand transition-smooth"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
