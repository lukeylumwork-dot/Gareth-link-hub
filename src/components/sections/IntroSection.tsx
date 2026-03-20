interface IntroSectionProps {
  text: string;
}

export const IntroSection = ({ text }: IntroSectionProps) => (
  <section className="mb-20 sm:mb-28 pl-5 sm:pl-6 border-l border-foreground/10">
    <p
      className="text-base sm:text-[1.0625rem] leading-[1.8] text-foreground/75 max-w-[560px] font-light"
      style={{ textWrap: "pretty" }}
    >
      {text}
    </p>
  </section>
);
