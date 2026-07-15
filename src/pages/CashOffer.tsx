import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Send, ShieldCheck, Clock, DollarSign, Home, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { track } from "@vercel/analytics";
import Footer from "@/components/Footer";
import heroImage from "@/assets/cash-offer-hero.png.asset.json";
import mitchellAsset from "@/assets/mitchell.png.asset.json";

const carouselTestimonials = [
  {
    name: "Mitchell A.",
    location: "Detroit, MI",
    text: "Stax Home Buyers made selling our home so easy. They were professional, fair, and we closed when we needed to. Couldn't recommend them enough!",
    avatar: mitchellAsset.url,
    date: "3 months ago",
  },
  {
    name: "Susan C.",
    location: "Cavendish, VT.",
    text: "I was behind on medical payments and felt stuck. They gave me a fair offer and took care of everything. I finally have peace of mind.",
    avatar: null,
    date: "7 months ago",
  },
  {
    name: "James",
    location: "Middletown, OH",
    text: "I'm getting old and needed my rental properties sold quickly, and these guys really helped me out. No repairs, no realtor fees, and a fast close. The whole process was smooth from start to finish. These guys are the real deal!",
    avatar: null,
    date: "1 week ago",
  },
];

const carouselAvatarColors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500"];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const initialsOf = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

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
  email: z.union([
    z.literal(""),
    z.string().trim().email("Please enter a valid email").max(255).refine(hasValidDomain, "Please enter a valid email domain"),
  ]),
  phone: z.string().trim().min(14, "Please enter a complete phone number").max(20),
  propertyAddress: z.string().trim().min(1, "Property address is required").max(500)
    .refine((v) => /^\d+\s+[A-Za-z0-9.'\-]+/.test(v.trim()), "Please enter a street address (e.g. 123 Main St)")
    .refine(
      (v) => {
        // Require a city OR state OR ZIP in addition to the street.
        // Strip the leading "<number> <street-word>" and see if anything meaningful remains.
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

const CashOffer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [form, setForm] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [gclid, setGclid] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGclid(params.get("gclid") || "");
    // Scroll straight to the form so users land on it, not mid-page.
    requestAnimationFrame(() => {
      document.getElementById("offer-form")?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, []);

  const activeTestimonial = carouselTestimonials[testimonialIdx];
  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i - 1 + carouselTestimonials.length) % carouselTestimonials.length);
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % carouselTestimonials.length);

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

  const submit = async (e: React.FormEvent) => {
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
          event_label: "cash_offer_form",
        });
      }

      try {
        const webhookBase = "https://services.leadconnectorhq.com/hooks/XOh4Z6pVhNdzqzXMFAfd/webhook-trigger/48fce442-7dd2-4f22-a5ae-ba6f316f971e";
        const webhookUrl = `${webhookBase}?propertyAddress=${encodeURIComponent(d.propertyAddress)}&isListed=${encodeURIComponent(d.isListed)}&propertyType=${encodeURIComponent(d.propertyType)}&timeline=${encodeURIComponent(d.timeline)}&reason=${encodeURIComponent(d.reason)}&fullName=${encodeURIComponent(d.fullName)}&email=${encodeURIComponent(d.email)}&phone=${encodeURIComponent(d.phone)}&gclid=${encodeURIComponent(gclid)}`;
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
      <section className="relative w-full">
        <div className="relative h-[360px] md:h-[480px] lg:h-[520px] w-full overflow-hidden">
          <img
            src={heroImage.url}
            alt="Beautiful home ready for a fair cash offer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="relative z-10 max-w-6xl mx-auto h-full px-4 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 backdrop-blur px-4 py-1.5 rounded-full w-fit">
              <Home className="w-3.5 h-3.5" /> Cash Offer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-foreground leading-tight max-w-2xl">
              Get Your Fair <span className="text-primary">Cash Offer</span> Today
            </h1>
            <p className="text-foreground mt-4 max-w-xl text-base md:text-lg leading-relaxed">
              Answer a few quick questions and we'll be in touch within 24 hours with a no obligation offer on your home.
            </p>
          </div>
        </div>

        <div id="offer-form" className="relative z-20 mt-4 md:mt-6 max-w-2xl mx-auto px-4 pb-8 scroll-mt-4">
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

          <form onSubmit={submit} className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
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
                        placeholder="123 Main St, City, State"
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
                          placeholder="(555) 123-4567"
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

          <p className="text-xs text-muted-foreground text-center leading-relaxed mt-2 max-w-md mx-auto">
            By submitting this form, you consent to receive calls, emails, and text messages from <strong>Stax Investments LLC</strong> regarding your property inquiry. Consent is not a condition of any purchase or sale.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm mx-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  {activeTestimonial.avatar ? (
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold ${carouselAvatarColors[testimonialIdx % carouselAvatarColors.length]}`}
                    >
                      {initialsOf(activeTestimonial.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground leading-tight">{activeTestimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{activeTestimonial.location}</div>
                  </div>
                  <GoogleLogo />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{activeTestimonial.date}</span>
                </div>
                <p className="text-foreground leading-relaxed text-sm">{activeTestimonial.text}</p>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {carouselTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTestimonialIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === testimonialIdx ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        {/* What happens next */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="text-center mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">The Process</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-foreground">What happens after you submit</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: "01", title: "We review your property", desc: "Our local team looks over the details you shared and pulls together comparable homes in your area." },
              { step: "02", title: "You get a fair cash offer", desc: "Within 24 hours we'll reach out with a no obligation offer based on the current condition of your home." },
              { step: "03", title: "Close on your timeline", desc: "Pick a closing date that works for you. We handle the paperwork and cover typical closing costs." },
            ].map((s) => (
              <div key={s.step} className="bg-card rounded-2xl p-5 border border-border relative">
                <div className="text-4xl font-bold text-primary/20 mb-2">{s.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>


        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-4 mb-12">
          <div className="text-center mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Common Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-foreground">Good to know before you submit</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Is there any cost or obligation?", a: "No. The offer is completely free and there is no obligation to accept. Take the time you need to review it." },
              { q: "Do I need to make repairs first?", a: "Not at all. We buy homes in their current condition. You don't have to clean, repair, or stage anything." },
              { q: "How quickly can we close?", a: "We can often close in as little as seven days, or we can wait until a date that works better for you." },
              { q: "Are there fees or commissions?", a: "No agent fees, no commissions, and we typically cover standard closing costs." },
            ].map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-1.5">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
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

export default CashOffer;
