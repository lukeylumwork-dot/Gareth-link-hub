import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePageSections, useUpdateSection, type PageSection } from "@/hooks/usePageSections";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/mediaUpload";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────

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

// hero and footer are always locked at top/bottom
const FIXED_SECTIONS = ["hero", "footer"];
const DEFAULT_ORDER = ["hero", "intro", "project_1", "project_2", "project_3", "connecting", "follow", "footer"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

// ─── File Upload Field ─────────────────────────────────

function FileUploadField({
  label,
  currentUrl,
  accept,
  onUpload,
}: {
  label: string;
  currentUrl?: string;
  accept: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isImage = accept.startsWith("image");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const url = await uploadMedia(file, label.toLowerCase().replace(/\s+/g, "-"));
      onUpload(url);
      toast.success("Uploaded");
    } catch (e: any) {
      const msg = e.message ?? "Upload failed";
      setErr(msg.includes("bucket") || msg.includes("storage")
        ? 'Supabase Storage not enabled. Go to Supabase → Storage → create a bucket named "media" (set to Public).'
        : msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-1.5">{label}</label>
      {currentUrl && (
        <div className="mb-2">
          {isImage
            ? <img src={currentUrl} alt="" className="w-14 h-14 rounded-full object-cover border border-border" />
            : <p className="text-xs text-foreground/60 truncate max-w-xs">{currentUrl.split("/").pop()}</p>
          }
        </div>
      )}
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="h-8 px-3 rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        {uploading ? "Uploading…" : currentUrl ? "Replace" : "Upload file"}
      </button>
      {err && <p className="mt-1 text-xs text-destructive leading-snug">{err}</p>}
    </div>
  );
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
          <button type="button" onClick={() => removeLink(i)}
            className="h-9 px-2 text-muted-foreground hover:text-destructive text-sm transition-colors">
            ✕
          </button>
        </div>
      ))}
      <button type="button" onClick={addLink}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors">
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
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  section: PageSection;
  onSave: (data: { content: Record<string, any>; notes: string; status: PageSection["status"] }) => void;
  saving: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}) {
  const [content, setContent] = useState<Record<string, any>>(section.content);
  const [notes, setNotes] = useState(section.notes || "");
  const [status, setStatus] = useState<PageSection["status"]>(section.status);
  const [open, setOpen] = useState(false);
  const isProject = section.section_key.startsWith("project_");
  const isFixed = FIXED_SECTIONS.includes(section.section_key);

  const updateField = (key: string, value: any) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center">
        {/* Reorder buttons */}
        {!isFixed && (
          <div className="flex flex-col border-r border-border">
            <button
              type="button"
              onClick={onMoveUp}
              disabled={!canMoveUp}
              title="Move up"
              className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-[0.6875rem]"
            >
              ▲
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={!canMoveDown}
              title="Move down"
              className="px-2.5 py-1.5 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-[0.6875rem]"
            >
              ▼
            </button>
          </div>
        )}

        {/* Visibility toggle */}
        {!isFixed && (
          <button
            type="button"
            onClick={() => updateField("visible", !(content.visible !== false))}
            title={content.visible !== false ? "Visible — click to hide" : "Hidden — click to show"}
            className="px-2.5 self-stretch border-r border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {content.visible !== false ? "●" : "○"}
          </button>
        )}

        {/* Expand button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div>
            <h3 className="font-serif text-base font-normal text-foreground">
              {SECTION_LABELS[section.section_key] || section.section_key}
              {content.visible === false && (
                <span className="ml-2 text-[0.625rem] tracking-widest uppercase text-muted-foreground/50 font-sans">hidden</span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Last edited {formatDate(section.updated_at)} · {status}
            </p>
          </div>
          <span className="text-muted-foreground text-sm ml-4">{open ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Body */}
      {open && (
        <div className="px-5 pb-5 pt-2 space-y-5 border-t border-border">

          {section.section_key === "hero" && (
            <>
              <Field label="Name" value={content.title || ""} onChange={(v) => updateField("title", v)} />
              <Field label="Role titles (shown below name)" value={content.subtitle || ""} onChange={(v) => updateField("subtitle", v)} />
              <FileUploadField
                label="Profile photo"
                currentUrl={content.avatarUrl}
                accept="image/*"
                onUpload={(url) => updateField("avatarUrl", url)}
              />
            </>
          )}

          {section.section_key === "intro" && (
            <Field label="Bio text" value={content.text || ""} onChange={(v) => updateField("text", v)} multiline />
          )}

          {isProject && (
            <>
              <Field label="Title (section header)" value={content.title || ""} onChange={(v) => updateField("title", v)} />
              <Field label="Tagline" value={content.tagline || ""} onChange={(v) => updateField("tagline", v)} />
              <Field label="Description" value={content.description || ""} onChange={(v) => updateField("description", v)} multiline />
              <Field label="Status line" value={content.statusLine || ""} onChange={(v) => updateField("statusLine", v)} placeholder="e.g. Currently in development" />

              <div>
                <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Primary link (featured button)</label>
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
                <LinkEditor links={content.secondaryLinks || []} onChange={(links) => updateField("secondaryLinks", links)} />
              </div>

              <div className="pt-2 border-t border-border/50 space-y-4">
                <p className="text-xs text-muted-foreground/60 font-medium tracking-wide uppercase">Media</p>
                <Field
                  label="Audio URL (Spotify, SoundCloud, or direct .mp3 link)"
                  value={content.audioUrl || ""}
                  onChange={(v) => updateField("audioUrl", v)}
                  placeholder="https://…"
                />
                <Field
                  label="Video URL (YouTube embed, Vimeo, or direct .mp4 link)"
                  value={content.videoUrl || ""}
                  onChange={(v) => updateField("videoUrl", v)}
                  placeholder="https://…"
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
              <Field label="Section heading" value={content.heading || ""} onChange={(v) => updateField("heading", v)} />
              <div>
                <label className="block text-xs tracking-wide uppercase text-muted-foreground mb-2">Links</label>
                <LinkEditor links={content.links || []} onChange={(links) => updateField("links", links)} />
              </div>
            </>
          )}

          {section.section_key === "footer" && (
            <Field label="Name" value={content.name || ""} onChange={(v) => updateField("name", v)} />
          )}

          {/* Status + Notes */}
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
  label, value, onChange, multiline, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
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
  const { data: sections, isLoading, isError, error: fetchError, refetch } = usePageSections();
  const updateSection = useUpdateSection();
  const navigate = useNavigate();

  const [sectionOrder, setSectionOrder] = useState<string[]>(DEFAULT_ORDER);
  const [savingOrder, setSavingOrder] = useState(false);

  // Load saved order from config section
  useEffect(() => {
    const config = sections?.find((s) => s.section_key === "config");
    if (config?.content?.sectionOrder) {
      setSectionOrder(config.content.sectionOrder as string[]);
    }
  }, [sections]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  const moveSection = (key: string, dir: "up" | "down") => {
    setSectionOrder((prev) => {
      const arr = [...prev];
      const i = arr.indexOf(key);
      if (dir === "up" && i > 1) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
      } else if (dir === "down" && i < arr.length - 2) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
      return arr;
    });
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const { error } = await supabase.from("page_sections").upsert(
        { section_key: "config", content: { sectionOrder }, notes: "", status: "approved" },
        { onConflict: "section_key" }
      );
      if (error) throw error;
      toast.success("Order saved");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save order");
    } finally {
      setSavingOrder(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </main>
    );
  }

  if (!user) return null;

  if (isError) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-[360px]">
          <p className="text-sm text-destructive mb-1">Failed to load sections</p>
          <p className="text-xs text-muted-foreground mb-4">{fetchError?.message}</p>
          <button onClick={() => refetch()}
            className="h-8 px-4 rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors">
            Retry
          </button>
        </div>
      </main>
    );
  }

  // Sort sections by current sectionOrder, exclude config row
  const sorted = sectionOrder
    .map((key) => sections?.find((s) => s.section_key === key))
    .filter(Boolean) as PageSection[];

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

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-2xl font-normal">Content Manager</h1>
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex gap-3">
            <a href="/" target="_blank" rel="noopener"
              className="h-8 px-3 inline-flex items-center rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors">
              View site
            </a>
            <button onClick={signOut}
              className="h-8 px-3 rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {/* Save order bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">
            Use ▲ ▼ to reorder · ● to show/hide sections
          </p>
          <button
            type="button"
            onClick={saveOrder}
            disabled={savingOrder}
            className="h-8 px-4 rounded border border-input text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {savingOrder ? "Saving…" : "Save order"}
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              No sections found. Content may not have been seeded yet.
            </p>
          ) : (
            sorted.map((section, i) => {
              const isFixed = FIXED_SECTIONS.includes(section.section_key);
              // Moveable range: index 1 to length-2 (between hero and footer)
              const canMoveUp = !isFixed && i > 1;
              const canMoveDown = !isFixed && i < sorted.length - 2;
              return (
                <SectionEditor
                  key={section.id}
                  section={section}
                  onSave={(data) => handleSave(section.section_key, data)}
                  saving={updateSection.isPending}
                  onMoveUp={() => moveSection(section.section_key, "up")}
                  onMoveDown={() => moveSection(section.section_key, "down")}
                  canMoveUp={canMoveUp}
                  canMoveDown={canMoveDown}
                />
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Admin;
