import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroAsset from "@/assets/hero-house-new.png.asset.json";

const trustPoints = ["Sell As-Is", "Close On Your Timeline", "$0 Fees or Commissions"];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src={heroAsset.url}
          alt="Modern suburban home ready for a fast cash sale"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span
            className="inline-block bg-primary/20 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-primary/40"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Trusted Local Cash Home Buyers
          </span>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Sell Your House{" "}
            <span className="block">Fast For Cash</span>
          </h1>

          <p
            className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
            style={{ color: "hsl(0 0% 88%)" }}
          >
            No repairs. No realtor fees. No hassle. Get a fair cash offer and close on your timeline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/cash-offer">
              <Button size="lg" className="text-base px-8 py-6 font-semibold">
                Get My Cash Offer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+12344371980">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 font-semibold bg-card/10 backdrop-blur-sm border-primary-foreground/40 hover:bg-card/20"
                style={{ color: "hsl(0 0% 100%)" }}
              >
                Call Us Now
              </Button>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center">
                  <Check className="w-3 h-3" style={{ color: "hsl(0 0% 100%)" }} />
                </span>
                <span className="text-sm font-medium" style={{ color: "hsl(0 0% 92%)" }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
