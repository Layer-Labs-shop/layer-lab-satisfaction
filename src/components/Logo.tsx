import logoImg from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Layer Lab logo"
      className={className}
      width={64}
      height={64}
    />
  );
}
