import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { FollowSection } from "@/components/sections/FollowSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { usePageSections } from "@/hooks/usePageSections";

// ─── DEFAULT CONTENT (fallback while loading) ────────

const defaults: Record<string, any> = {
  hero: {
    title: "Gareth Cadwallader",
    subtitle: "Technologist · Investor · Entrepreneur",
  },
  intro: {
    text: "I'm working on a few projects that will be releasing at different points through the year. This page is the single source of truth — links to every website, platform, and social channel in one place. If you find something worth following, I'd love you to like, comment, and subscribe. If you want to get in touch directly, email me or connect on LinkedIn.",
  },
  project_1: {
    title: "Sandalwood & Sage",
    tagline: "Short-form, evidence-led debates under 15 minutes",
    description:
      "Two AI-generated presenters. One topic. Both sides, argued properly. Episodes run under fifteen minutes — structured, balanced, and worth your time.",
    primaryLink: { label: "Listen on Spotify", href: "#" },
    secondaryLinks: [
      { label: "Apple Podcasts", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Website", href: "#" },
    ],
  },
  project_2: {
    title: "The Founder's Academy",
    tagline: "A platform for SaaS founders",
    description:
      "Practical lessons and honest insight drawn from building, scaling, and exiting a SaaS business. For founders who want substance over noise.",
    primaryLink: { label: "Find out more", href: "#" },
    secondaryLinks: [],
  },
  project_3: {
    title: "The Ardrochronicles",
    tagline: "Serialised audio fiction",
    description: "A story set thirty years from now, exploring what technology does to the things we love.",
    statusLine: "Currently in development",
    primaryLink: null,
    secondaryLinks: [],
  },
  follow: {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gareth-m-cadwallader-369980354/" },
      { label: "Email", href: "mailto:gareth@thefourashes.com" },
    ],
  },
  footer: { name: "Gareth Cadwallader" },
};

// ─── PAGE ────────────────────────────────────────────

const Index = () => {
  const { data: sections } = usePageSections();

  const get = (key: string) => {
    const section = sections?.find((s) => s.section_key === key);
    return section ? section.content : defaults[key];
  };

  const hero = get("hero");
  const intro = get("intro");
  const p1 = get("project_1");
  const p2 = get("project_2");
  const p3 = get("project_3");
  const follow = get("follow");
  const footer = get("footer");
  const projects = [p1, p2, p3];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
      <div className="mx-auto max-w-[480px] px-5 sm:px-6 py-10 sm:py-16">
        <HeroSection title={hero.title} subtitle={hero.subtitle} />
        <IntroSection text={intro.text} />

        <div className="space-y-10 sm:space-y-12">
          {projects.map((project, i) => (
            <ProjectSection
              key={project.title}
              index={i + 1}
              title={project.title}
              tagline={project.tagline}
              description={project.description}
              statusLine={project.statusLine}
              primaryLink={project.primaryLink}
              secondaryLinks={project.secondaryLinks}
            />
          ))}
        </div>

        <FollowSection heading={follow.heading} links={follow.links} />
        <FooterSection name={footer.name} year={new Date().getFullYear()} />
      </div>
    </main>
  );
};

export default Index;
