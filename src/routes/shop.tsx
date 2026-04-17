import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, productTypes, allMaterials, type ProductType, type Material } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Layer Lab" },
      { name: "description", content: "Browse the full Layer Lab collection of premium 3D printed fidget toys." },
      { property: "og:title", content: "Shop — Layer Lab" },
      { property: "og:description", content: "Browse the full Layer Lab collection of premium 3D printed fidget toys." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [maxPrice, setMaxPrice] = useState(50);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedTypes.length && !selectedTypes.includes(p.type)) return false;
      if (selectedMaterials.length && !p.materials.some((m) => selectedMaterials.includes(m))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [selectedTypes, selectedMaterials, maxPrice]);

  const toggle = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          The <span className="text-gradient">collection</span>
        </h1>
        <p className="mt-2 text-muted-foreground">{filtered.length} precision-engineered fidgets</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <FilterGroup title="Type">
            {productTypes.map((t) => (
              <Chip
                key={t.value}
                active={selectedTypes.includes(t.value)}
                onClick={() => toggle(selectedTypes, setSelectedTypes, t.value)}
              >
                {t.label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="Material">
            {allMaterials.map((m) => (
              <Chip
                key={m}
                active={selectedMaterials.includes(m)}
                onClick={() => toggle(selectedMaterials, setSelectedMaterials, m)}
              >
                {m}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="Max price">
            <div>
              <input
                type="range"
                min={15}
                max={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[oklch(0.65_0.22_270)]"
              />
              <div className="mt-1 text-sm font-medium">
                Up to <span className="text-gradient font-bold">${maxPrice}</span>
              </div>
            </div>
          </FilterGroup>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth ${
        active
          ? "border-transparent bg-gradient-brand text-primary-foreground glow-brand"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
