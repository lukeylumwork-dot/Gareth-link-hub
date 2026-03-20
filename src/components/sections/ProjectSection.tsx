interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectSectionProps {
  title: string;
  tagline: string;
  description: string;
  statusLine?: string;
  primaryLink: ProjectLink;
  secondaryLinks: ProjectLink[];
}

export const ProjectSection = ({
  title,
  tagline,
  description,
  statusLine,
  primaryLink,
  secondaryLinks,
}: ProjectSectionProps) => (
  <section className="pb-16 sm:pb-20 border-b border-border last:border-b-0 last:pb-0">
    <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base font-medium tracking-wide uppercase text-muted-foreground/70 font-sans">
      {tagline}
    </p>
    <p className="mt-4 text-base leading-[1.75] text-foreground/80 max-w-[620px]" style={{ textWrap: "pretty" }}>
      {description}
    </p>

    {statusLine && (
      <p className="mt-3 text-sm italic text-muted-foreground">{statusLine}</p>
    )}

    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href={primaryLink.href}
        className="inline-block text-sm font-medium text-foreground border-b border-foreground/40 pb-0.5 transition-colors duration-200 hover:border-foreground"
      >
        {primaryLink.label} →
      </a>

      <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {secondaryLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </span>
    </div>
  </section>
);
