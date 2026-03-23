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

function LinkCard({ label, href, featured }: { label: string; href: string; featured?: boolean }) {
  if (featured) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 group"
      >
        <span className="w-7 h-7 rounded-lg bg-background/20 flex items-center justify-center text-[0.6875rem] font-semibold text-background/80 shrink-0 uppercase">
          {label[0]}
        </span>
        <span className="flex-1 text-sm font-medium text-left">{label}</span>
        <span className="text-background/50 group-hover:text-background/80 transition-colors text-sm">↗</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-card border border-white/70 hover:border-white hover:bg-white/80 transition-all duration-200 group shadow-sm"
    >
      <span className="w-7 h-7 rounded-lg bg-foreground/8 flex items-center justify-center text-[0.6875rem] font-semibold text-foreground/50 shrink-0 uppercase">
        {label[0]}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground text-left">{label}</span>
      <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors text-sm">↗</span>
    </a>
  );
}

export const ProjectSection = ({
  title,
  tagline,
  description,
  statusLine,
  primaryLink,
  secondaryLinks,
}: ProjectSectionProps) => {
  const hasLinks = primaryLink || secondaryLinks.length > 0;

  return (
    <section>
      {/* Section header — uppercase spaced caps */}
      <h2 className="text-[0.625rem] tracking-[0.18em] uppercase font-sans font-semibold text-muted-foreground/70 mb-4">
        {title}
      </h2>

      {tagline && (
        <p className="text-[0.8125rem] text-muted-foreground/80 font-sans mb-3">{tagline}</p>
      )}

      {description && (
        <p
          className="text-[0.9375rem] leading-[1.75] text-foreground/70 mb-5"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {description}
        </p>
      )}

      {statusLine && (
        <p className="mb-5 text-[0.8125rem] italic text-muted-foreground/70 font-serif">{statusLine}</p>
      )}

      {hasLinks && (
        <div className="space-y-2.5">
          {primaryLink && (
            <LinkCard label={primaryLink.label} href={primaryLink.href} featured />
          )}
          {secondaryLinks.map((link) => (
            <LinkCard key={link.label} label={link.label} href={link.href} />
          ))}
        </div>
      )}
    </section>
  );
};
