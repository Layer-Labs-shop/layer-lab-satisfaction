import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShoppingBag, Star, Gift, Sparkles, Package } from "lucide-react";
import { products, type Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { SatisfactionMeter } from "@/components/SatisfactionMeter";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Layer Lab` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Layer Lab` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Box not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-gradient hover:underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

const reviews = [
  { name: "Marcus T.", rating: 5, text: "Got the 10-pack and every single fidget was crisp. Two of my favourites came in this box." },
  { name: "Aisha R.", rating: 5, text: "The mystery factor is half the fun. Build quality across all of them is unreal." },
  { name: "Devon K.", rating: 4, text: "Bought the 25 box for the office. Everyone fought over the spinners. Worth it." },
];

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addItem } = useCart();
  const [material, setMaterial] = useState(product.materials[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ product, quantity: 1, material });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-brand-soft blur-3xl opacity-50" />
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="relative h-full w-full object-cover animate-float"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gradient">{product.size} mystery box</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="font-display text-3xl font-bold">€{product.price.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-gradient" /> 4.9 (128 reviews)
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          {/* What's inside */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Stat icon={Package} label="Fidgets" value={`${product.fidgetCount}`} />
            <Stat
              icon={Gift}
              label="Free fidgets"
              value={product.freeFidgets > 0 ? `+${product.freeFidgets}` : "—"}
            />
            <Stat icon={Sparkles} label="Bonus chance" value={`${product.bonusChance}%`} />
          </div>

          {/* Material */}
          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Material preference
            </div>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-smooth ${
                    material === m
                      ? "border-transparent bg-gradient-brand text-primary-foreground glow-brand"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-4 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 transition-bounce group-hover:rotate-12" /> Add to cart
              </>
            )}
          </button>

          {/* Satisfaction */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-sm font-semibold">Satisfaction factor</h3>
            <p className="text-xs text-muted-foreground">How fidgets in this box actually feel.</p>
            <div className="mt-5 space-y-4">
              <SatisfactionMeter label="Click smoothness" value={product.satisfaction.smoothness} />
              <SatisfactionMeter label="Sound rating" value={product.satisfaction.sound} />
              <SatisfactionMeter label="Tactile feedback" value={product.satisfaction.tactile} />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20">
        <h2 className="font-display text-2xl font-bold md:text-3xl">What people say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-gradient">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
              <div className="mt-4 text-xs font-semibold">{r.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-gradient" />
      <div className="mt-2 font-display text-xl font-bold">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
