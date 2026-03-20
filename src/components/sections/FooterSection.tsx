interface FooterSectionProps {
  name: string;
  year: number;
}

export const FooterSection = ({ name, year }: FooterSectionProps) => (
  <footer className="pt-10 border-t border-foreground/8">
    <p className="text-xs text-muted-foreground/50 tracking-wide">
      © {year} {name}
    </p>
  </footer>
);
