import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center space-y-8"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Thank You!
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We've received your information and a member of our team will reach out to you via text within the next <strong className="text-foreground">10 minutes</strong>.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Keep an eye on your phone! We'll text you shortly to discuss your property and walk you through your personalized cash offer.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Want to talk sooner? Give us a call anytime at{" "}
              <a href="tel:+12344371980" className="text-primary font-medium hover:underline">(234) 437-1980</a>.
            </p>
          </div>
        </div>

        <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default ThankYou;
