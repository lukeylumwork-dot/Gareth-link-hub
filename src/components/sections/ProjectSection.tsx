interface ProjectLink {
  label: string;
  href: string;
}
interface ProjectSectionProps {
  title: string;
  tagline: string;
  description: string;
  statusLine?: string;
  primaryLink: ProjectLink | null;
  secondaryLinks: ProjectLink[];
  index: number;
}
export const ProjectSection = ({
  title,
  tagline,
  description,
  statusLine,
  primaryLink,
  secondaryLinks,
  index,
}: ProjectSectionProps) => (
  <section className="group">
    {/* Divider — editorial rule with section number */}
    <div className="flex items-center gap-4 mb-8 sm:mb-10">
      <span className="text-[0.6875rem] tabular-nums tracking-widest text-muted-foreground/50 font-sans">
        {String(index).padStart(2, "0")}
      </span>
      <hr className="editorial-rule flex-1" />
    </div>
    <h2 className="font-serif text-[1.625rem] sm:text-[2rem] font-normal tracking-[-0.015em] text-foreground leading-[1.15]">
      {title}
    </h2>
    <p className="mt-3 text-[0.8125rem] sm:text-sm tracking-[0.08em] uppercase text-muted-foreground font-sans font-medium">
      {tagline}
    </p>
    <p
      className="mt-5 sm:mt-6 text-[0.9375rem] sm:text-base leading-[1.8] text-foreground/70 max-w-[580px]"
      style={{ textWrap: "pretty" }}
    >
      {description}
    </p>
    {statusLine && <p className="mt-3 text-[0.8125rem] italic text-muted-foreground/70 font-serif">{statusLine}</p>}
    {(primaryLink || secondaryLinks.length > 0) && (
      <div className="mt-7 sm:mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        {primaryLink && (
          <a
            href={primaryLink.href}
            className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-300 hover:text-accent"
          >
            {primaryLink.label}
            <span className="text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        )}
        {secondaryLinks.length > 0 && (
          <span className="link-dot-separator flex flex-wrap items-center gap-x-3 gap-y-2">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[0.8125rem] text-muted-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </span>
        )}
      </div>
    )}
  </section>
);
