import { LinkCard } from "@/components/LinkCard";

interface FollowLink {
  label: string;
  href: string;
}

interface FollowSectionProps {
  heading: string;
  links: FollowLink[];
}

export const FollowSection = ({ heading, links }: FollowSectionProps) => (
  <section className="mt-14 sm:mt-20 mb-16 sm:mb-20">
    {heading && (
      <h2 className="text-[0.625rem] tracking-[0.18em] uppercase font-sans font-semibold text-muted-foreground/70 mb-4">
        {heading}
      </h2>
    )}
    <div className="space-y-2.5">
      {links.map((link) => (
        <LinkCard key={link.label} label={link.label} href={link.href} />
      ))}
    </div>
  </section>
);
