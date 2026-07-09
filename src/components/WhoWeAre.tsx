import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import houseImg from "@/assets/sold-house.png.asset.json";

const points = [
  "Local cash buyers you can actually reach",
  "Fair, transparent offers with no lowballs",
  "We handle paperwork, title, and closing costs",
];

const WhoWeAre = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src={houseImg.url} alt="Sold house with Stax Home Buyers sign in front yard" className="w-full h-full object-cover aspect-[4/3]" />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 bg-card rounded-2xl p-5 shadow-xl border border-border max-w-[220px]">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Homeowners helped nationwide</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">WHAT WE DO!</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground leading-tight">
            Fast, Fair Cash Offers For Your House
          </h2>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            At Stax Home Buyers, we make selling your house simple. We buy homes in any condition and help homeowners move forward without the stress of listing, repairs, or waiting months for a buyer.
          </p>

          <div className="mt-6 space-y-3">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{p}</span>
              </div>
            ))}
          </div>

          <Link to="/cash-offer" className="inline-block mt-8">
            <Button size="lg" className="text-base px-8 py-6 font-semibold">
              Get A Cash Offer Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhoWeAre;
