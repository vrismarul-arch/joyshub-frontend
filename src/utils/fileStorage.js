import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = "vrism";

/**
 * Upload file to Supabase Storage
 * @param {File} file
 * @param {string} folder
 * @returns {string|null} publicUrl
 */
export async function uploadFile(file, folder = "joyshub") {
  if (!file) return null;

  try {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg"
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPG / PNG images allowed");
    }

    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return data.publicUrl; // ✅ RETURN STRING URL ONLY
  } catch (err) {
    console.error("Upload error:", err.message);
    return null;
  }
}
