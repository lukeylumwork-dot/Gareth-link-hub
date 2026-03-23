const ICON_MAP: { match: string; path: string }[] = [
  { match: "spotify",         path: "/icons/spotify.svg" },
  { match: "apple",           path: "/icons/ApplePodcasts.svg" },
  { match: "youtube",         path: "/icons/youtube.svg" },
  { match: "audible",         path: "/icons/Audible.svg" },
  { match: "linkedin",        path: "/icons/Linked.svg" },
  { match: "instagram",       path: "/icons/Instagram.svg" },
  { match: "website",         path: "/icons/Website.svg" },
];

function resolveIcon(label: string): string | null {
  const lower = label.toLowerCase();
  return ICON_MAP.find((entry) => lower.includes(entry.match))?.path ?? null;
}

interface LinkCardProps {
  label: string;
  href: string;
  featured?: boolean;
}

export function LinkCard({ label, href, featured }: LinkCardProps) {
  const iconPath = resolveIcon(label);

  const icon = iconPath ? (
    <img src={iconPath} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
  ) : (
    <span className="text-[0.6875rem] font-semibold uppercase select-none">{label[0]}</span>
  );

  if (featured) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 group"
      >
        <span className="w-7 h-7 rounded-lg bg-background/15 flex items-center justify-center shrink-0">
          {icon}
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
      <span className="w-7 h-7 rounded-lg bg-foreground/8 flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground text-left">{label}</span>
      <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors text-sm">↗</span>
    </a>
  );
}
