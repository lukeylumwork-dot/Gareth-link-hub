interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export const HeroSection = ({ title, subtitle }: HeroSectionProps) => (
  <section className="mb-16 sm:mb-20">
    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
      {title}
    </h1>
    <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[600px]" style={{ textWrap: "pretty" }}>
      {subtitle}
    </p>
  </section>
);
