import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { useEffect } from "react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <Seo
        title={mode === "login" ? "Sign in — Layer Lab" : "Create account — Layer Lab"}
        description="Sign in or create your Layer Lab account."
      />
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient text-center">
        Account
      </div>
      <h1 className="mt-3 text-center font-display text-4xl font-bold">
        {mode === "login" ? "Welcome back" : "Create account"}
      </h1>

      <button
        onClick={onGoogle}
        disabled={busy}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-smooth hover:bg-secondary disabled:opacity-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C41.3 35.7 44 30.3 44 24c0-1.3-.1-2.4-.4-3.5z"/>
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand disabled:opacity-50"
        >
          {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "login" ? "New here?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-semibold text-foreground hover:text-gradient"
        >
          {mode === "login" ? "Create account" : "Sign in"}
        </button>
      </p>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        <Link to="/">← Back to shop</Link>
      </p>
    </div>
  );
}
