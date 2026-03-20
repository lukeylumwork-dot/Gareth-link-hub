interface FooterSectionProps {
  name: string;
  year: number;
}

export const FooterSection = ({ name, year }: FooterSectionProps) => (
  <footer className="pt-8 border-t border-border">
    <p className="text-sm text-muted-foreground">
      © {year} {name}
    </p>
  </footer>
);
