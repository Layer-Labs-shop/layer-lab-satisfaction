import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — Layer Lab" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand-soft">
          <ShoppingBag className="h-7 w-7 text-gradient" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Time to find something satisfying.</p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-105 glow-brand"
        >
          Shop now
        </Link>
      </div>
    );
  }

  const shipping = total > 50 ? 0 : 6;
  const grand = total + shipping;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl font-bold md:text-5xl">Your cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={`${item.product.id}-${i}`}
              className="flex gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
                <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {item.color} · {item.material}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    aria-label="Remove"
                    className="text-muted-foreground transition-smooth hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center gap-1 rounded-full border border-border">
                    <button
                      onClick={() => updateQuantity(i, item.quantity - 1)}
                      className="inline-flex h-8 w-8 items-center justify-center transition-smooth hover:text-gradient"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(i, item.quantity + 1)}
                      className="inline-flex h-8 w-8 items-center justify-center transition-smooth hover:text-gradient"
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="font-display text-base font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
          </div>
          <div className="my-4 border-t border-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Total</span>
            <span className="font-display text-xl font-bold text-gradient">${grand.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand"
          >
            Checkout
          </Link>
          {shipping > 0 && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free shipping on orders over $50
            </p>
          )}
        </aside>
      </div>
    </div>
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
