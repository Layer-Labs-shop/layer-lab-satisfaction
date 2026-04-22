import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layers, Package, Sparkles, ShoppingBag } from "lucide-react";
import { Seo } from "@/components/Seo";

const sections = [
  {
    icon: Sparkles,
    title: "Print quality",
    items: [
      { q: "How precise are your prints?", a: "Every Layer Lab piece is printed at 0.2mm layer height with calibrated tolerances down to 0.2mm. Moving parts are tuned for smooth motion straight off the printer." },
      { q: "Will I see layer lines?", a: "Subtle layer lines are part of the aesthetic — they catch the light and show the craft. We hand-inspect every unit and reject anything with visible defects, stringing, or under-extrusion." },
      { q: "Are the moving parts assembled by hand?", a: "Most are print-in-place, meaning hinges and chains come out of the printer already articulated. Magnetic and bearing-based products are hand-assembled and tested." },
    ],
  },
  {
    icon: Layers,
    title: "Materials",
    items: [
      { q: "What filaments do you use?", a: "We exclusively print in PLA+ and PETG. PLA+ gives a crisp tactile feel and rich color saturation. PETG is tougher and slightly flexible — better for parts that take repeated stress." },
      { q: "Why only PLA+ and PETG?", a: "We tested dozens of materials and these two consistently deliver the best balance of finish quality, durability, and sustainability for everyday prints." },
      { q: "Are your materials safe?", a: "Yes. Both PLA+ and PETG are non-toxic. PLA+ is plant-based and biodegradable under industrial composting conditions." },
    ],
  },
  {
    icon: Package,
    title: "Care & durability",
    items: [
      { q: "How do I clean my prints?", a: "Wipe with a soft, slightly damp cloth. Avoid alcohol, acetone, or harsh solvents — they can dull the finish. Never put your prints in the dishwasher." },
      { q: "Can I leave it in a hot car?", a: "Please don't. PLA+ softens above 60°C / 140°F. PETG is more heat-tolerant but still not built for direct sun behind glass. Store at room temperature." },
      { q: "What if a moving part feels stiff?", a: "Most pieces loosen up after a few minutes of use. For bearings, a single drop of light machine oil restores buttery motion." },
    ],
  },
  {
    icon: ShoppingBag,
    title: "Orders & shipping",
    items: [
      { q: "Where do you ship?", a: "Europe only for now. Shipping starts at €3.50. See the Shipping page for full details." },
      { q: "How long until my order ships?", a: "Orders are printed to order and typically ship within 2–4 business days." },
      { q: "What's your return policy?", a: "We offer a 15-day warranty on every order. See the Returns page for details." },
      { q: "Can I customize colors?", a: "Yes — most products let you pick from our available color palette on the product page." },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Seo
        title="FAQ — Layer Lab"
        description="Answers about print quality, materials, care, and orders for Layer Lab 3D printed goods."
      />
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Everything you need to know about Layer Lab — from print quality to care.
        </p>
      </header>

      <div className="mt-12 space-y-10">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.title}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
              </div>
              <Accordion type="single" collapsible className="mt-4">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${section.title}-${i}`}>
                    <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          );
        })}
      </div>
    </div>
  );
}
