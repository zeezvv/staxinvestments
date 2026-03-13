import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael G.",
    location: "Phoenix, AZ",
    text: "Stax Investments made selling our home so easy. They were professional, fair, and we closed in just two weeks. Couldn't recommend them enough!",
  },
  {
    name: "Sarah T.",
    location: "Houston, TX",
    text: "I was behind on payments and felt stuck. They gave me a fair offer and took care of everything. I finally have peace of mind.",
  },
  {
    name: "James R.",
    location: "Atlanta, GA",
    text: "No repairs, no realtor fees, and a fast close. The whole process was smooth from start to finish. These guys are the real deal.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 section-gradient">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          Hear From Happy Homeowners
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
            <div>
              <div className="font-bold text-foreground">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.location}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
