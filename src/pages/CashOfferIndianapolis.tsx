/*
  PLACEHOLDERS TO REPLACE BEFORE GOING LIVE:
  1. Indianapolis call tracking phone number -> PHONE_NUMBER / PHONE_HREF constants
  2. Business email (if used) -> BUSINESS_EMAIL constant
*/

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { track } from "@vercel/analytics";
import Footer from "@/components/Footer";
import skylineImage from "@/assets/indianapolis-skyline.jpg";

// === PLACEHOLDERS ===
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
  { icon: Clock, label: "Fast Closing" },
];

const faqs = [
  { q: "Do you charge fees or commissions?", a: "No. We don't charge any fees or commissions. You keep the full offer amount." },
  { q: "How fast can you close?", a: "We can close in as little as 7 days, or on whatever timeline works for you." },
  { q: "Do I need to make repairs?", a: "No. We buy houses as-is. You don't need to fix anything or clean anything." },
  { q: "Will you really buy my house in any condition?", a: "Yes. Fire damage, water damage, mold, foundation issues, hoarder houses, outdated, ugly, we buy it all." },
  { q: "Is there any obligation?", a: "None. Your cash offer is free and there's no pressure to accept." },
];

const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com", "live.com", "msn.com", "comcast.net", "att.net", "verizon.net", "me.com", "mac.com"];
const hasValidDomain = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  if (validDomains.includes(domain)) return true;
  const parts = domain.split(".");
  return parts.length >= 2 && parts[parts.length - 1].length >= 2;
};

const schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255).refine(hasValidDomain, "Please enter a valid email domain"),
  phone: z.string().trim().min(14, "Please enter a complete phone number").max(20),
  propertyAddress: z.string().trim().min(1, "Property address is required").max(500)
    .refine((v) => /^\d+\s+[A-Za-z0-9.'\-]+/.test(v.trim()), "Please enter a street address (e.g. 123 Main St)")
    .refine(
      (v) => {
        const rest = v.trim().replace(/^\d+\s+[A-Za-z0-9.'\-]+/, "").trim();
        if (!rest) return false;
        return /\b\d{5}(-\d{4})?\b/.test(rest) || /[A-Za-z]{2,}/.test(rest);
      },
      "Please add a city, state, or ZIP code"
    )
    .refine((v) => !/^(test|asdf|none|n\/a|na|xxx|abc)\b/i.test(v.trim()), "Please enter a real property address"),
  isListed: z.enum(["yes", "no"], { errorMap: () => ({ message: "Please select an option" }) }),
  propertyType: z.enum(["Single Family", "Duplex", "Mobile Home", "Apartment", "Other"], { errorMap: () => ({ message: "Please select a property type" }) }),
  timeline: z.enum(["ASAP", "1 month", "2-3 months", "6 months"], { errorMap: () => ({ message: "Please select a timeline" }) }),
  reason: z.string().trim().min(1, "Please tell us why you're selling").max(1000),
});

type FormData = z.infer<typeof schema>;

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const propertyTypes = ["Single Family", "Duplex", "Mobile Home", "Apartment", "Other"] as const;
const timelines = ["ASAP", "1 month", "2-3 months", "6 months"] as const;

const totalSteps = 4;

const CashOfferIndianapolis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [form, setForm] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [gclid, setGclid] = useState("");

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
      "Sell your Indianapolis house fast for cash. Fair cash offer in as little as 10 minutes. No repairs, no commissions, no obligation. Local Indiana home buyers.",
    );
    setMeta("og:title", "Sell Your Indianapolis House Fast for Cash", "property");
    setMeta("og:description", "Fair cash offer in as little as 10 minutes. No repairs, no commissions, no obligation.", "property");
    setMeta("og:type", "website", "property");
    setMeta("twitter:card", "summary_large_image");

    const params = new URLSearchParams(window.location.search);
    setGclid(params.get("gclid") || "");
  }, []);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validateStep = (): boolean => {
    const fieldsByStep: Record<number, (keyof FormData)[]> = {
      1: ["propertyAddress", "isListed"],
      2: ["propertyType"],
      3: ["timeline", "reason"],
      4: ["fullName", "email", "phone"],
    };
    const fields = fieldsByStep[step];
    const partial = schema.pick(Object.fromEntries(fields.map((f) => [f, true])) as never).safeParse(form);
    if (!partial.success) {
      const fe: Partial<Record<keyof FormData, string>> = {};
      partial.error.errors.forEach((err) => {
        fe[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fe);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step === 1 && form.isListed === "yes") {
      navigate("/sorry");
      return;
    }
    if (step === 2 && form.propertyType && form.propertyType !== "Single Family") {
      navigate("/sorry");
      return;
    }
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fe: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        fe[err.path[0] as keyof FormData] = err.message;
      });
      setErrors(fe);
      return;
    }
    setSubmitting(true);
    try {
      const d = result.data;
      const { error } = await supabase.from("leads").insert({
        full_name: d.fullName,
        email: d.email,
        phone: d.phone,
        property_address: d.propertyAddress,
        is_listed: d.isListed === "yes",
        property_type: d.propertyType,
        timeline: d.timeline,
        reason: d.reason,
        message: d.reason,
        sms_consent: smsConsent,
      });
      if (error) throw error;

      await supabase.functions.invoke("send-lead-email", {
        body: {
          fullName: d.fullName,
          email: d.email,
          phone: d.phone,
          propertyAddress: d.propertyAddress,
          message: `Property type: ${d.propertyType}\nCurrently listed: ${d.isListed}\nTimeline: ${d.timeline}\nReason for selling: ${d.reason}`,
        },
      });

      track("lead_submitted", { email: d.email });
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "generate_lead", {
          event_category: "form",
          event_label: "cash_offer_form_indianapolis",
        });
      }

      try {
        const webhookBase = "https://services.leadconnectorhq.com/hooks/XOh4Z6pVhNdzqzXMFAfd/webhook-trigger/48fce442-7dd2-4f22-a5ae-ba6f316f971e";
        const webhookUrl = `${webhookBase}?propertyAddress=${encodeURIComponent(d.propertyAddress)}&isListed=${encodeURIComponent(d.isListed)}&propertyType=${encodeURIComponent(d.propertyType)}&timeline=${encodeURIComponent(d.timeline)}&reason=${encodeURIComponent(d.reason)}&fullName=${encodeURIComponent(d.fullName)}&email=${encodeURIComponent(d.email)}&phone=${encodeURIComponent(d.phone)}&gclid=${encodeURIComponent(gclid)}&source=${encodeURIComponent("indianapolis-landing")}`;
        await fetch(webhookUrl, { method: "GET" });
      } catch (webhookErr) {
        // Webhook failure should not block the user-facing submission flow.
      }

      navigate("/thank-you", { state: { fromSubmit: true } });
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const progress = (step / totalSteps) * 100;

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
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2 text-xs text-muted-foreground font-medium">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {step === 1 && (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">About your property</h2>
                      <p className="text-sm text-muted-foreground">Where's the home you'd like an offer on?</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Property Address *</label>
                      <Input
                        placeholder="123 Main St, Indianapolis, IN"
                        value={form.propertyAddress || ""}
                        onChange={(e) => update("propertyAddress", e.target.value)}
                      />
                      {errors.propertyAddress && <p className="text-destructive text-xs mt-1">{errors.propertyAddress}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Is your home currently listed? *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["yes", "no"] as const).map((opt) => (
                          <ChoiceCard
                            key={opt}
                            label={opt === "yes" ? "Yes" : "No"}
                            selected={form.isListed === opt}
                            onClick={() => update("isListed", opt)}
                          />
                        ))}
                      </div>
                      {errors.isListed && <p className="text-destructive text-xs mt-1">{errors.isListed}</p>}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">Property type</h2>
                      <p className="text-sm text-muted-foreground">What type of property are you selling?</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypes.map((t) => (
                        <ChoiceCard
                          key={t}
                          label={t}
                          selected={form.propertyType === t}
                          onClick={() => update("propertyType", t)}
                        />
                      ))}
                    </div>
                    {errors.propertyType && <p className="text-destructive text-xs mt-1">{errors.propertyType}</p>}
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">Your timeline</h2>
                      <p className="text-sm text-muted-foreground">When are you hoping to sell?</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Timeline *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {timelines.map((t) => (
                          <ChoiceCard
                            key={t}
                            label={t}
                            selected={form.timeline === t}
                            onClick={() => update("timeline", t)}
                          />
                        ))}
                      </div>
                      {errors.timeline && <p className="text-destructive text-xs mt-1">{errors.timeline}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Why are you looking to sell? *</label>
                      <Textarea
                        placeholder="A short sentence or two helps us prepare the best offer."
                        rows={4}
                        value={form.reason || ""}
                        onChange={(e) => update("reason", e.target.value)}
                      />
                      {errors.reason && <p className="text-destructive text-xs mt-1">{errors.reason}</p>}
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">Your contact info</h2>
                      <p className="text-sm text-muted-foreground">Where should we send your offer?</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                      <Input
                        placeholder="John Smith"
                        value={form.fullName || ""}
                        onChange={(e) => update("fullName", e.target.value)}
                      />
                      {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address *</label>
                        <Input
                          type="email"
                          placeholder="john@email.com"
                          value={form.email || ""}
                          onChange={(e) => update("email", e.target.value)}
                        />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                        <Input
                          type="tel"
                          placeholder="(317) 555-0123"
                          value={form.phone || ""}
                          onChange={(e) => update("phone", formatPhoneNumber(e.target.value))}
                        />
                        {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="sms-consent"
                        checked={smsConsent}
                        onCheckedChange={(checked) => setSmsConsent(checked === true)}
                        className="mt-1"
                      />
                      <label htmlFor="sms-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        By checking this box, you agree to receive text messages from <strong>Stax Investments LLC</strong> at the cell number used when signing up. Consent is not a condition of any purchase. Reply STOP to unsubscribe, HELP for help. Message &amp; data rates may apply. I have read and agree with the{" "}
                        <Link to="/terms-and-conditions" className="text-primary underline hover:text-primary/80">Terms &amp; Conditions</Link>
                        {" "}&amp;{" "}
                        <Link to="/privacy-policy" className="text-primary underline hover:text-primary/80">Privacy Policy</Link>.
                      </label>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={back}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
              ) : (
                <Link to="/">
                  <Button type="button" variant="ghost" className="hover:text-destructive hover:bg-destructive/10">
                    <ArrowLeft className="mr-2 w-4 h-4" /> Cancel
                  </Button>
                </Link>
              )}

              {step < totalSteps ? (
                <Button type="button" onClick={next}>
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : <>Get My Cash Offer <Send className="ml-2 w-4 h-4" /></>}
                </Button>
              )}
            </div>
          </form>

          <p className="text-xs text-muted-foreground text-center leading-relaxed mt-6 max-w-md mx-auto">
            By submitting this form, you consent to receive calls, emails, and text messages from <strong>Stax Investments LLC</strong> regarding your property inquiry. Consent is not a condition of any purchase or sale.
          </p>
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

      {/* TRUST BAR */}
      <section className="py-8 border-y border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 justify-center">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">{label}</span>
            </div>
          ))}
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
              { n: "03", icon: Check, t: "Close On Your Timeline", d: "Pick your closing date. We handle the details. You get paid." },
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

      {/* STICKY CTA FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
          <Button
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full md:w-auto md:min-w-[280px] px-6 py-5 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Cash Offer <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>



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

      <Footer />
    </div>
  );
};

const ChoiceCard = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center justify-between text-left px-4 py-3.5 rounded-xl border transition-all ${
      selected
        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
        : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
    }`}
  >
    <span className={`text-sm font-medium ${selected ? "text-foreground" : "text-foreground/80"}`}>{label}</span>
    {selected && (
      <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 text-primary-foreground" />
      </span>
    )}
  </button>
);

export default CashOfferIndianapolis;
