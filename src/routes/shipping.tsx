import { createFileRoute } from "@tanstack/react-router";
import { Truck, Globe2, Clock, PackageCheck } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping — Layer Lab" },
      {
        name: "description",
        content:
          "Layer Lab shipping info: from €3.50, Europe-only delivery for now. Fast, tracked dispatch on every order.",
      },
      { property: "og:title", content: "Shipping — Layer Lab" },
      {
        property: "og:description",
        content:
          "Shipping starts at €3.50. We currently ship within Europe only — worldwide coming soon.",
      },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
        <Truck className="h-3.5 w-3.5" />
        Shipping
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
        Fast, tracked, <span className="text-gradient">precision packed</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every Layer Lab order is hand-checked, layer-inspected and dispatched from our European
        workshop. Here's what to expect.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Card
          icon={<Truck className="h-5 w-5" />}
          title="From €3.50"
          body="Shipping starts at €3.50 for standard tracked delivery. The exact rate is calculated at checkout based on your destination and order weight."
        />
        <Card
          icon={<Globe2 className="h-5 w-5" />}
          title="Europe only — for now"
          body="We currently ship within Europe only. Worldwide shipping is on our roadmap — join the newsletter to be the first to know when we go global."
        />
        <Card
          icon={<Clock className="h-5 w-5" />}
          title="Dispatch in 1–2 days"
          body="Orders are printed, finished and packed within 1–2 business days. Delivery typically takes 3–7 business days across the EU."
        />
        <Card
          icon={<PackageCheck className="h-5 w-5" />}
          title="Free over €50"
          body="Spend more than €50 in a single order and standard shipping is on us — automatically applied at checkout."
        />
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <p>
          Need something urgent or have a delivery question?{" "}
          <a href="mailto:hello@layerlab.shop" className="text-gradient hover:underline">
            hello@layerlab.shop
          </a>
        </p>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-smooth hover:border-primary/40">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand-soft text-gradient">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
