import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import { getRequest } from '@/lib/fetch';
import { supabase } from '@supabase/auth-ui-shared';

const getSongs = async (): Promise<Song[]> => {
  const onGetSongs = async () => {
    const songs = await getRequest({
      endPoint: `/api/song`,
    });
    return songs;
  };
  const res = await onGetSongs();
  console.log('🚀 ~ getSongs ~ res:', res);

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  console.log('Songs', data);
  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
