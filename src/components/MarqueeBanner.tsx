const items = [
  "Sell Your House Fast, Close in 7 Days!",
  "No Repairs Needed, We Buy As Is!",
  "Behind on Payments? Call Now for Solutions!",
  "Skip the Realtor Fees, Keep More Money!",
];

const MarqueeBanner = () => (
  <div className="bg-primary overflow-hidden py-2.5 relative">
    <div className="animate-marquee whitespace-nowrap flex w-max">
      {[...items, ...items, ...items].map((text, i) => (
        <span key={i} className="mx-6 sm:mx-8 text-xs sm:text-sm font-medium text-primary-foreground">
          ✦ {text}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
