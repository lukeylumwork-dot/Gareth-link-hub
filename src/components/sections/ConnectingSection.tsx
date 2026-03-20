interface ConnectingSectionProps {
  heading: string;
  text: string;
}

export const ConnectingSection = ({ heading, text }: ConnectingSectionProps) => (
  <section className="mt-24 sm:mt-32 mb-20 sm:mb-24">
    <div className="flex items-center gap-4 mb-8">
      <hr className="editorial-rule flex-1" />
    </div>
    <h2 className="font-serif text-xl sm:text-2xl font-normal tracking-[-0.01em] text-foreground">
      {heading}
    </h2>
    <p
      className="mt-5 text-[0.9375rem] sm:text-base leading-[1.8] text-foreground/65 max-w-[560px]"
      style={{ textWrap: "pretty" }}
    >
      {text}
    </p>
  </section>
);
