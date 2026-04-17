import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="font-display text-base font-bold">
                Layer<span className="text-gradient">Lab</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Precision printed. Perfectly satisfying.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="transition-smooth hover:text-foreground">All products</Link></li>
              <li><Link to="/shop" className="transition-smooth hover:text-foreground">Best sellers</Link></li>
              <li><Link to="/shop" className="transition-smooth hover:text-foreground">New arrivals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="transition-smooth hover:text-foreground">About</Link></li>
              <li><a href="#" className="transition-smooth hover:text-foreground">Sustainability</a></li>
              <li><a href="#" className="transition-smooth hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-smooth hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="transition-smooth hover:text-foreground">Returns</a></li>
              <li><a href="#" className="transition-smooth hover:text-foreground">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Layer Lab. Printed with precision.
        </div>
      </div>
    </footer>
  );
}
