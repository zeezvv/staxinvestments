import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, ArrowRight, Clock, ShieldCheck, DollarSign } from "lucide-react";

const ContactForm = () => {
  return (
  <section id="contact" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10 items-center">
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
                Answer a few quick questions about your property and a member of our team will get back to you within 24 hours with a no obligation cash offer.
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
                <a href="mailto:leads@staxhomebuyers.com" className="text-muted-foreground hover:text-foreground transition-colors">leads@staxhomebuyers.com</a>
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
            <div className="bg-card rounded-2xl p-8 md:p-10 border border-border shadow-sm text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Ready to see your cash offer?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                It only takes about a minute. Tell us a little about your property and we'll take care of the rest.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { icon: Clock, label: "Takes ~1 minute" },
                  { icon: DollarSign, label: "No fees or commissions" },
                  { icon: ShieldCheck, label: "No obligation" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-primary/5">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>

              <Link to="/cash-offer" className="block">
                <Button size="lg" className="w-full py-6 text-base">
                  Get Cash Offer <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Your information stays private. We'll only use it to prepare your offer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
