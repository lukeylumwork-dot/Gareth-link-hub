interface FollowLink {
  label: string;
  href: string;
}

interface FollowSectionProps {
  heading: string;
  links: FollowLink[];
}

export const FollowSection = ({ heading, links }: FollowSectionProps) => (
  <section className="mb-20 sm:mb-24">
    <h2 className="font-serif text-lg sm:text-xl font-normal text-foreground">
      {heading}
    </h2>
    <div className="mt-4 flex gap-5">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="link-underline text-[0.8125rem] text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  </section>
);
