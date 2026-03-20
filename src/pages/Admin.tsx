import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePageSections, useUpdateSection, type PageSection } from "@/hooks/usePageSections";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  intro: "Introduction",
  project_1: "Project 1 — Sandalwood & Sage",
  project_2: "Project 2 — The Founder's Academy",
  project_3: "Project 3 — The Ardrochronicles",
  connecting: "How These Fit Together",
  follow: "Follow Along",
  footer: "Footer",
};

const SECTION_ORDER = ["hero", "intro", "project_1", "project_2", "project_3", "connecting", "follow", "footer"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Link Editor ──────────────────────────────────────

function LinkEditor({
  links,
  onChange,
}: {
  links: { label: string; href: string }[];
  onChange: (links: { label: string; href: string }[]) => void;
}) {
  const updateLink = (i: number, field: "label" | "href", value: string) => {
    const updated = [...links];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  const addLink = () => onChange([...links, { label: "", href: "" }]);
  const removeLink = (i: number) => onChange(links.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-start">
          <input
            value={link.label}
            onChange={(e) => updateLink(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={link.href}
            onChange={(e) => updateLink(i, "href", e.target.value)}
            placeholder="URL"
            className="flex-[2] h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onClick={() => removeLink(i)}
            className="h-9 px-2 text-muted-foreground hover:text-destructive text-sm transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addLink}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        + Add link
      </button>
    </div>
  );
}

// ─── Section Editor ───────────────────────────────────

function SectionEditor({
  section,
  onSave,
  saving,
}: {
  section: PageSection;
  onSave: (data: { content: Record<string, any>; notes: string; status: PageSection["status"] }) => void;
  saving: boolean;
}) {
  const [content, setContent] = useState<Record<string, any>>(section.content);
  const [notes, setNotes] = useState(section.notes || "");
  const [status, setStatus] = useState<PageSection["status"]>(section.status);
  const [open, setOpen] = useState(false);

  const updateField = (key: string, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const isProject = section.section_key.startsWith("project_");

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div>
          <h3 className="font-serif text-base font-normal text-foreground">
            {SECTION_LABELS[section.section_key] || section.section_key}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Last edited {formatDate(section.updated_at)} · {status}
          </p>
        </div>
        <span className="text-muted-foreground text-sm">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-2 space-y-5 border-t border-border">
          {/* Render fields based on section type */}
          {section.section_key === "hero" && (
            <>
              <Field label="Title" value={content.title || ""} onChange={(v) => updateField("title", v)} />
              <Field label="Subtitle" value={content.subtitle || ""} onChange={(v) => updateField("subtitle", v)} multiline />
            </>
          )}

          {section.section_key === "intro" && (
            <Field label="Text" value={content.text || ""} onChange={(v) => updateField("text", v)} multiline />
          )}

          {isProject && (
            <>
              <Field label="Title" value={content.title || ""} onChange={(v) => updateField("title", v)} />
              <Field label="Tagline" value={content.tagline || ""} onChange={(v) => updateField("tagline", v)} />
              <Field label="Description" value={content.description || ""} onChange={(v) => updateField("description", v)} multiline />
              <Field label="Status line" value={content.statusLine || ""} onChange={(v) => updateField("statusLine", v)} placeholder="e.g. Currently in development" />

              <div>
                <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Primary link</label>
                <div className="flex gap-2">
                  <input
                    value={content.primaryLink?.label || ""}
                    onChange={(e) => updateField("primaryLink", { ...content.primaryLink, label: e.target.value })}
                    placeholder="Label"
                    className="flex-1 h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    value={content.primaryLink?.href || ""}
                    onChange={(e) => updateField("primaryLink", { ...content.primaryLink, href: e.target.value })}
                    placeholder="URL"
                    className="flex-[2] h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Secondary links</label>
                <LinkEditor
                  links={content.secondaryLinks || []}
                  onChange={(links) => updateField("secondaryLinks", links)}
                />
              </div>
            </>
          )}

          {section.section_key === "connecting" && (
            <>
              <Field label="Heading" value={content.heading || ""} onChange={(v) => updateField("heading", v)} />
              <Field label="Text" value={content.text || ""} onChange={(v) => updateField("text", v)} multiline />
            </>
          )}

          {section.section_key === "follow" && (
            <>
              <Field label="Heading" value={content.heading || ""} onChange={(v) => updateField("heading", v)} />
              <div>
                <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Links</label>
                <LinkEditor
                  links={content.links || []}
                  onChange={(links) => updateField("links", links)}
                />
              </div>
            </>
          )}

          {section.section_key === "footer" && (
            <Field label="Name" value={content.name || ""} onChange={(v) => updateField("name", v)} />
          )}

          {/* Status + Notes (all sections) */}
          <div className="pt-3 border-t border-border space-y-4">
            <div>
              <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PageSection["status"])}
                className="h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
              </select>
            </div>

            <div>
              <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-1.5">Private notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Internal notes, reminders, to-dos…"
                className="w-full px-3 py-2 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              />
            </div>

            <button
              type="button"
              onClick={() => onSave({ content, notes, status })}
              disabled={saving}
              className="h-9 px-5 rounded bg-foreground text-background text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Field Component ──────────────────────────────────

function Field({
  label,
  value,
  onChange,
  multiline,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded border border-input bg-background text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-y"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9 px-3 rounded border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data: sections, isLoading } = usePageSections();
  const updateSection = useUpdateSection();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    );
  }

  if (!user) return null;

  const sorted = sections
    ? [...sections].sort((a, b) => SECTION_ORDER.indexOf(a.section_key) - SECTION_ORDER.indexOf(b.section_key))
    : [];

  const handleSave = (sectionKey: string, data: { content: Record<string, any>; notes: string; status: PageSection["status"] }) => {
    updateSection.mutate(
      { section_key: sectionKey, ...data },
      {
        onSuccess: () => toast.success("Saved"),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[680px] px-6 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-2xl font-normal">Content Manager</h1>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="h-8 px-3 inline-flex items-center rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View site
            </a>
            <button
              onClick={signOut}
              className="h-8 px-3 rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {sorted.map((section) => (
            <SectionEditor
              key={section.id}
              section={section}
              onSave={(data) => handleSave(section.section_key, data)}
              saving={updateSection.isPending}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;
