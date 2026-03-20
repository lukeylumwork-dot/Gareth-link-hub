interface FollowLink {
  label: string;
  href: string;
}

interface FollowSectionProps {
  heading: string;
  links: FollowLink[];
}

export const FollowSection = ({ heading, links }: FollowSectionProps) => (
  <section className="mb-16 sm:mb-20">
    <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
      {heading}
    </h2>
    <div className="mt-4 flex gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {link.label}
        </a>
      ))}
    </div>
  </section>
);
