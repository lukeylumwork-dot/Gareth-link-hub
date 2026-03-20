interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export const HeroSection = ({ title, subtitle }: HeroSectionProps) => (
  <section className="mb-20 sm:mb-28 pt-8 sm:pt-12">
    <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/60 font-sans mb-6 sm:mb-8">
      Projects & Writing
    </p>
    <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.5rem] font-normal tracking-[-0.02em] text-foreground leading-[1.08]">
      {title}
    </h1>
    <p
      className="mt-6 sm:mt-8 text-base sm:text-[1.0625rem] text-muted-foreground leading-[1.7] max-w-[480px]"
      style={{ textWrap: "pretty" }}
    >
      {subtitle}
    </p>
  </section>
);
