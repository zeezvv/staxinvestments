import { motion } from "framer-motion";
import { Star } from "lucide-react";
import mitchellAsset from "@/assets/mitchell.png.asset.json";

const testimonials = [
  {
    name: "Mitchell A.",
    location: "Detroit, MI",
    text: "Stax Home Buyers made selling our home so easy. They were professional, fair, and we closed when we needed to. Couldn't recommend them enough!",
    avatar: mitchellAsset.url,
    date: "3 months ago",
  },
  {
    name: "Susan C.",
    location: "Cavendish, VT.",
    text: "I was behind on medical payments and felt stuck. They gave me a fair offer and took care of everything. I finally have peace of mind.",
    avatar: null,
    date: "7 months ago",
  },
  {
    name: "James",
    location: "Middletown, OH",
    text: "I'm getting old and needed my rental properties sold quickly, and these guys really helped me out. No repairs, no realtor fees, and a fast close. The whole process was smooth from start to finish. These guys are the real deal!",
    avatar: null,
    date: "1 week ago",
  },
];

const avatarColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-purple-500",
];

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Testimonials = () => (
  <section id="testimonials" className="py-16 section-gradient">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
          Hear From Happy Home Sellers
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold ${
                    avatarColors[i % avatarColors.length]
                  }`}
                >
                  {initials(t.name)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground leading-tight">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.location}</div>
              </div>
              <GoogleLogo />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#fbbc04] text-[#fbbc04]" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{t.date}</span>
            </div>

            <p className="text-foreground leading-relaxed text-sm">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
