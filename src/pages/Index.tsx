import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ConnectingSection } from "@/components/sections/ConnectingSection";
import { FollowSection } from "@/components/sections/FollowSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { usePageSections } from "@/hooks/usePageSections";

// ─── DEFAULT CONTENT (fallback while loading) ────────

const defaults: Record<string, any> = {
  hero: {
    title: "Gareth's Projects",
    subtitle: "A collection of current projects spanning short-form debates, founder insight, and audio fiction.",
  },
  intro: {
    text: "I spend my time exploring ideas across different formats — from structured debates to practical guidance for founders, to longer-form storytelling. These are the projects I'm currently building and sharing.",
  },
  project_1: {
    title: "Sandalwood & Sage",
    tagline: "Short-form, evidence-led debates under 15 minutes",
    description: "Clear, balanced, and engaging conversations on the topics that matter. Each episode takes a single question and examines it from multiple angles — without noise, without filler.",
    primaryLink: { label: "Listen to latest episode", href: "#" },
    secondaryLinks: [
      { label: "Spotify", href: "#" },
      { label: "Apple Podcasts", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  project_2: {
    title: "The Founder's Academy",
    tagline: "Practical guidance for SaaS founders and founding teams",
    description: "Lessons, frameworks, and honest insight drawn from real experience — building, scaling, investing, and exiting. Designed for people doing the work, not just reading about it.",
    primaryLink: { label: "Learn more", href: "#" },
    secondaryLinks: [
      { label: "Website", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Register interest", href: "#" },
    ],
  },
  project_3: {
    title: "The Ardrochronicles",
    tagline: "Serialised audio fiction exploring technology, sport, and society",
    description: "A longer-form storytelling project that blends speculative fiction with themes drawn from the real world. Part drama, part thought experiment.",
    statusLine: "Currently in development",
    primaryLink: { label: "Coming soon", href: "#" },
    secondaryLinks: [
      { label: "Register interest", href: "#" },
      { label: "Subscribe for updates", href: "#" },
    ],
  },
  connecting: {
    heading: "How these fit together",
    text: "Each project explores ideas through a different lens and a different format. Debates distil complex topics into focused conversations. The Academy translates experience into something usable. The Ardrochronicles use fiction to ask the questions that are harder to raise directly. Together, they form a body of work around curiosity, clarity, and craft.",
  },
  follow: {
    heading: "Follow along",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "mailto:hello@example.com" },
    ],
  },
  footer: { name: "Gareth" },
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
  const connecting = get("connecting");
  const follow = get("follow");
  const footer = get("footer");
  const projects = [p1, p2, p3];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
      <div className="mx-auto max-w-[720px] px-6 sm:px-8 py-12 sm:py-20 md:py-28">
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

        <ConnectingSection heading={connecting.heading} text={connecting.text} />
        <FollowSection heading={follow.heading} links={follow.links} />
        <FooterSection name={footer.name} year={new Date().getFullYear()} />
      </div>
    </main>
  );
};

export default Index;
