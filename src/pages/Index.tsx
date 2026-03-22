import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { FollowSection } from "@/components/sections/FollowSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { usePageSections } from "@/hooks/usePageSections";

// ─── DEFAULT CONTENT (fallback while loading) ────────

const defaults: Record<string, any> = {
  hero: {
    title: "Gareth Parkin",
    subtitle: "",
  },
  intro: {
    text: "I'm building a small set of projects across media, technology, and storytelling. This is a collection of what I'm working on — a podcast, an education platform, and a fiction series. Each is at a different stage. All are ongoing.",
  },
  project_1: {
    title: "Sandalwood & Sage",
    tagline: "A short-form debate podcast",
    description:
      "Two AI-generated presenters. One topic. Both sides, argued properly. Episodes run under fifteen minutes — long enough to be substantive, short enough to respect your time.",
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
      "Practical lessons, honest conversations, and real operator insight — drawn from building, scaling, and exiting a SaaS business. Built for founders who want substance over noise.",
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
    heading: "",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Contact", href: "mailto:hello@example.com" },
    ],
  },
  footer: { name: "Gareth Parkin" },
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
      <div className="mx-auto max-w-[640px] px-6 sm:px-8 py-12 sm:py-20 md:py-28">
        <HeroSection title={hero.title} subtitle={hero.subtitle} />
        <IntroSection text={intro.text} />

        <div className="space-y-14 sm:space-y-20">
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
