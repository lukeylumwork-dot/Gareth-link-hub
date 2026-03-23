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
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-card border border-white/70 hover:border-white hover:bg-white/80 transition-all duration-200 group shadow-sm"
        >
          <span className="w-7 h-7 rounded-lg bg-foreground/8 flex items-center justify-center text-[0.6875rem] font-semibold text-foreground/50 shrink-0 uppercase">
            {link.label[0]}
          </span>
          <span className="flex-1 text-sm font-medium text-foreground text-left">{link.label}</span>
          <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors text-sm">↗</span>
        </a>
      ))}
    </div>
  </section>
);
