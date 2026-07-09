import { motion } from "framer-motion";
import { Home, AlertCircle, Building2, Heart, Hammer, Truck } from "lucide-react";

const situations = [
  { icon: Home, title: "Inherited Property", desc: "Skip probate headaches and turn an inherited home into cash." },
  { icon: AlertCircle, title: "Behind On Payments", desc: "Avoid foreclosure and protect your credit with a fast sale." },
  { icon: Building2, title: "Tired Landlord", desc: "Done with tenants and repairs? We'll take the property off your hands." },
  { icon: Heart, title: "Divorce", desc: "Sell quickly and privately so both parties can move forward." },
  { icon: Hammer, title: "Repairs Needed", desc: "Major repairs? No problem. We buy houses in any condition." },
  { icon: Truck, title: "Moving Quickly", desc: "Relocating for work or family? Close on a date that fits your move." },
];

const Situations = () => (
  <section className="py-24 bg-secondary/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-2xl mx-auto"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Situations We Help With</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          We Help Homeowners In All Situations
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Whatever brought you here, we've helped homeowners like you find a simple way forward.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {situations.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Situations;
