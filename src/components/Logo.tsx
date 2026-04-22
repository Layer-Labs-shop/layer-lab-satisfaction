import logoImg from "@/assets/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="LayerLab logo"
      className={className}
      width={64}
      height={64}
    />
  );
}
