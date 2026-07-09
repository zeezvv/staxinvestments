import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-10 md:p-16 text-center shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, hsl(0 0% 100%) 1px, transparent 1px), radial-gradient(circle at 80% 60%, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Ready To Get A Fair Cash Offer?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mt-5 max-w-2xl mx-auto">
            Tell us about your property and we'll reach out with the next steps. It only takes about a minute and there's zero obligation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cash-offer">
              <Button size="lg" variant="secondary" className="text-base px-8 py-6 font-semibold">
                Get My Cash Offer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+12344371980">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 font-semibold bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Phone className="mr-2 w-5 h-5" /> (234) 437-1980
              </Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
