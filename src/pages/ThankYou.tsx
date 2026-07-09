import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
  Phone,
  ClipboardCheck,
  PhoneCall,
  HandCoins,
  Zap,
  ShieldCheck,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import heroImage from "@/assets/thank-you-hero.png.asset.json";

const steps = [
  {
    icon: ClipboardCheck,
    title: "We Review Your Property",
    text: "Our team looks at your details and puts together a fair cash offer.",
  },
  {
    icon: PhoneCall,
    title: "We Reach Out",
    text: "You'll hear from us by text or phone within 10 minutes.",
  },
  {
    icon: HandCoins,
    title: "Discuss Your Offer",
    text: "We walk you through your personalized cash offer, no pressure.",
  },
];

const trustItems = [
  { icon: Zap, label: "Fast Response" },
  { icon: ShieldCheck, label: "No Pressure" },
  { icon: DollarSign, label: "Fair Cash Offer" },
];

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero success banner */}
      <section className="relative overflow-hidden">
        <div className="relative h-[280px] md:h-[360px] w-full">
          <img
            src={heroImage.url}
            alt="Happy homeowners handing over house keys"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-overlay)/0.55)] via-[hsl(var(--hero-overlay)/0.35)] to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.35)] to-transparent" />
        </div>

        {/* Success card overlapping hero */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative -mt-24 md:-mt-28 max-w-2xl mx-auto bg-card rounded-3xl border border-border shadow-2xl px-6 md:px-10 py-8 md:py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-primary/10 ring-8 ring-primary/5 flex items-center justify-center mx-auto mb-5"
            >
              <CheckCircle2 className="w-11 h-11 text-primary" strokeWidth={2.25} />
            </motion.div>

            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.18em] mb-3">
              Submission Received
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Thank You!
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              We've received your information and a member of our team will reach out to you via text within the next{" "}
              <strong className="text-foreground">10 minutes</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-12 md:pt-16 pb-20 md:pb-24">
          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.18em]">
                The Next Step
              </span>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-foreground">
                What Happens Next
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reassurance card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mt-14"
          >
            <div className="bg-gradient-to-br from-secondary to-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Keep an eye on your phone</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We'll text you shortly to discuss your property and walk you through your personalized cash offer.
                  </p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Want to talk sooner?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Give us a call anytime at{" "}
                    <a
                      href="tel:+12344371980"
                      className="text-primary font-semibold hover:underline"
                    >
                      (234) 437-1980
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <div className="max-w-3xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
            >
              <a href="tel:+12344371980">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="max-w-3xl mx-auto mt-14 pt-8 border-t border-border">
            <div className="grid grid-cols-3 gap-4">
              {trustItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center sm:text-left"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
