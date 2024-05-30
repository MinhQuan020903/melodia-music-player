import { Song } from '@/types';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();
  if (!song) {
    return '';
  }

  // Nếu image_path đã bắt đầu bằng "https://", trả về ngay lập tức
  if (song.song_path.startsWith('https://')) {
    return song.song_path;
  }

  const { data: songData } = supabaseClient.storage.from('songs').getPublicUrl(song.song_path);
  console.log('Public url: ', songData.publicUrl);

  return songData.publicUrl;
};

export default useLoadSongUrl;
