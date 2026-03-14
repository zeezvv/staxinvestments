import { motion } from "framer-motion";
import { ShieldCheck, Clock, DollarSign, Home, Heart, Handshake } from "lucide-react";

const reasons = [
  { icon: DollarSign, title: "No Costly Repairs", desc: "We buy your house as is. No need to spend money fixing anything up before selling." },
  { icon: Clock, title: "Close on Your Timeline", desc: "Whether you need to close in as little as 7 days or prefer up to 60 days, we work on your schedule." },
  { icon: ShieldCheck, title: "Zero Fees or Commissions", desc: "No realtor fees, no hidden charges. We pay all closing costs so you keep more money." },
  { icon: Heart, title: "Stress Free Experience", desc: "We handle all the paperwork and logistics. You just sit back and let us take care of everything." },
  { icon: Home, title: "Any Condition, Any Situation", desc: "Foreclosure, inherited property, divorce, whatever your situation, we're here to help." },
  { icon: Handshake, title: "Fair & Honest Offers", desc: "We provide transparent, competitive cash offers based on current market conditions." },
];

const WhyUs = () => (
  <section id="why-us" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why Choose Us</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          Why Sell to Stax Investments?
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
          We've helped hundreds of homeowners sell quickly and move forward with confidence.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reasons.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
          >
            <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
