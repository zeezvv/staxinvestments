/*
  PLACEHOLDERS TO REPLACE BEFORE GOING LIVE:
  1. GoHighLevel form webhook URL  -> GHL_WEBHOOK_URL constant below
  2. Indianapolis call tracking phone number -> PHONE_NUMBER / PHONE_HREF constants
  3. Business email (if used) -> BUSINESS_EMAIL constant
*/

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Home,
  AlertTriangle,
  Users,
  Hammer,
  Building2,
  HeartCrack,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  Star,
} from "lucide-react";
import Footer from "@/components/Footer";
import skylineImage from "@/assets/indianapolis-skyline.jpg";

// === PLACEHOLDERS ===
const GHL_WEBHOOK_URL = "REPLACE_WITH_GOHIGHLEVEL_FORM_WEBHOOK_URL";
const PHONE_NUMBER = "(234) 437-1980"; // REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER
const PHONE_HREF = "tel:+12344371980"; // REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER
const BUSINESS_EMAIL = "leads@staxhomebuyers.com"; // REPLACE IF USED

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const situations = [
  { icon: Home, label: "Inherited a House" },
  { icon: AlertTriangle, label: "Facing Foreclosure" },
  { icon: HeartCrack, label: "Behind on Payments" },
  { icon: Users, label: "Going Through Divorce" },
  { icon: Building2, label: "Tired Landlord / Bad Tenants" },
  { icon: Hammer, label: "House Needs Major Repairs" },
];

const areas = [
  "Indianapolis",
  "Carmel",
  "Fishers",
  "Noblesville",
  "Greenwood",
  "Zionsville",
  "Brownsburg",
  "Plainfield",
  "Avon",
];

const whyUs = [
  "No Repairs Needed. We buy as-is",
  "No Commissions or Hidden Fees",
  "No Showings or Open Houses",
  "Close on Your Timeline. As little as 7 days",
  "Fair Cash Offer, No Obligation",
];

const trustBadges = [
  { icon: ShieldCheck, label: "BBB Accredited" },
  { icon: Star, label: "5-Star Reviewed" },
  { icon: MapPin, label: "Local Indiana Buyers" },
  { icon: Clock, label: "Close in 7 Days" },
];

const faqs = [
  { q: "Do you charge fees or commissions?", a: "No. We don't charge any fees or commissions. You keep the full offer amount." },
  { q: "How fast can you close?", a: "We can close in as little as 7 days, or on whatever timeline works for you." },
  { q: "Do I need to make repairs?", a: "No. We buy houses as-is. You don't need to fix anything or clean anything." },
  { q: "Will you really buy my house in any condition?", a: "Yes. Fire damage, water damage, mold, foundation issues, hoarder houses, outdated, ugly, we buy it all." },
  { q: "Is there any obligation?", a: "None. Your cash offer is free and there's no pressure to accept." },
];

const CashOfferIndianapolis = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ address: "", phone: "", email: "" });

  useEffect(() => {
    document.title = "Sell Your Indianapolis House Fast for Cash | Stax Home Buyers";
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Sell your Indianapolis house fast for cash. Fair cash offer in as little as 7 days. No repairs, no commissions, no obligation. Local Indiana home buyers.",
    );
    setMeta("og:title", "Sell Your Indianapolis House Fast for Cash", "property");
    setMeta("og:description", "Fair cash offer in as little as 7 days. No repairs, no commissions, no obligation.", "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "indianapolis-landing" }),
      }).catch(() => null);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HERO with Indianapolis skyline */}
      <section className="relative w-full">
        <div className="relative h-[520px] md:h-[620px] lg:h-[680px] w-full overflow-hidden">
          <img
            src={skylineImage}
            alt="Indianapolis Indiana skyline at golden hour with Monument Circle"
            width={1600}
            height={912}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto h-full px-4 pt-24 md:pt-20 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 backdrop-blur px-4 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5" /> Indianapolis, Indiana
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-5 text-foreground leading-tight">
                Sell Your <span className="text-primary">Indianapolis</span> House Fast For Cash
              </h1>
              <p className="text-foreground/90 mt-5 max-w-xl text-base md:text-lg leading-relaxed">
                Get a fair cash offer in as little as 10 minutes. No repairs, no commissions, no obligation. We buy houses in Indianapolis and surrounding areas as-is.
              </p>
              <p className="text-sm text-muted-foreground mt-7">
                Trusted Indianapolis home buyers · Close On Your Timeline&nbsp;·&nbsp;No Fees
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form" className="relative z-20 -mt-20 md:-mt-24 max-w-2xl mx-auto w-full px-4 pb-4 scroll-mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-xl"
        >
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Get Started</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-foreground">Get Your Free Cash Offer</h2>
            <p className="text-sm text-muted-foreground mt-2">Tell us about your property. No obligation, no pressure.</p>
          </div>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Thanks! We got your info.</h3>
              <p className="mt-2 text-muted-foreground">Our Indianapolis team will reach out shortly with your no obligation cash offer.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              action={GHL_WEBHOOK_URL /* REPLACE WITH GOHIGHLEVEL FORM WEBHOOK URL */}
              method="POST"
              className="space-y-5"
            >
              <div>
                <Label htmlFor="address" className="text-sm font-medium text-foreground mb-1.5 block">
                  Property Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Main St, Indianapolis, IN"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-1.5 block">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(317) 555-0123"
                  className="h-12 text-base"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" disabled={submitting} className="w-full py-6 text-base font-semibold">
                {submitting ? "Sending..." : "Get My Cash Offer"} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. Your info is never shared.
              </p>
            </form>
          )}
        </motion.div>
      </section>


      {/* AREAS WE SERVE */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Areas We Serve</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            We Buy Houses Across The Indianapolis Metro
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {areas.map((a) => (
              <span
                key={a}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-card border border-primary/30 text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            Don't see your area? We likely still buy there. Fill out the form.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-4">Three simple steps to your cash offer.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", icon: Home, t: "Tell Us About Your Property", d: "Fill out the short form above. Takes 60 seconds." },
              { n: "02", icon: DollarSign, t: "Get A Fair Cash Offer", d: "We review your property and send you a no obligation cash offer." },
              { n: "03", icon: Check, t: "Close In 7 Days", d: "Pick your closing date. We handle the details. You get paid." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-card rounded-2xl p-7 border border-border shadow-sm hover:shadow-lg transition-all"
              >
                <div className="absolute top-4 right-5 text-5xl font-black text-primary/20 leading-none select-none">
                  {s.n}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SITUATIONS */}
      <section className="py-16 md:py-20 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">We Can Help</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              We Help Indianapolis Homeowners In Any Situation
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {situations.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-5 border border-border flex items-center gap-4 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            Whatever your situation, we can help. Get a fair cash offer today.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">Why Sell To Stax Home Buyers</h2>
          </div>
          <ul className="space-y-3">
            {whyUs.map((item) => (
              <li key={item} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-base font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* SECOND CTA BAND */}
      <section className="py-16 md:py-20 bg-[hsl(var(--footer-background))]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready To Get Your Cash Offer?
          </h2>
          <p className="mt-3 text-primary-foreground/80 text-base md:text-lg">
            No repairs, no fees, no obligation.
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="mt-7 px-10 py-6 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Get My Cash Offer <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left p-5 hover:bg-secondary/40 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-foreground pr-4">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24 md:pb-0">
        <Footer />
      </div>

      {/* STICKY MOBILE CTA BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-2 p-3 border-t border-border bg-background/95 backdrop-blur shadow-[0_-6px_20px_-8px_rgba(0,0,0,0.15)]">
        <a
          href={PHONE_HREF /* REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER */}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-primary text-primary-foreground text-base"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button
          type="button"
          onClick={scrollToForm}
          className="py-3 rounded-xl font-bold bg-accent text-accent-foreground text-base"
        >
          Get Offer
        </button>
      </div>
    </div>
  );
};

export default CashOfferIndianapolis;
