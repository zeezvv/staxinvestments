import { motion } from "framer-motion";
import { FileText, CalendarDays, Banknote } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "Step 1",
    title: "Get a Fair Offer in 24 Hours",
    description: "Tell us about your property and we'll provide a no obligation cash offer within 24 hours. It's quick, easy, and completely free.",
  },
  {
    icon: CalendarDays,
    step: "Step 2",
    title: "Pick Your Closing Date",
    description: "You choose when to close. Whether that's as fast as 7 days or on a timeline that works best for you. We're flexible and work around your schedule.",
  },
  {
    icon: Banknote,
    step: "Step 3",
    title: "Get Paid Cash",
    description: "At closing, you get paid cash with zero fees. We cover all closing costs, so you walk away with more money in your pocket.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 section-gradient">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Simple Process</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          How We Buy Your Home
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
          Selling your home shouldn't be stressful. Our 3 step process makes it easy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <item.icon className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{item.step}</span>
            <h3 className="font-display text-xl font-bold mt-2 mb-3 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
