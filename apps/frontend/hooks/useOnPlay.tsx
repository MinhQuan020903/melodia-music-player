import { Song } from '@/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';
import useSubscribeModal from './useSubscribeModal';
import { useEffect } from 'react';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const subscribeModal = useSubscribeModal();

  useEffect(() => {}, [player]);

  /* Problems: Lowered SMTP rate limits (about 4/hours) */

  const onPlay = (id: string) => {
    /* Note: Click play, not only play a song, play a whole bunch of songs in that page */
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
