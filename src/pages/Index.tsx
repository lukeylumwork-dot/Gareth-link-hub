import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { ConnectingSection } from "@/components/sections/ConnectingSection";
import { FollowSection } from "@/components/sections/FollowSection";
import { FooterSection } from "@/components/sections/FooterSection";

// ─── EDITABLE CONTENT ────────────────────────────────────────────
// All page content lives here for easy editing.

const heroContent = {
  title: "Gareth's Projects",
  subtitle:
    "A collection of current projects spanning short-form debates, founder insight, and audio fiction.",
};

const introContent = {
  text: "I spend my time exploring ideas across different formats — from structured debates to practical guidance for founders, to longer-form storytelling. These are the projects I'm currently building and sharing.",
};

const projects = [
  {
    title: "Sandalwood & Sage",
    tagline: "Short-form, evidence-led debates under 15 minutes",
    description:
      "Clear, balanced, and engaging conversations on the topics that matter. Each episode takes a single question and examines it from multiple angles — without noise, without filler.",
    primaryLink: {
      label: "Listen to latest episode",
      href: "#",
    },
    secondaryLinks: [
      { label: "Spotify", href: "#" },
      { label: "Apple Podcasts", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Website", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    title: "The Founder's Academy",
    tagline: "Practical guidance for SaaS founders and founding teams",
    description:
      "Lessons, frameworks, and honest insight drawn from real experience — building, scaling, investing, and exiting. Designed for people doing the work, not just reading about it.",
    primaryLink: {
      label: "Learn more",
      href: "#",
    },
    secondaryLinks: [
      { label: "Website", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Register interest", href: "#" },
    ],
  },
  {
    title: "The Ardrochronicles",
    tagline: "Serialised audio fiction exploring technology, sport, and society",
    description:
      "A longer-form storytelling project that blends speculative fiction with themes drawn from the real world. Part drama, part thought experiment.",
    statusLine: "Currently in development",
    primaryLink: {
      label: "Coming soon",
      href: "#",
    },
    secondaryLinks: [
      { label: "Register interest", href: "#" },
      { label: "Subscribe for updates", href: "#" },
    ],
  },
];

const connectingContent = {
  heading: "How these fit together",
  text: "Each project explores ideas through a different lens and a different format. Debates distil complex topics into focused conversations. The Academy translates experience into something usable. The Ardrochronicles use fiction to ask the questions that are harder to raise directly. Together, they form a body of work around curiosity, clarity, and craft.",
};

const followContent = {
  heading: "Follow along",
  links: [
    { label: "LinkedIn", href: "#" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],
};

const footerContent = {
  name: "Gareth",
  year: new Date().getFullYear(),
};

// ─── PAGE ────────────────────────────────────────────────────────

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[750px] px-6 py-16 sm:py-24 md:py-32">
        <HeroSection {...heroContent} />
        <IntroSection {...introContent} />

        <div className="space-y-16 sm:space-y-20">
          {projects.map((project) => (
            <ProjectSection key={project.title} {...project} />
          ))}
        </div>

        <ConnectingSection {...connectingContent} />
        <FollowSection {...followContent} />
        <FooterSection {...footerContent} />
      </div>
    </main>
  );
};

export default Index;
