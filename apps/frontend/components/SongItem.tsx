'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import PlayButton from './PlayButton';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSong } from '@/redux/selectedSong/selectedSong';
import Lottie from 'lottie-react';
import gold_medal from '@/assets/animations/gold_medal.json';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const dispatch = useDispatch();
  const recommendedSongs = useSelector((state: any) => state.recommendedSong.recommendedSongs);

  const imagePath = useLoadImage(data);

  const authors = data.author.split(' & ');
  let composedBy = authors[0];
  let presentedBy = authors.slice(1).join(' & ');

  if (authors.length === 1) {
    presentedBy = composedBy; // Nếu chỉ có một tác giả, sử dụng tên đó cho cả hai mục
  }

  const handleClick = () => {
    // Kiểm tra xem bài hát có nằm trong danh sách recommendedSongs không
    const isRecommended = recommendedSongs.some((song: Song) => song.id === data.id);

    if (!isRecommended) {
      dispatch(setSelectedSong(data));
    } else {
      console.log('This song is from recommended songs, not dispatching setSelectedSong');
    }
  };

  return (
    <div
      onClick={() => {
        onClick(data.id);
        // Kiểm tra xem bài hát có nằm trong danh sách recommendedSongs không
        const isRecommended = recommendedSongs.some((song: Song) => song.id === data.id);

        if (!isRecommended) {
          dispatch(setSelectedSong(data));
        } else {
          console.log('This song is from recommended songs, not dispatching setSelectedSong');
        }
      }}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt="Image" />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-200 text-sm w-full truncate">
          <strong>Composed by:</strong> {composedBy}
        </p>
        <p className="text-neutral-200 text-sm w-full truncate">
          <strong>Presented by:</strong> {presentedBy}
        </p>
      </div>
      <div className="absolute bottom-24 right-5" onClick={handleClick}>
        <PlayButton />
      </div>
      <div className="absolute top-0 left-0">
        <Lottie size={30} animationData={gold_medal} />
      </div>
    </div>
  );
};

export default SongItem;
