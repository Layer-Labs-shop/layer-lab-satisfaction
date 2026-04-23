import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "./Logo";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: false },
  { to: "/about", label: "About", end: false },
  { to: "/contact", label: "Contact", end: false },
];

export function Header() {
  const { count } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-bold tracking-tight">
            Layer<span className="text-gradient">Lab</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-medium text-foreground"
                  : "text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-smooth hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              to="/account"
              className="hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold transition-smooth hover:bg-secondary md:inline-flex"
              title={user.email ?? "Account"}
            >
              <User className="h-4 w-4" />
              Account
            </Link>
          ) : (
            <Link
              to="/auth"
              className="hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold transition-smooth hover:bg-secondary md:inline-flex"
            >
              <User className="h-4 w-4" />
              Sign in
            </Link>
          )}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-smooth hover:bg-secondary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-3 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
