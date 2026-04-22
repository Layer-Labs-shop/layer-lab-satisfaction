import { ShieldCheck, RotateCcw, CalendarClock, Mail } from "lucide-react";
import { Seo } from "@/components/Seo";

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Seo
        title="Returns & Warranty — Layer Lab"
        description="Every Layer Lab print is backed by a 15-day warranty. If something's off, we'll make it right."
      />
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" />
        Returns & Warranty
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
        Backed by a <span className="text-gradient">15-day warranty</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        We obsess over every layer so you don't have to. If your order arrives damaged, defective,
        or just isn't satisfying enough — we've got you.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Card icon={<CalendarClock className="h-5 w-5" />} title="15 days to decide" body="You have 15 days from the day your order arrives to request a return or warranty replacement. Plenty of time to put it through its paces." />
        <Card icon={<ShieldCheck className="h-5 w-5" />} title="Defects covered" body="Anything that arrives defective, damaged in transit, or fails under normal use within the warranty window will be replaced or refunded." />
        <Card icon={<RotateCcw className="h-5 w-5" />} title="Easy process" body="Email us with your order number and a short description (a photo or video helps). We'll send return instructions within 1 business day." />
        <Card icon={<Mail className="h-5 w-5" />} title="Get in touch" body="Returns and warranty claims go to layerlabscustomerservice@gmail.com. Items should be returned in their original packaging where possible." />
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-bold">Fine print</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Warranty does not cover damage caused by drops, modifications, or misuse.</li>
          <li>Custom-color or made-to-order items are eligible for warranty replacement only.</li>
          <li>Return shipping for change-of-mind returns is the customer's responsibility.</li>
          <li>Refunds are issued to the original payment method within 5–10 business days of receipt.</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
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
