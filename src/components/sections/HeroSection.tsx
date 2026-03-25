interface HeroSectionProps {
  title: string;
  subtitle: string;
  avatarUrl?: string;
}

export const HeroSection = ({ title, subtitle, avatarUrl }: HeroSectionProps) => (
  <section className="mb-10 sm:mb-14 pt-8 sm:pt-12 flex flex-col items-center text-center">
    <div className="w-24 h-24 rounded-full border-2 border-white/60 mb-5 overflow-hidden">
      <img
        src={avatarUrl || "/download.jpeg"}
        alt="Gareth Cadwallader"
        className="w-full h-full object-cover"
      />
    </div>
    <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-[-0.01em] text-foreground leading-tight">
      {title}
    </h1>
    {subtitle && (
      <p className="mt-2 text-sm sm:text-[0.9375rem] text-muted-foreground font-sans tracking-wide">
        {subtitle}
      </p>
    )}
  </section>
);
