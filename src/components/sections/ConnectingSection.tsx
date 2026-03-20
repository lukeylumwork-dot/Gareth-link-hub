interface ConnectingSectionProps {
  heading: string;
  text: string;
}

export const ConnectingSection = ({ heading, text }: ConnectingSectionProps) => (
  <section className="mt-20 sm:mt-24 mb-16 sm:mb-20">
    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
      {heading}
    </h2>
    <p className="mt-4 text-base leading-[1.75] text-foreground/80 max-w-[620px]" style={{ textWrap: "pretty" }}>
      {text}
    </p>
  </section>
);
