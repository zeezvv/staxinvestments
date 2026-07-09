import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { track } from "@vercel/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  propertyAddress: z.string().trim().min(1, "Property address is required").max(500),
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
    if (validateStep()) setStep((s) => Math.min(s + 1, totalSteps));
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
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Cash Offer</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
              Get Your Fair Cash Offer
            </h1>
            <p className="text-muted-foreground mt-3">
              Answer a few quick questions and we'll be in touch within 24 hours.
            </p>
          </div>

          <div className="mb-6">
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
                  <Button type="button" variant="ghost">
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
        </div>
      </main>
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
