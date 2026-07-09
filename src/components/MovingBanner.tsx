import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import movingImg from "@/assets/family-moving.png.asset.json";

const MovingBanner = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Move Forward With Ease</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground leading-tight">
            Focus On Your Next Chapter, We'll Handle The Rest
          </h2>
          <p className="text-lg text-muted-foreground mt-5 leading-relaxed">
            Selling should feel like a fresh start, not a burden. We take care of the paperwork, the title, and the closing so you and your family can pack up and move forward on your own timeline.
          </p>
          <Link to="/cash-offer" className="inline-block mt-8">
            <Button size="lg" className="text-base px-8 py-6 font-semibold">
              Get My Cash Offer <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={movingImg.url}
              alt="Happy family unpacking boxes in their new home"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MovingBanner;
