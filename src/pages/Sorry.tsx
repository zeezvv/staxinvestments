import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";

const Sorry = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full bg-card border border-border rounded-2xl shadow-sm p-8 md:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Home className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            We're not the right fit right now
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            We specialize in off market single family homes, not listed homes. If
            things change, feel free to contact us again and we'd be happy to
            take another look.
          </p>
          <Link to="/">
            <Button size="lg" className="mt-2">Back to home</Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Sorry;
