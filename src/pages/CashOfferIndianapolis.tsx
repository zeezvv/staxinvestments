/*
  PLACEHOLDERS TO REPLACE BEFORE GOING LIVE:
  1. GoHighLevel form webhook URL  -> see GHL_WEBHOOK_URL constant below
  2. Indianapolis call tracking phone number -> see PHONE_NUMBER / PHONE_HREF constants
  3. Business email (if used) -> see BUSINESS_EMAIL constant
*/

import { useState, useEffect, FormEvent } from "react";
import { Phone, Check, ChevronDown, Home, AlertTriangle, Users, Hammer, Building2, HeartCrack } from "lucide-react";

// === PLACEHOLDERS ===
const GHL_WEBHOOK_URL = "REPLACE_WITH_GOHIGHLEVEL_FORM_WEBHOOK_URL";
const PHONE_NUMBER = "(555) 555-5555"; // REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER
const PHONE_HREF = "tel:+15555555555"; // REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER
const BUSINESS_EMAIL = "hello@staxhomebuyers.com"; // REPLACE IF USED

// Brand palette (page-scoped override)
const NAVY = "#0F2A44";
const GOLD = "#C9A227";
const CHARCOAL = "#1F2937";

const scrollToForm = () => {
  const el = document.getElementById("lead-form");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const faqs = [
  { q: "Do you charge fees or commissions?", a: "No. We don't charge any fees or commissions. You keep the full offer amount." },
  { q: "How fast can you close?", a: "We can close in as little as 7 days, or on whatever timeline works for you." },
  { q: "Do I need to make repairs?", a: "No. We buy houses as-is. You don't need to fix anything or clean anything." },
  { q: "Will you really buy my house in any condition?", a: "Yes. Fire damage, water damage, mold, foundation issues, hoarder houses, outdated, ugly, we buy it all." },
  { q: "Is there any obligation?", a: "None. Your cash offer is free and there's no pressure to accept." },
];

const situations = [
  { icon: Home, label: "Inherited a House" },
  { icon: AlertTriangle, label: "Facing Foreclosure" },
  { icon: HeartCrack, label: "Behind on Payments" },
  { icon: Users, label: "Going Through Divorce" },
  { icon: Building2, label: "Tired Landlord / Bad Tenants" },
  { icon: Hammer, label: "House Needs Major Repairs" },
];

const areas = ["Indianapolis", "Carmel", "Fishers", "Noblesville", "Greenwood", "Zionsville", "Brownsburg", "Plainfield", "Avon"];

const whyUs = [
  "No Repairs Needed — we buy as-is",
  "No Commissions or Hidden Fees",
  "No Showings or Open Houses",
  "Close on Your Timeline — as little as 7 days",
  "Fair Cash Offer, No Obligation",
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
    setMeta("description", "Get a fair cash offer on your Indianapolis house in as little as 7 days. No repairs, no commissions, no obligation. We buy houses as-is.");
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
    <div style={{ color: CHARCOAL, fontFamily: "Inter, system-ui, -apple-system, sans-serif" }} className="min-h-screen bg-white scroll-smooth">
      <Helmet>
        <title>Sell Your Indianapolis House Fast for Cash | Stax Home Buyers</title>
        <meta name="description" content="Get a fair cash offer on your Indianapolis house in as little as 7 days. No repairs, no commissions, no obligation. We buy houses as-is." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://staxhomebuyers.com/cash-offer/indianapolis" />
        <meta property="og:title" content="Sell Your Indianapolis House Fast for Cash" />
        <meta property="og:description" content="Fair cash offer in as little as 7 days. No repairs, no commissions, no obligation." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-10 pb-8 md:pt-16 md:pb-14" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ backgroundColor: `${GOLD}22`, color: NAVY }}>
              Indianapolis, IN
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" style={{ color: NAVY }}>
              Sell Your Indianapolis House Fast for Cash
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed" style={{ color: CHARCOAL }}>
              Get a fair cash offer in as little as 7 days. No repairs, no commissions, no obligation. We buy houses in Indianapolis and surrounding areas as-is.
            </p>
            <button
              onClick={scrollToForm}
              className="mt-7 w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-white text-lg shadow-lg transition-all hover:opacity-95 hover:-translate-y-0.5"
              style={{ backgroundColor: NAVY }}
            >
              Get My Cash Offer
            </button>
            <p className="mt-3 text-sm" style={{ color: "#64748B" }}>
              Trusted Indianapolis home buyers · 7-day close · No fees
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] md:aspect-square" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1e3a5f 100%)` }}>
            <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-label="Illustration of an Indianapolis home">
              <rect width="400" height="400" fill={NAVY} />
              <rect x="60" y="220" width="280" height="140" fill="#ffffff" opacity="0.95" />
              <polygon points="60,220 200,110 340,220" fill={GOLD} />
              <rect x="170" y="270" width="60" height="90" fill={NAVY} />
              <rect x="90" y="250" width="50" height="50" fill={NAVY} opacity="0.85" />
              <rect x="260" y="250" width="50" height="50" fill={NAVY} opacity="0.85" />
              <circle cx="195" cy="315" r="3" fill={GOLD} />
              <rect x="0" y="360" width="400" height="40" fill="#0a1f33" />
            </svg>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form" className="py-12 md:py-16 px-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>Get Your Free Cash Offer</h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: "#475569" }}>Tell us about your property. No obligation, no pressure.</p>
          </div>
          <div className="bg-white rounded-2xl border p-6 md:p-8" style={{ borderColor: "#E5E7EB", boxShadow: "0 10px 30px -12px rgba(15,42,68,0.15)" }}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: `${GOLD}22` }}>
                  <Check className="w-7 h-7" style={{ color: NAVY }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: NAVY }}>Thanks! We got your info.</h3>
                <p className="mt-2" style={{ color: "#475569" }}>A member of our Indianapolis team will reach out shortly with your no-obligation cash offer.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                action={GHL_WEBHOOK_URL /* REPLACE WITH GOHIGHLEVEL FORM WEBHOOK URL */}
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold mb-1.5" style={{ color: CHARCOAL }}>Property Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="123 Main St, Indianapolis, IN"
                    className="w-full px-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: "#D1D5DB" }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-1.5" style={{ color: CHARCOAL }}>Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(317) 555-0123"
                    className="w-full px-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: "#D1D5DB" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-1.5" style={{ color: CHARCOAL }}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition"
                    style={{ borderColor: "#D1D5DB" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-semibold text-white text-lg transition-all hover:-translate-y-0.5 disabled:opacity-70"
                  style={{ backgroundColor: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = NAVY)}
                >
                  {submitting ? "Sending..." : "Get My Cash Offer"}
                </button>
                <p className="text-xs text-center" style={{ color: "#64748B" }}>
                  We respect your privacy. Your info is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-6 border-y" style={{ backgroundColor: "#F8FAFC", borderColor: "#E5E7EB" }}>
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {["BBB Accredited", "5-Star Reviewed", "Local Indianapolis Buyers", "Close in 7 Days"].map((b) => (
            <div key={b} className="text-sm md:text-base font-semibold" style={{ color: NAVY }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: NAVY }}>How It Works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Tell Us About Your Property", d: "Fill out the short form above. Takes 60 seconds." },
              { n: "2", t: "Get a Fair Cash Offer", d: "We review your property and send you a no-obligation cash offer." },
              { n: "3", t: "Close in 7 Days", d: "Pick your closing date. We handle the details. You get paid." },
            ].map((s) => (
              <div key={s.n} className="p-7 rounded-2xl border bg-white" style={{ borderColor: "#E5E7EB", boxShadow: "0 4px 20px -8px rgba(15,42,68,0.08)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-4" style={{ backgroundColor: NAVY, color: "#ffffff" }}>
                  {s.n}
                </div>
                <h3 className="font-bold text-xl mb-2" style={{ color: NAVY }}>{s.t}</h3>
                <p style={{ color: "#475569" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SITUATIONS */}
      <section className="py-14 md:py-20 px-5" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: NAVY }}>We Help Homeowners in Any Situation</h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {situations.map(({ icon: Icon, label }) => (
              <div key={label} className="p-5 rounded-2xl bg-white border flex items-center gap-3" style={{ borderColor: "#E5E7EB" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GOLD}22` }}>
                  <Icon className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <span className="font-semibold text-sm md:text-base" style={{ color: CHARCOAL }}>{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center" style={{ color: "#475569" }}>
            Whatever your situation, we can help. Get a fair cash offer today.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-14 md:py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: NAVY }}>Why Choose Stax Home Buyers</h2>
          <ul className="mt-10 space-y-4">
            {whyUs.map((item) => (
              <li key={item} className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: "#F8FAFC" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: GOLD }}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-base md:text-lg font-medium" style={{ color: CHARCOAL }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AREAS */}
      <section className="py-14 md:py-20 px-5" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>We Buy Houses Across the Indianapolis Metro</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {areas.map((a) => (
              <span key={a} className="px-4 py-2 rounded-full text-sm md:text-base font-semibold border bg-white" style={{ borderColor: NAVY, color: NAVY }}>
                {a}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm md:text-base" style={{ color: "#475569" }}>
            Don't see your area? We likely still buy there. Fill out the form.
          </p>
        </div>
      </section>

      {/* SECOND CTA BAND */}
      <section className="py-14 md:py-20 px-5" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Get Your Cash Offer?</h2>
          <p className="mt-3 text-base md:text-lg" style={{ color: "#CBD5E1" }}>No repairs, no fees, no obligation.</p>
          <button
            onClick={scrollToForm}
            className="mt-7 w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Get My Cash Offer
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: NAVY }}>Frequently Asked Questions</h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E5E7EB" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left p-5 bg-white hover:bg-slate-50 transition"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-base md:text-lg pr-4" style={{ color: NAVY }}>{f.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: NAVY }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0 text-base leading-relaxed" style={{ color: "#475569" }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-5 pb-28 md:pb-10" style={{ backgroundColor: NAVY, color: "#CBD5E1" }}>
        <div className="max-w-4xl mx-auto text-center space-y-2 text-sm">
          <p className="font-bold text-white text-base">Stax Home Buyers</p>
          <p>
            <a href={PHONE_HREF} className="hover:text-white transition">{PHONE_NUMBER}</a>
            <span className="mx-2">·</span>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition">{BUSINESS_EMAIL}</a>
          </p>
          <p className="pt-2" style={{ color: "#94A3B8" }}>
            © 2026 Stax Home Buyers. We buy houses in Indianapolis and surrounding areas.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 gap-2 p-3 border-t bg-white" style={{ borderColor: "#E5E7EB", boxShadow: "0 -6px 20px -8px rgba(0,0,0,0.15)" }}>
        <a
          href={PHONE_HREF /* REPLACE WITH INDIANAPOLIS CALL TRACKING NUMBER */}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-base"
          style={{ backgroundColor: NAVY }}
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button
          onClick={scrollToForm}
          className="py-3 rounded-xl font-bold text-base"
          style={{ backgroundColor: GOLD, color: NAVY }}
        >
          Get Offer
        </button>
      </div>
    </div>
  );
};

export default CashOfferIndianapolis;
