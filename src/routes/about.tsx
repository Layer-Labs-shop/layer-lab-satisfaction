import { createFileRoute } from "@tanstack/react-router";
import textureImg from "@/assets/texture-layers.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Layer Lab" },
      { name: "description", content: "The story behind Layer Lab — precision printing, obsessive design, hand-finished fidgets." },
      { property: "og:title", content: "About — Layer Lab" },
      { property: "og:description", content: "The story behind Layer Lab — precision printing, obsessive design, hand-finished fidgets." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gradient">Our story</div>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
        Built layer by layer.<br />
        <span className="text-gradient">Obsessed in every line.</span>
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        Layer Lab started in a garage with one printer and a bad fidget cube. We knew we could
        do better — tighter tolerances, smoother mechanics, a real sense of craft. Three years
        later, our fidgets ship to thousands of desks worldwide.
      </p>

      <div className="mt-12 overflow-hidden rounded-3xl border border-border">
        <img
          src={textureImg}
          alt="Macro of 3D printed layer lines"
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Precision is the product</h2>
          <p className="mt-3 text-muted-foreground">
            Every Layer Lab fidget is printed at 0.1mm layer height with a calibrated tolerance of
            ±0.05mm on bearing seats. We chase the dimensional accuracy normally reserved for
            functional engineering parts — because a fidget that doesn't feel right isn't worth
            making.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Designed to be felt</h2>
          <p className="mt-3 text-muted-foreground">
            We prototype every product dozens of times. Buttons get re-tuned, click springs get
            re-weighted, slider channels get re-polished. We only ship a design when the team
            picks it up and refuses to put it down.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Materials that last</h2>
          <p className="mt-3 text-muted-foreground">
            PLA+ for everyday durability. PETG for impact resistance. We pick the material
            that makes the fidget feel best — not the cheapest one.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Hand-finished, every time</h2>
          <p className="mt-3 text-muted-foreground">
            Each unit is sanded, deburred, lubricated and bench-tested by a human before it ships.
            If it doesn't pass our feel-test, you don't get it. Simple.
          </p>
        </div>
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-card p-10 text-center">
        <div className="grid gap-8 md:grid-cols-3">
          <Stat value="0.1mm" label="layer height" />
          <Stat value="±0.05mm" label="bearing tolerance" />
          <Stat value="100%" label="hand-tested" />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl font-bold text-gradient">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
    </div>
  );
}
