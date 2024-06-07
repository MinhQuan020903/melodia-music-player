'use client';

import SongItem from '@/components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  console.log('🚀 ~ songs:', songs);
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="text-center text-white mt-4">
        <p>No songs found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
      {songs.map((item) => (
        <SongItem key={item.id} data={item} onClick={(id: string) => onPlay(id)} />
      ))}
    </div>
  );
};

export default PageContent;
