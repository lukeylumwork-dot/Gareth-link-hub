interface IntroSectionProps {
  text: string;
}

export const IntroSection = ({ text }: IntroSectionProps) => (
  <section className="mb-10 sm:mb-12">
    <p
      className="text-sm sm:text-[0.9375rem] leading-[1.8] text-foreground/65 text-center font-light"
      style={{ textWrap: "pretty" } as React.CSSProperties}
    >
      {text}
    </p>
  </section>
);
