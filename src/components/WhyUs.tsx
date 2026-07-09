import { motion } from "framer-motion";
import { Home, Ban, EyeOff, Zap, CalendarCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import soldHighFive from "@/assets/sold-highfive.png.asset.json";

const reasons = [
  { icon: Home, title: "Sell As-Is", desc: "No cleaning, no staging, no repairs. We buy your house in its current condition." },
  { icon: Ban, title: "No Realtor Fees", desc: "Zero commissions and zero hidden charges. We even cover the closing costs." },
  { icon: EyeOff, title: "No Showings", desc: "Skip the open houses and constant walk-throughs. One visit is all we need." },
  { icon: Zap, title: "Fast Cash Offer", desc: "Get a fair, no obligation cash offer on your property within 24 hours." },
  { icon: CalendarCheck, title: "Close When You're Ready", desc: "Close in as little as 7 days or on a timeline that works best for you." },
];

const WhyUs = () => (
  <section id="why-us" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 max-w-2xl mx-auto"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          Why Sell To Stax Home Buyers?
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          We've helped hundreds of homeowners sell quickly and move forward with confidence.
        </p>
      </motion.div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
              <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-10 rounded-3xl overflow-hidden shadow-2xl border border-border relative"
      >
        <img
          src={soldHighFive.url}
          alt="Happy couple high-fiving in front of their sold home"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link to="/cash-offer">
          <Button size="lg" className="text-base px-8 py-6 font-semibold">
            I Want A Cash Offer Now! <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default WhyUs;
