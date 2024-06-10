import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';

const getRandomSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase.from('random_songs').select('*');

  console.log('Random Songs', data);
  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getRandomSongs;
