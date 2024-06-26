'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';
import { useEffect } from 'react';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  console.log('Playerrrrrr: ', song);
  const songUrl = useLoadSongUrl(song!);

  useEffect(() => {
    console.log('Test preview song:', song, 'Test preview song URL: ', songUrl);
  }, [song, songUrl]);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      {/* Note: ở đây dùng key để khi thay đổi songUrl, cụ thể là khi skip nhạc, Playlist sẽ được rerender, tránh bị overlap */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
