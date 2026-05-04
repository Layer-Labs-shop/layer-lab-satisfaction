import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Check, ShoppingBag, Gift, Sparkles, Package } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";
import { Seo } from "@/components/Seo";
import { ProductComments } from "@/components/ProductComments";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const isPrint = product?.kind === "print";
  const initialColor = product?.colors?.[0]?.name ?? "";

  const gallery = product?.images && product.images.length > 0 ? product.images : product ? [product.image] : [];

  const [material, setMaterial] = useState(product?.materials[0] ?? "PLA+");
  const [color, setColor] = useState<string>(initialColor);
  const [customName, setCustomName] = useState("");
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <Seo title="Product not found — Layer Lab" />
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-gradient hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const canAdd = !product.customizable || customName.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    // Build the variant string used to differentiate cart entries.
    let variant: string = material;
    if (isPrint && color) variant = color;
    if (product.customizable && customName.trim()) {
      variant = `${color || material} · "${customName.trim()}"`;
    }
    addItem({ product, quantity: 1, material: variant });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Seo
        title={`${product.name} — Layer Lab`}
        description={product.description}
        image={product.image}
      />
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-brand-soft blur-3xl opacity-50" />
            <img
              src={gallery[activeImage]}
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
          {gallery.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-smooth ${
                    activeImage === idx ? "border-primary glow-brand" : "border-border hover:border-primary/40"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gradient">
            {isPrint ? "Precision print" : `${product.size} mystery box`}
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="font-display text-3xl font-bold">€{product.price.toFixed(2)}</div>
          </div>
          <p className="mt-6 text-muted-foreground">{product.description}</p>

          {!isPrint && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Stat icon={Package} label="Prints" value={`${product.fidgetCount}`} />
              <Stat icon={Gift} label="Free fidgets" value={product.freeFidgets > 0 ? `+${product.freeFidgets}` : "—"} />
              <Stat icon={Sparkles} label="Rare fidget chance" value={`${product.bonusChance}%`} />
            </div>
          )}

          {isPrint && product.colors && product.colors.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Color — <span className="text-foreground">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    title={c.name}
                    className={`h-9 w-9 rounded-full border-2 transition-smooth ${
                      color === c.name ? "border-primary glow-brand scale-110" : "border-border hover:border-primary/40"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.customizable && (
            <div className="mt-6">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Your name / word
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value.slice(0, 14))}
                placeholder="e.g. ALEX"
                maxLength={14}
                className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-smooth focus:border-primary focus:outline-none"
              />
              <p className="mt-2 text-[11px] text-muted-foreground">
                Up to 14 characters. Letters, numbers and spaces work best.
              </p>
            </div>
          )}

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
            disabled={!canAdd}
            className="mt-8 group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-4 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-[1.02] glow-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {added ? (
              <><Check className="h-4 w-4" /> Added to cart</>
            ) : !canAdd ? (
              <>Enter a name to continue</>
            ) : (
              <><ShoppingBag className="h-4 w-4 transition-bounce group-hover:rotate-12" /> Add to cart</>
            )}
          </button>
        </div>
      </div>

      <ProductComments productId={product.id} />
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-gradient" />
      <div className="mt-2 font-display text-xl font-bold">{value}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
