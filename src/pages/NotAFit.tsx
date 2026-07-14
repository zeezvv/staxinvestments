import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";

const NotAFit = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full bg-card border border-border rounded-2xl shadow-sm p-8 md:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Home className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Thanks for reaching out
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We focus exclusively on single-family homes in the Indianapolis area, and we typically work with sellers whose properties aren't currently listed with an agent.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If your situation changes, your listing expires, or you have a single-family property to sell, we'd love to help. Feel free to come back and fill out the form anytime.
          </p>
          <Link to="/cash-offer-indianapolis#lead-form">
            <Button size="lg" className="mt-2">Back to home</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotAFit;
