import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, CalendarDays, Banknote, CheckCircle2, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import heroImage from "@/assets/middletown-house.jpg";

const PAGE_URL = "https://staxhomebuyers.com/we-buy-houses-middletown-ohio";
const PAGE_TITLE = "We Buy Houses in Middletown, Ohio | Stax Home Buyers";
const PAGE_DESCRIPTION =
  "Need to sell your house fast in Middletown, Ohio? Stax Home Buyers buys houses as-is for cash with no repairs, no agent fees, and flexible closing dates.";
const OG_DESCRIPTION =
  "Sell your house fast in Middletown, Ohio. Get a fair cash offer from Stax Home Buyers and skip repairs, showings, and agent fees.";

const faqs = [
  {
    q: "Do you buy houses in Middletown, Ohio?",
    a: "Yes. Stax Home Buyers works with homeowners in Middletown and nearby Ohio communities who want to sell their house quickly and as-is.",
  },
  {
    q: "Do I need to make repairs before selling?",
    a: "No. We buy houses as-is, meaning you do not need to make repairs, clean out the property, or prepare it for showings.",
  },
  {
    q: "Are there agent fees or commissions?",
    a: "No. Since you are selling directly, there are no agent commissions or listing fees.",
  },
  {
    q: "How fast can I close?",
    a: "Closing timelines can vary, but we work with homeowners to choose a timeline that fits their situation.",
  },
  {
    q: "Will I get a no-obligation offer?",
    a: "Yes. You can request an offer without any obligation to accept.",
  },
];

const nearbyAreas = [
  "Franklin",
  "Monroe",
  "Trenton",
  "Hamilton",
  "Springboro",
  "Germantown",
  "Liberty Township",
  "West Chester",
  "Dayton",
  "Cincinnati area",
];

const reasons = [
  "Inherited property you don't want to manage",
  "Unwanted rental property",
  "Major repairs you'd rather not handle",
  "Vacant house sitting on the market",
  "Behind on payments",
  "Relocating for work or family",
  "Going through a divorce",
  "Tired of being a landlord",
  "Need a faster sale than listing with an agent",
];

const benefits = [
  "No repairs needed",
  "No cleaning required",
  "No agent commissions",
  "No open houses",
  "No long waiting periods",
  "Flexible closing on your timeline",
  "Fair as-is cash offer",
];

const setOrCreateMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
};

const setOrCreateLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const MiddletownOhio = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    setOrCreateMeta('meta[name="description"]', { name: "description", content: PAGE_DESCRIPTION });
    setOrCreateMeta('meta[property="og:title"]', { property: "og:title", content: PAGE_TITLE });
    setOrCreateMeta('meta[property="og:description"]', { property: "og:description", content: OG_DESCRIPTION });
    setOrCreateMeta('meta[property="og:url"]', { property: "og:url", content: PAGE_URL });
    setOrCreateMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setOrCreateMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setOrCreateMeta('meta[name="twitter:title"]', { name: "twitter:title", content: PAGE_TITLE });
    setOrCreateMeta('meta[name="twitter:description"]', { name: "twitter:description", content: OG_DESCRIPTION });
    setOrCreateLink("canonical", PAGE_URL);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Stax Home Buyers",
      url: "https://staxhomebuyers.com",
      description:
        "Stax Home Buyers helps homeowners sell houses as-is for cash with no repairs, no agent fees, and flexible closing options.",
      telephone: "+1-234-437-1980",
      email: "leads@staxhomebuyers.com",
      areaServed: [
        "Middletown, Ohio",
        "Franklin, Ohio",
        "Monroe, Ohio",
        "Trenton, Ohio",
        "Hamilton, Ohio",
        "Dayton, Ohio",
        "Cincinnati, Ohio",
      ],
    };

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.dataset.seo = "middletown-faq";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.dataset.seo = "middletown-org";
    orgScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    return () => {
      document.title = previousTitle;
      faqScript.remove();
      orgScript.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 section-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <MapPin className="w-4 h-4" /> Middletown, Ohio
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                We Buy Houses in Middletown, Ohio
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Stax Home Buyers helps homeowners in Middletown, Ohio sell their houses fast without repairs, showings, or agent commissions. If you need a simple way to sell your property as-is, we can make a cash offer and work with your preferred closing timeline.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact">
                  <Button size="lg" className="text-base px-8 py-6">
                    Get Your Cash Offer <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <a href="tel:+12344371980">
                  <Button size="lg" variant="outline" className="text-base px-8 py-6">
                    Call (234) 437-1980
                  </Button>
                </a>
              </div>
            </motion.div>

            <div className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border shadow-sm">
              <img
                src={heroImage}
                alt="Stax Home Buyers cash home buyer in Middletown Ohio"
                loading="lazy"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sell Fast */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sell Your House Fast in Middletown, OH
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every homeowner's situation is different. We talk with people across Middletown who want a simple, direct sale instead of waiting months on the open market. You may want a faster path forward if you're dealing with any of the following:
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How Our Cash Home Buying Process Works
              </h2>
              <p className="mt-4 text-muted-foreground">
                A straightforward 3 step process designed around your schedule.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: FileText, title: "Tell us about the property", desc: "Share a few quick details about your house in Middletown so we can review it." },
                { icon: Banknote, title: "Get a fair cash offer", desc: "We'll put together a fair, no obligation cash offer based on your property." },
                { icon: CalendarDays, title: "Close on your timeline", desc: "Pick a closing date that fits your situation. We work around your schedule." },
              ].map((s, i) => (
                <div key={s.title} className="bg-card rounded-2xl p-8 border border-border text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {i + 1}</span>
                  <h3 className="font-display text-xl font-bold mt-2 mb-3 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Why Homeowners in Middletown Choose Stax Home Buyers
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
              We focus on making the sale simple so you can move on with confidence.
            </p>
            <ul className="mt-10 grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* As-is */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              We Buy Houses As-Is in Middletown
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              You do not need to fix up the house before selling. We buy properties in their current condition, whether the home needs cosmetic updates, has deferred maintenance, or needs major work. There is no pressure to clean, stage, or coordinate contractors. Our goal is to give you a realistic option that saves time and removes the typical stress of preparing a house for the open market.
            </p>
            <div className="mt-8 rounded-2xl overflow-hidden border border-border">
              <img
                src={heroImage}
                alt="Middletown Ohio house sold as-is"
                loading="lazy"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Areas Near Middletown We Serve
            </h2>
            <p className="mt-4 text-muted-foreground">
              In addition to Middletown, we work with homeowners across nearby communities in southwest Ohio, including:
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {nearbyAreas.map((area) => (
                <li
                  key={area}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-muted-foreground">
              Not sure if your area qualifies? Reach out to <Link to="/" className="text-primary underline hover:text-primary/80">Stax Home Buyers</Link> and we'll let you know.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 section-gradient">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="mt-10 bg-card border border-border rounded-2xl px-6">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-border last:border-0">
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default MiddletownOhio;
