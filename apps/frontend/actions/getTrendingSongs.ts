import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

export const getTrendingSongs = () => {
  const getMostViewedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .limit(5)
      .order('view', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    return (data as any) || [];
  };
  const getMostLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .limit(5)
      .order('like', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    return (data as any) || [];
  };
  return {
    getMostViewedSongs,
    getMostLikedSongs,
  };
};
