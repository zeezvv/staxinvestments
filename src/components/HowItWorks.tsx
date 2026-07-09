import { motion } from "framer-motion";
import { Home, DollarSign, KeyRound } from "lucide-react";

const steps = [
  {
    icon: Home,
    step: "01",
    title: "Tell Us About The Property",
    description: "Share a few quick details about your house. It only takes about a minute and there's no obligation.",
  },
  {
    icon: DollarSign,
    step: "02",
    title: "Get A Fair Cash Offer",
    description: "We'll review your property and send over a fair, no obligation cash offer within 24 hours.",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Choose Your Closing Date & Get Paid",
    description: "Pick a closing date that works for you. At closing you get paid cash with zero fees.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 section-gradient">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple Process</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          How It Works
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Selling your home shouldn't be stressful. Our 3 step process makes it easy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
        {steps.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all"
          >
            <div className="absolute top-4 right-5 text-5xl font-black text-primary/30 leading-none select-none">
              {item.step}
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
