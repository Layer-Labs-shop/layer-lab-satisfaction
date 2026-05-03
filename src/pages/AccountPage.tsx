import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Mail, KeyRound, LogOut, UserCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { auth, storage } from "@/lib/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarUrl = profile?.photoURL ?? user?.photoURL ?? null;

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    setNewEmail(user.email ?? "");
  }, [user]);

  // Seed local form fields from profile (no refetch on every keystroke)
  useEffect(() => {
    if (!profile) return;
    setUsername(profile.username ?? "");
    setAboutMe(profile.about ?? "");
  }, [profile?.uid]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, total, status, items")
        .order("created_at", { ascending: false });
      if (error) {
        console.warn("Orders fetch failed:", error.message);
      } else {
        setOrders((data ?? []) as unknown as Order[]);
      }
      setLoadingOrders(false);
    })();
  }, [user]);

  if (loading || !user) return null;

  async function onUpdateEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!auth.currentUser) return;
    setSavingEmail(true);
    try {
      await updateEmail(auth.currentUser, newEmail);
      await updateProfile({ email: newEmail });
      toast.success("Email updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update email");
    } finally {
      setSavingEmail(false);
    }
  }

  async function onUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    try {
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated");
      setNewPassword("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setSavingPassword(false);
    }
  }

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    try {
      await updateProfile({
        username: username.trim() || null,
        about: aboutMe.trim() || null,
      });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  }

  async function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }
    setUploadingAvatar(true);
    try {
      const path = `avatars/${user.uid}`;
      const r = storageRef(storage, path);
      await uploadBytes(r, file, { contentType: file.type });
      const url = await getDownloadURL(r);
      await updateProfile({ photoURL: url });
      toast.success("Photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingAvatar(false);
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

      <section className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
          <UserCircle className="h-5 w-5" /> Profile
        </h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Your avatar"
                className="h-28 w-28 rounded-full object-cover ring-2 ring-border"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                <UserCircle className="h-14 w-14" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onPickAvatar}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-smooth hover:bg-secondary disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploadingAvatar ? "Uploading..." : "Change photo"}
            </button>
          </div>

          <form onSubmit={onSaveProfile} className="flex-1 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Username
              </label>
              <input
                type="text"
                value={username}
                maxLength={40}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_handle"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                About me
              </label>
              <textarea
                value={aboutMe}
                maxLength={500}
                rows={4}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Tell the world a little about yourself..."
                className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="mt-1 text-right text-[11px] text-muted-foreground">
                {aboutMe.length}/500
              </div>
            </div>
            <button
              type="submit"
              disabled={savingProfile}
              className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.01] glow-brand disabled:opacity-50"
            >
              {savingProfile ? "Saving..." : "Save profile"}
            </button>
          </form>
        </div>
      </section>

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
            You may need to re-authenticate if it's been a while since you signed in.
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
