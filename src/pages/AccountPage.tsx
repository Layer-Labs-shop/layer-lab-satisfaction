import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Mail, KeyRound, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  product_id: string;
  name: string;
  image: string;
  material: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    setNewEmail(user.email ?? "");
    (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, total, status, items")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Could not load orders: " + error.message);
      } else {
        setOrders((data ?? []) as unknown as Order[]);
      }
      setLoadingOrders(false);
    })();
  }, [user]);

  if (loading || !user) return null;

  async function onUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    setSavingEmail(true);
    const { error } = await supabase.auth.updateUser(
      { email: newEmail },
      { emailRedirectTo: window.location.origin + "/account" },
    );
    setSavingEmail(false);
    if (error) toast.error(error.message);
    else toast.success("Confirmation email sent. Check your inbox to confirm the change.");
  }

  async function onUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Password updated");
      setNewPassword("");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Seo title="My account — Layer Lab" description="Manage your account, view your orders." />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">Account</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">My account</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-smooth hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
          <Package className="h-5 w-5" /> Orders
        </h2>
        <div className="mt-4 space-y-3">
          {loadingOrders ? (
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">No orders yet.</p>
              <Link to="/shop" className="mt-3 inline-block text-sm font-semibold text-gradient hover:underline">
                Browse the shop →
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize">
                      {order.status}
                    </span>
                    <span className="font-display text-lg font-bold text-gradient">
                      €{Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
                  {order.items.map((it, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2 pr-3">
                      <img src={it.image} alt={it.name} className="h-10 w-10 rounded object-cover" />
                      <div className="text-xs">
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-muted-foreground">×{it.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <form onSubmit={onUpdateEmail} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Mail className="h-4 w-4" /> Email address
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            We'll send a confirmation link to your new email.
          </p>
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={savingEmail || newEmail === user.email}
            className="mt-3 w-full rounded-full bg-gradient-brand py-2.5 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.01] glow-brand disabled:opacity-50"
          >
            {savingEmail ? "Saving..." : "Update email"}
          </button>
        </form>

        <form onSubmit={onUpdatePassword} className="rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <KeyRound className="h-4 w-4" /> Password
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">At least 6 characters.</p>
          <input
            type="password"
            required
            minLength={6}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={savingPassword || !newPassword}
            className="mt-3 w-full rounded-full bg-gradient-brand py-2.5 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.01] glow-brand disabled:opacity-50"
          >
            {savingPassword ? "Saving..." : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}
