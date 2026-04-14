import { Link } from "react-router-dom";
import staxLogo from "@/assets/stax-logo.png";

const Footer = () => (
  <footer className="bg-foreground py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={staxLogo} alt="Stax Investments LLC" className="w-7 h-7 rounded-md object-cover" />
          <span className="font-display text-sm font-bold text-background">Stax Investments LLC</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-background/60 hover:text-background transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="text-sm text-background/60 hover:text-background transition-colors">
            Terms & Conditions
          </Link>
        </div>
        <p className="text-sm text-background/60">
          © {new Date().getFullYear()} Stax Investments LLC. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
