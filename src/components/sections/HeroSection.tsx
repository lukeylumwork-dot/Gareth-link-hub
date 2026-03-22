interface HeroSectionProps {
  title: string;
  subtitle: string;
}
export const HeroSection = ({ title }: HeroSectionProps) => (
  <section className="mb-20 sm:mb-28 pt-8 sm:pt-12">
    <h1 className="font-serif text-3xl sm:text-[2.25rem] font-normal tracking-[-0.01em] text-foreground leading-[1.15]">
      {title}
    </h1>
  </section>
);
