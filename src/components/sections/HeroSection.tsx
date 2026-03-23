interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export const HeroSection = ({ title, subtitle }: HeroSectionProps) => (
  <section className="mb-10 sm:mb-14 pt-8 sm:pt-12 flex flex-col items-center text-center">
    {/* Circular avatar placeholder */}
    <div className="w-24 h-24 rounded-full bg-foreground/10 border-2 border-white/60 mb-5 overflow-hidden flex items-center justify-center">
      <span className="text-2xl font-serif text-foreground/40 select-none">GC</span>
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
