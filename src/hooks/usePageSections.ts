import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface PageSection {
  id: string;
  section_key: string;
  content: Record<string, any>;
  notes: string | null;
  status: "draft" | "in_review" | "approved";
  updated_at: string;
}

export function usePageSections() {
  return useQuery({
    queryKey: ["page_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_sections")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data as unknown as PageSection[];
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      section_key,
      content,
      notes,
      status,
    }: {
      section_key: string;
      content: Record<string, any>;
      notes?: string;
      status?: "draft" | "in_review" | "approved";
    }) => {
      const update: Record<string, any> = { content: content as unknown as Json };
      if (notes !== undefined) update.notes = notes;
      if (status !== undefined) update.status = status;

      const { error } = await supabase
        .from("page_sections")
        .update(update)
        .eq("section_key", section_key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page_sections"] });
    },
  });
}
