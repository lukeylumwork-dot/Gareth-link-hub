interface IntroSectionProps {
  text: string;
}

export const IntroSection = ({ text }: IntroSectionProps) => (
  <section className="mb-16 sm:mb-20">
    <p className="text-base sm:text-lg leading-[1.75] text-foreground/85 max-w-[640px]" style={{ textWrap: "pretty" }}>
      {text}
    </p>
  </section>
);
