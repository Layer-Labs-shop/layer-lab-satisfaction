export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ll-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.7 0.2 240)" />
          <stop offset="1" stopColor="oklch(0.6 0.25 295)" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="3" rx="1.5" fill="url(#ll-grad)" />
      <rect x="4" y="11" width="24" height="3" rx="1.5" fill="url(#ll-grad)" opacity="0.75" />
      <rect x="4" y="16" width="24" height="3" rx="1.5" fill="url(#ll-grad)" opacity="0.5" />
      <rect x="4" y="21" width="24" height="3" rx="1.5" fill="url(#ll-grad)" opacity="0.3" />
    </svg>
  );
}
