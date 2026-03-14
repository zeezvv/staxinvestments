import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import staxLogo from "@/assets/stax-logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <img src={staxLogo} alt="Stax Investments LLC" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display text-lg font-bold text-foreground">Stax Investments</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
          <button onClick={() => scrollTo("why-us")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Us</button>
          <button onClick={() => scrollTo("testimonials")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</button>
          <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+12344371980" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="w-4 h-4" />
            (234) 437-1980
          </a>
          <Button onClick={() => scrollTo("contact")} size="sm">Get Cash Offer</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">How It Works</button>
          <button onClick={() => scrollTo("why-us")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">Why Us</button>
          <button onClick={() => scrollTo("testimonials")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">Testimonials</button>
          <a href="tel:+12344371980" className="block w-full text-left text-sm font-medium text-primary py-2">
            (234) 437-1980
          </a>
          <Button onClick={() => scrollTo("contact")} className="w-full" size="sm">Get Cash Offer</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
