import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const validDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com", "mail.com", "protonmail.com", "zoho.com", "yandex.com", "live.com", "msn.com", "comcast.net", "att.net", "verizon.net", "me.com", "mac.com"];

const hasValidDomain = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  // Accept known domains or any domain with a dot (e.g. company.com)
  if (validDomains.includes(domain)) return true;
  const parts = domain.split(".");
  return parts.length >= 2 && parts[parts.length - 1].length >= 2;
};

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255).refine(hasValidDomain, "Please enter a valid email domain"),
  phone: z.string().trim().min(14, "Please enter a complete phone number").max(20),
  propertyAddress: z.string().trim().min(1, "Property address is required").max(500),
  message: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const ContactForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    if (field === "phone") {
      value = formatPhoneNumber(value);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ fullName: "", email: "", phone: "", propertyAddress: "", message: "" });
      navigate("/thank-you");
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get Started</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
                Get Your Fair Cash Offer Today
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Fill out the form and a member of our team will get back to you within 24 hours with a no obligation cash offer.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">Serving homeowners nationwide</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <a href="mailto:staxxentine@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">staxxentine@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <a href="tel:+12344371980" className="text-muted-foreground hover:text-foreground transition-colors">(234) 437-1980</a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                  <Input placeholder="John Smith" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                  {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address *</label>
                  <Input type="email" placeholder="john@email.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                  <Input type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Property Address *</label>
                  <Input placeholder="123 Main St, City, State" value={form.propertyAddress} onChange={(e) => handleChange("propertyAddress", e.target.value)} />
                  {errors.propertyAddress && <p className="text-destructive text-xs mt-1">{errors.propertyAddress}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Additional Details (optional)</label>
                <Textarea placeholder="Tell us about your property or situation..." rows={4} value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
              </div>

              <Button type="submit" size="lg" className="w-full py-6 text-base" disabled={submitting}>
                {submitting ? "Submitting..." : <>Get Your Cash Offer Now <Send className="ml-2 w-4 h-4" /></>}
              </Button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                By submitting this form, you consent to receive calls, emails, and text messages from <strong>Stax Investments LLC</strong> regarding your property inquiry. Consent is not a condition of any purchase or sale.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
