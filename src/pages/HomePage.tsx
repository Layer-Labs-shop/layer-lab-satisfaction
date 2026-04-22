import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, Gauge } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import textureImg from "@/assets/texture-layers.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Seo } from "@/components/Seo";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <>
      <Seo
        title="Layer Lab — Precision 3D Printed Goods"
        description="Premium 3D printed fidgets, desk pieces and custom prints engineered for satisfaction."
      />
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-gradient" />
              Engineered for satisfaction
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Precision Printed.
              <br />
              <span className="text-gradient">Perfectly Satisfying.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              High-end 3D printed goods with sub-millimeter tolerances — fidgets, desk pieces and custom prints. Smooth mechanics, premium materials, futuristic design.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-105 glow-brand"
              >
                Shop now
                <ArrowRight className="h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold transition-smooth hover:bg-secondary"
              >
                Our story
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground">
              <div>
                <div className="font-display text-2xl font-bold text-foreground">0.2mm</div>
                tolerance
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">100+</div>
                prints shipped
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-bold text-foreground">4.9★</div>
                avg. rating
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-brand-soft blur-3xl" />
            <img
              src={heroImg}
              alt="Layer Lab precision 3D printed piece with neon rim lighting"
              width={1600}
              height={1024}
              className="relative animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Featured drops</h2>
            <p className="mt-2 text-muted-foreground">Our most-loved prints, ready to ship.</p>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src={textureImg}
              alt="Macro shot of 3D printed layer lines"
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">Our craft</div>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Every layer tuned for the perfect feel.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We obsess over the details that nobody else does — extrusion temperature, layer adhesion, bearing seat tolerance. The result is a print that feels like a precision instrument, not a knick-knack.
            </p>
            <p className="mt-4 text-muted-foreground">
              Designed in our lab, printed on calibrated industrial machines, hand-finished and quality-checked by humans before they ship to you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
          Why <span className="text-gradient">Layer Lab</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Gauge, title: "Sub-mm precision", desc: "0.2mm tolerances on every moving part. Bearings seat perfectly. Clicks land crisp." },
            { icon: Layers, title: "Premium materials", desc: "PLA+ and PETG sourced from the best filament makers in the world." },
            { icon: Sparkles, title: "Designed to feel", desc: "Each design is iterated dozens of times until every print is genuinely satisfying." },
          ].map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-8 transition-smooth hover:border-primary/40 hover-lift">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft transition-bounce group-hover:scale-110">
                <f.icon className="h-6 w-6 text-gradient" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center md:p-20">
          <div className="absolute inset-0 bg-gradient-brand-soft" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Find your <span className="text-gradient">perfect print</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Browse the full collection — every piece engineered for endless satisfaction.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-primary-foreground transition-bounce hover:scale-105 glow-brand animate-pulse-glow"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
