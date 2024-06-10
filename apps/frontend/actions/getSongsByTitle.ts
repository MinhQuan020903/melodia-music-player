import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Song } from '@/types';
import getSongs from './getSongs';

function removeVietnameseTones(str: String) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  /* const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`) //Precise search algorithm
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error.message);
  }
  return (data as any) || []; */

  const allSongs = await getSongs();
  if (!title) {
    return allSongs;
  }

  const normalizedTitle = removeVietnameseTones(title).toLowerCase();

  return (
    allSongs
      .filter((song) => removeVietnameseTones(song.title).toLowerCase().includes(normalizedTitle))
      .concat(
        allSongs.filter((song) =>
          removeVietnameseTones(song.author).toLowerCase().includes(normalizedTitle),
        ),
      ) || []
  );
};

export default getSongsByTitle;
