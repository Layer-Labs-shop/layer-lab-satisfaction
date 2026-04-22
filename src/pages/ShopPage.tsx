import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Seo
        title="Shop — Layer Lab"
        description="Mystery boxes packed with precision-printed goods. Pick your size, unbox your surprise."
      />
      <div className="mb-10 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">Mystery boxes</div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Pick your <span className="text-gradient">surprise</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every box is a hand-picked mix of our precision-printed pieces — fidgets, desk toys and
          surprise prints. Bigger boxes mean more items, more freebies, and better odds at a bonus drop.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
