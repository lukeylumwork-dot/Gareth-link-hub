import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a file to the Supabase Storage 'media' bucket.
 * Requires the bucket to exist and be public in your Supabase project:
 *   Storage → New bucket → name: "media" → Public: on
 */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
