import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShoppingBag, Star, Play } from "lucide-react";
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
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-gradient hover:underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

const reviews = [
  { name: "Marcus T.", rating: 5, text: "The clicks are insanely satisfying. Better than a $200 fidget I bought online." },
  { name: "Aisha R.", rating: 5, text: "Build quality is unreal. Spins forever, looks stunning on my desk." },
  { name: "Devon K.", rating: 4, text: "Great tactile feedback. Slightly louder than I expected, but I kind of love it." },
];

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { addItem } = useCart();
  const [color, setColor] = useState(product.colors[0].name);
  const [material, setMaterial] = useState(product.materials[0]);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ product, quantity: 1, color, material });
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
            <button
              aria-label="Play action video"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium transition-smooth hover:bg-secondary"
            >
              <Play className="h-3 w-3 fill-current" /> Watch in action
            </button>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gradient">{product.type}</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="font-display text-3xl font-bold">${product.price}</div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-gradient" /> 4.9 (128 reviews)
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          {/* Color picker */}
          <div className="mt-8">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Color — <span className="text-foreground">{color}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-10 w-10 rounded-full border-2 transition-bounce hover:scale-110 ${
                    color === c.name ? "border-primary scale-110 glow-brand" : "border-border"
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Material
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
            <p className="text-xs text-muted-foreground">How this fidget actually feels.</p>
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
