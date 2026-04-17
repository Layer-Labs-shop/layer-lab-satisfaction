import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Layer Lab" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const shipping = total > 50 ? 0 : 6;
  const grand = total + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <h1 className="font-display text-2xl font-bold">Nothing to check out</h1>
        <Link to="/shop" className="mt-4 inline-block text-gradient hover:underline">
          Shop now
        </Link>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmation" });
    }, 900);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold md:text-5xl">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <Section title="Contact">
            <Field label="Email" type="email" name="email" required />
          </Section>

          <Section title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" required />
              <Field label="Last name" name="lastName" required />
            </div>
            <Field label="Address" name="address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" name="city" required />
              <Field label="State" name="state" required />
              <Field label="ZIP" name="zip" required />
            </div>
          </Section>

          <Section title="Payment">
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
              <Lock className="mr-1.5 inline h-3 w-3" />
              Demo checkout. Hook up Stripe in a follow-up step to accept real payments.
            </div>
            <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Expiry" name="exp" placeholder="MM/YY" />
              <Field label="CVC" name="cvc" placeholder="123" />
            </div>
          </Section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Your order</h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-primary-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{item.product.name}</div>
                    <div className="text-xs text-muted-foreground">{item.color}</div>
                  </div>
                  <div className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-semibold">Total</span>
            <span className="font-display text-xl font-bold text-gradient">${grand.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand disabled:opacity-60"
          >
            {submitting ? "Processing..." : `Pay $${grand.toFixed(2)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-lg font-bold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-smooth focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
