import { Song } from '@/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      authModal.onOpen();
    }

    /* Note: Click play, not only play a song, play a whole bunch of songs in that page */
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
