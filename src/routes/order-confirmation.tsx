import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [{ title: "Order confirmed — Layer Lab" }],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const orderId = "LL-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  return (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand glow-brand animate-pulse-glow">
        <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
      </div>
      <h1 className="mt-8 font-display text-3xl font-bold md:text-4xl">
        Order <span className="text-gradient">confirmed</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Thanks for your order. We're prepping it on the build plate now.
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Order ID</div>
        <div className="mt-1 font-display text-2xl font-bold">{orderId}</div>
        <p className="mt-3 text-xs text-muted-foreground">
          A receipt and tracking info will be emailed to you shortly.
        </p>
      </div>
      <Link
        to="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-smooth hover:bg-secondary"
      >
        Continue shopping
      </Link>
    </div>
  );
}
