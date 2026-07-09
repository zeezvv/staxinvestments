import { motion } from "framer-motion";
import { Wrench, Percent, CalendarClock } from "lucide-react";

const benefits = [
  {
    icon: Wrench,
    title: "No Repairs Needed",
    desc: "Skip the contractors and cleanup. We buy your house exactly as it sits today.",
  },
  {
    icon: Percent,
    title: "No Agent Commissions",
    desc: "Keep more of your sale. There are zero realtor fees or hidden closing charges.",
  },
  {
    icon: CalendarClock,
    title: "Fast & Flexible Closing",
    desc: "Close in as little as 7 days or pick a date that fits your schedule.",
  },
];

const BenefitCards = () => (
  <section className="py-10 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto -mt-16 md:-mt-24 relative z-10">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <b.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitCards;
