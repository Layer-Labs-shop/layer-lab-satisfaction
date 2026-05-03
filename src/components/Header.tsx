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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setAvatarUrl(null);
      return;
    }
    // Prefer Firebase user.photoURL immediately, then refine from Firestore profile
    setAvatarUrl(user.photoURL ?? null);
    import("firebase/firestore").then(async ({ doc, getDoc }) => {
      const { db } = await import("@/lib/firebase");
      const snap = await getDoc(doc(db, "profiles", user.uid));
      if (snap.exists()) {
        const data = snap.data() as { photoURL?: string | null };
        if (data.photoURL) setAvatarUrl(data.photoURL);
      }
    }).catch(() => {});
  }, [user]);

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
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border pl-1 pr-3 text-xs font-semibold transition-smooth hover:bg-secondary md:pl-1 md:pr-4"
              title={user.email ?? "Account"}
              aria-label="Account"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Your avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                  <User className="h-4 w-4" />
                </span>
              )}
              <span className="hidden md:inline">Account</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold transition-smooth hover:bg-secondary md:px-4"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in</span>
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
