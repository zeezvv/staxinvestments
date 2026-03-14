import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-house.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Beautiful suburban home at sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative container mx-auto px-4 pt-20 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-primary/20 text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-primary/30">
              Trusted Home Buyers in Your Area
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ color: 'hsl(0 0% 100%)' }}>
              Sell Your Home Fast.{" "}
              <span className="text-gradient">No Repairs. No Fees.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto" style={{ color: 'hsl(0 0% 85%)' }}>
              We buy houses in any condition. Get a fair cash offer within 24 hours and close on your timeline. It's that simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToContact} className="text-base px-8 py-6">
                Get Your Cash Offer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a href="tel:+12344371980">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-card/10 backdrop-blur-sm border-primary-foreground/30 hover:bg-card/20" style={{ color: 'hsl(0 0% 100%)' }}>
                  Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex gap-8 justify-center"
          >
            {[
              { number: "500+", label: "Homes Purchased" },
              { number: "7 Days", label: "Quick Closings" },
              { number: "$0", label: "Fees or Commissions" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold" style={{ color: 'hsl(0 0% 100%)' }}>{stat.number}</div>
                <div className="text-sm" style={{ color: 'hsl(0 0% 70%)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
