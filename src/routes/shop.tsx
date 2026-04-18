import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Layer Lab" },
      { name: "description", content: "Mystery boxes packed with precision-printed fidget toys. Pick your size, unbox your surprise." },
      { property: "og:title", content: "Shop — Layer Lab" },
      { property: "og:description", content: "Mystery boxes packed with precision-printed fidget toys. Pick your size, unbox your surprise." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">
          Mystery boxes
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Pick your <span className="text-gradient">surprise</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every box is a hand-picked mix of our precision-printed fidgets. Bigger boxes mean
          more fidgets, more freebies, and better odds at a bonus drop.
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
