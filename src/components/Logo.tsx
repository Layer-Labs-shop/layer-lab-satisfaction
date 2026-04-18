import logoImg from "@/assets/logo.jpeg";

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
