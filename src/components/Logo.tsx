import logoImg from "@/assets/logo.jpeg";

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
