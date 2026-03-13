const Footer = () => (
  <footer className="bg-foreground py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">S</span>
          </div>
          <span className="font-display text-sm font-bold text-background">Stax Investments LLC</span>
        </div>
        <p className="text-sm text-background/60">
          © {new Date().getFullYear()} Stax Investments LLC. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
