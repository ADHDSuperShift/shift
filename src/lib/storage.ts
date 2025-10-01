import { supabase, isSupabaseConfigured } from '../../lib/supabase';

/**
 * Upload a file to Supabase storage
 * @param file - The file to upload
 * @param folder - Optional folder path (e.g., 'projects', 'team', 'services')
 * @returns Promise with the public URL or error
 */
export const uploadFile = async (file: File, folder: string = ''): Promise<{
  url?: string;
  error?: string;
}> => {
  if (!isSupabaseConfigured) {
    return { error: 'Supabase not configured' };
  }

  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload file to storage
    const { data, error } = await supabase.storage
      .from('shift-admin')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('shift-admin')
      .getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: error instanceof Error ? error.message : 'Upload failed' };
  }
};

/**
 * Delete a file from Supabase storage
 * @param filePath - The path of the file to delete
 * @returns Promise with success/error status
 */
export const deleteFile = async (filePath: string): Promise<{
  success?: boolean;
  error?: string;
}> => {
  if (!isSupabaseConfigured) {
    return { error: 'Supabase not configured' };
  }

  try {
    // Extract file path from URL if full URL is provided
    let cleanPath = filePath;
    if (filePath.includes('/storage/v1/object/public/shift-admin/')) {
      cleanPath = filePath.split('/storage/v1/object/public/shift-admin/')[1];
    }

    const { error } = await supabase.storage
      .from('shift-admin')
      .remove([cleanPath]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return { error: error instanceof Error ? error.message : 'Delete failed' };
  }
};

/**
 * Validate file before upload
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10MB)
 * @param allowedTypes - Allowed MIME types (default: images)
 * @returns Validation result
 */
export const validateFile = (
  file: File,
  maxSizeMB: number = 10,
  allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
): { valid: boolean; error?: string } => {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
  }

  return { valid: true };
};

/**
 * Utility to get file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
