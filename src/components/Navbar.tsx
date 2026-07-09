import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import staxLogo from "@/assets/stax-logo-full.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const linkClass =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="relative z-40 bg-background border-b border-border/60">
      <div className="container mx-auto px-4 flex items-center justify-between h-14 md:h-16">
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition-opacity shrink-0"
          aria-label="Stax Investments LLC - Home"
        >
          <img
            src={staxLogo}
            alt="Stax Investments LLC"
            className="h-11 md:h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button onClick={() => scrollTo("how-it-works")} className={linkClass}>How It Works</button>
          <button onClick={() => scrollTo("why-us")} className={linkClass}>Sell As-Is</button>
          <button onClick={() => scrollTo("who-we-are")} className={linkClass}>About Us</button>
          <button onClick={() => scrollTo("contact")} className={linkClass}>Contact</button>
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a href="tel:+12344371980" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="w-4 h-4" />
            (234) 437-1980
          </a>
          <Link to="/cash-offer"><Button size="sm">Get Cash Offer</Button></Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <a
            href="tel:+12344371980"
            aria-label="Call Stax Home Buyers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary px-2 py-1"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          <button
            className="text-foreground p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-3 space-y-2">
          <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">How It Works</button>
          <button onClick={() => scrollTo("why-us")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">Sell As-Is</button>
          <button onClick={() => scrollTo("who-we-are")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">About Us</button>
          <button onClick={() => scrollTo("contact")} className="block w-full text-left text-sm font-medium text-muted-foreground py-2">Contact</button>
          <Link to="/cash-offer" className="block pt-1"><Button className="w-full" size="sm">Get Cash Offer</Button></Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
