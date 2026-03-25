import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { FollowSection } from "@/components/sections/FollowSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ConnectingSection } from "@/components/sections/ConnectingSection";
import { usePageSections } from "@/hooks/usePageSections";

// ─── DEFAULT CONTENT (fallback while loading / no DB) ────────

const defaults: Record<string, any> = {
  hero: {
    title: "Gareth Cadwallader",
    subtitle: "Technologist · Investor · Entrepreneur",
  },
  intro: {
    text: "I'm working on a few projects that will be releasing at different points through the year. This page is the single source of truth — links to every website, platform, and social channel in one place. If you find something worth following, I'd love you to like, comment, and subscribe. If you want to get in touch directly, email me or connect on LinkedIn.",
    visible: true,
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
    visible: true,
  },
  project_2: {
    title: "The Founder's Academy",
    tagline: "A platform for SaaS founders",
    description:
      "Practical lessons and honest insight drawn from building, scaling, and exiting a SaaS business. For founders who want substance over noise.",
    primaryLink: { label: "Find out more", href: "#" },
    secondaryLinks: [],
    visible: true,
  },
  project_3: {
    title: "The Ardrochronicles",
    tagline: "Serialised audio fiction",
    description: "A story set thirty years from now, exploring what technology does to the things we love.",
    statusLine: "Currently in development",
    primaryLink: null,
    secondaryLinks: [],
    visible: true,
  },
  connecting: {
    heading: "How these fit together",
    text: "",
    visible: false,
  },
  follow: {
    heading: "Connect",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gareth-m-cadwallader-369980354/" },
      { label: "Email", href: "mailto:gareth.cadwallder@fourashes.com" },
    ],
    visible: true,
  },
  footer: { name: "Gareth Cadwallader" },
  config: { sectionOrder: ["intro", "project_1", "project_2", "project_3", "connecting", "follow"] },
};

const DEFAULT_ORDER = ["intro", "project_1", "project_2", "project_3", "connecting", "follow"];

// ─── PAGE ────────────────────────────────────────────

const Index = () => {
  const { data: sections } = usePageSections();

  const get = (key: string) => {
    const section = sections?.find((s) => s.section_key === key);
    return section ? section.content : defaults[key];
  };

  const hero = get("hero");
  const footer = get("footer");
  const config = get("config");
  const sectionOrder: string[] = config?.sectionOrder ?? DEFAULT_ORDER;

  const renderMiddleSection = (key: string) => {
    const data = get(key);
    if (!data || data.visible === false) return null;

    if (key === "intro") {
      return <IntroSection key="intro" text={data.text} />;
    }
    if (key.startsWith("project_")) {
      return (
        <ProjectSection
          key={key}
          index={0}
          title={data.title}
          tagline={data.tagline}
          description={data.description}
          statusLine={data.statusLine}
          primaryLink={data.primaryLink}
          secondaryLinks={data.secondaryLinks ?? []}
          audioUrl={data.audioUrl}
          videoUrl={data.videoUrl}
          visible={data.visible !== false}
        />
      );
    }
    if (key === "connecting" && data.heading && data.text) {
      return <ConnectingSection key="connecting" heading={data.heading} text={data.text} />;
    }
    if (key === "follow") {
      return <FollowSection key="follow" heading={data.heading} links={data.links ?? []} />;
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
      <div className="mx-auto max-w-[480px] px-5 sm:px-6 py-10 sm:py-16">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          avatarUrl={hero.avatarUrl}
        />

        <div className="space-y-10 sm:space-y-12">
          {sectionOrder.map((key) => renderMiddleSection(key))}
        </div>

        <FooterSection name={footer.name} year={new Date().getFullYear()} />
      </div>
    </main>
  );
};

export default Index;
