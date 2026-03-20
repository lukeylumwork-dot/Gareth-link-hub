
-- Create enum for section status
CREATE TYPE public.section_status AS ENUM ('draft', 'in_review', 'approved');

-- Create page_sections table for CMS content
CREATE TABLE public.page_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  notes TEXT DEFAULT '',
  status section_status NOT NULL DEFAULT 'approved',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- Public read access (for the landing page)
CREATE POLICY "Anyone can read page sections"
  ON public.page_sections FOR SELECT
  USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update page sections"
  ON public.page_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert page sections"
  ON public.page_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON public.page_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default content
INSERT INTO public.page_sections (section_key, content) VALUES
('hero', '{"title": "Gareth''s Projects", "subtitle": "A collection of current projects spanning short-form debates, founder insight, and audio fiction."}'),
('intro', '{"text": "I spend my time exploring ideas across different formats — from structured debates to practical guidance for founders, to longer-form storytelling. These are the projects I''m currently building and sharing."}'),
('project_1', '{"title": "Sandalwood & Sage", "tagline": "Short-form, evidence-led debates under 15 minutes", "description": "Clear, balanced, and engaging conversations on the topics that matter. Each episode takes a single question and examines it from multiple angles — without noise, without filler.", "statusLine": "", "primaryLink": {"label": "Listen to latest episode", "href": "#"}, "secondaryLinks": [{"label": "Spotify", "href": "#"}, {"label": "Apple Podcasts", "href": "#"}, {"label": "YouTube", "href": "#"}, {"label": "Website", "href": "#"}, {"label": "Instagram", "href": "#"}]}'),
('project_2', '{"title": "The Founder''s Academy", "tagline": "Practical guidance for SaaS founders and founding teams", "description": "Lessons, frameworks, and honest insight drawn from real experience — building, scaling, investing, and exiting. Designed for people doing the work, not just reading about it.", "statusLine": "", "primaryLink": {"label": "Learn more", "href": "#"}, "secondaryLinks": [{"label": "Website", "href": "#"}, {"label": "LinkedIn", "href": "#"}, {"label": "Register interest", "href": "#"}]}'),
('project_3', '{"title": "The Ardrochronicles", "tagline": "Serialised audio fiction exploring technology, sport, and society", "description": "A longer-form storytelling project that blends speculative fiction with themes drawn from the real world. Part drama, part thought experiment.", "statusLine": "Currently in development", "primaryLink": {"label": "Coming soon", "href": "#"}, "secondaryLinks": [{"label": "Register interest", "href": "#"}, {"label": "Subscribe for updates", "href": "#"}]}'),
('connecting', '{"heading": "How these fit together", "text": "Each project explores ideas through a different lens and a different format. Debates distil complex topics into focused conversations. The Academy translates experience into something usable. The Ardrochronicles use fiction to ask the questions that are harder to raise directly. Together, they form a body of work around curiosity, clarity, and craft."}'),
('follow', '{"heading": "Follow along", "links": [{"label": "LinkedIn", "href": "#"}, {"label": "Email", "href": "mailto:hello@example.com"}]}'),
('footer', '{"name": "Gareth"}');
