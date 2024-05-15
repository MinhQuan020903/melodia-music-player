import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Song } from '@/types';

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song || !song.image_path) {
    return null;
  }

  // Nếu image_path đã bắt đầu bằng "https://", trả về ngay lập tức
  if (song.image_path.startsWith('https://')) {
    return song.image_path;
  }

  const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
