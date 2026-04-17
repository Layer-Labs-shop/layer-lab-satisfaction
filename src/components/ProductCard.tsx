import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      product,
      quantity: 1,
      color: product.colors[0].name,
      material: product.materials[0],
    });
  };

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-smooth hover-lift hover:border-primary/40"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-bounce group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          onClick={quickAdd}
          aria-label="Quick add to cart"
          className="absolute bottom-3 right-3 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground opacity-0 transition-bounce hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-display text-base font-semibold">{product.name}</h3>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.type}</p>
        </div>
        <div className="font-display text-base font-bold text-gradient">${product.price}</div>
      </div>
    </Link>
  );
}
