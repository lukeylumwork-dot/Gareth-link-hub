import { LinkCard } from "@/components/LinkCard";

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
}: ProjectSectionProps) => {
  const hasLinks = primaryLink || secondaryLinks.length > 0;

  return (
    <section>
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
