import { motion } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  ArrowLeft,
  ClipboardCheck,
  PhoneCall,
  HandCoins,
  Zap,
  ShieldCheck,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Footer from "@/components/Footer";
import heroImage from "@/assets/thank-you-hero.png.asset.json";

const steps = [
  {
    icon: ClipboardCheck,
    title: "We Review Your Property",
    text: "Our team looks over your details and prepares the next step.",
  },
  {
    icon: PhoneCall,
    title: "We Reach Out",
    text: "You'll hear from us by text or phone within 10 minutes.",
  },
  {
    icon: HandCoins,
    title: "We Discuss Your Offer",
    text: "We walk you through how a deal would look like with us.",
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
      {/* Full-bleed hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={heroImage.url}
          alt="Homeowner handing keys to a Stax Investments buyer in front of a sold home"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.35)] via-transparent to-transparent" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              Submission Received
            </span>

            <div className="mt-6 flex items-center gap-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                className="w-16 h-16 rounded-2xl bg-primary/90 flex items-center justify-center shrink-0 shadow-xl shadow-primary/40"
              >
                <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
              </motion.div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none drop-shadow-lg">
                Thank You!
              </h1>
            </div>

            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl drop-shadow">
              We've received your information and a member of our team will reach out by text within the next{" "}
              <strong className="text-white">10 minutes</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 text-base font-semibold"
              >
                <a href="tel:+12344371980">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us Now
                </a>
              </Button>
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="w-full sm:w-auto h-12 px-7 text-base font-semibold bg-white/10 hover:bg-white/20 text-white ring-1 ring-white/40 backdrop-blur"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 md:py-20 section-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.18em]">
              The Next Step
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              What Happens Next
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              A simple, no-pressure process from here to your cash offer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative bg-card rounded-3xl border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="absolute top-6 right-6 font-display text-5xl font-extrabold text-primary/10 leading-none">
                  0{i + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" strokeWidth={2} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact reassurance card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-14"
          >
            <div className="relative overflow-hidden rounded-3xl bg-card text-card-foreground p-8 md:p-12 shadow-xl border border-border">
              <div className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Want to talk sooner?
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-muted-foreground">
                    Give us a call anytime at{" "}
                    <a href="tel:+12344371980" className="font-semibold text-foreground underline-offset-4 hover:underline">
                      (234) 437-1980
                    </a>
                    .
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-7 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-base font-semibold shrink-0"
                >
                  <a href="tel:+12344371980">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Trust strip */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-3 gap-4">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm md:text-base font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ThankYou;
