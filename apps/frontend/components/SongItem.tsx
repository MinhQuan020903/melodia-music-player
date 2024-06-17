'use client';

import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/types';
import Image from 'next/image';
import PlayButton from './PlayButton';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectedSong, { setSelectedSong } from '@/redux/selectedSong/selectedSong';
import Lottie from 'lottie-react';
import gold_medal from '@/assets/animations/gold_medal.json';
import like from '@/assets/animations/like.json';
import heart from '@/assets/animations/heart.json';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
  selectedSongId: string | null;
  isMostViewed: boolean;
  isMostLiked?: boolean;
  isRecommended?: boolean;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
  selectedSongId,
  isMostViewed,
  isMostLiked,
  isRecommended,
}) => {
  const supabase = useSupabaseClient();

  const dispatch = useDispatch();
  const selectedSong = useSelector((state: any) => state.selectedSong.selectedSong);
  const recommendedSongs = useSelector((state: any) => state.recommendedSong.recommendedSongs);

  const [views, setViews] = useState<number>(data.view);
  const [likes, setLikes] = useState<number>(data.like);

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

    if (selectedSongId !== data.id) {
      console.log('these 2 songs are different', selectedSongId, '; ', data.id);
      handleUpdateView();
    } else {
      console.log('these 2 songs are the same', selectedSongId, '; ', data.id);
    }
  };

  const handleUpdateView = async () => {
    //Update view UI
    setViews(views + 1);

    //Update view in database
    try {
      const { data: updatedSong, error } = await supabase
        .from('songs')
        .update({ view: views + 1 })
        .eq('id', data.id)
        .select();

      if (error) {
        console.error('Error updating view:', error.message);
        return false;
      }

      if (updatedSong && updatedSong.length > 0) {
        console.log('updating view completed:', updatedSong);
      } else {
        console.log('');
        console.log('No songs were updated. Check if the id is correct:', updatedSong);
      }

      return true;
    } catch (error) {
      console.error('Unexpected error when updating view:', error);
      return false;
    }
  };

  return (
    <div
      onClick={() => {
        onClick(data.id);
        handleClick();
      }}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      {isMostViewed && (
        <div className="absolute top-0 z-10 -translate-x-20 w-[70%] mt-2 ml-6">
          <Lottie animationData={gold_medal} sizes="5" />
        </div>
      )}
      {isMostLiked && (
        <div className="absolute top-0 z-10 -translate-x-20 w-[30%] mt-2 ml-8">
          <Lottie animationData={like} sizes="5" />
        </div>
      )}
      {isRecommended && (
        <div className="absolute top-0 z-10 -translate-x-20 w-[30%] mt-2 ml-6">
          <Lottie animationData={heart} sizes="5" />
        </div>
      )}

      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image className="object-cover" src={imagePath || '/images/liked.png'} fill alt="Image" />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-200 text-sm w-full truncate">
          <strong>Composer:</strong> {composedBy}
        </p>
        <p className="text-neutral-200 text-sm w-full truncate">
          <strong>Singer:</strong> {presentedBy}
        </p>
        <div className="text-neutral-200 text-sm w-full flex flex-row gap-3 items-center px-1">
          <div className="text-neutral-200 text-sm w-full flex flex-row gap-3 items-center">
            <FaEye color="cyan" />
            <p>{views.toLocaleString()}</p>
          </div>
          <div className="text-neutral-200 text-sm w-full flex flex-row gap-3 items-center justify-end">
            <FaHeart color="Crimson" />
            <p>{likes.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-24 right-5"
        onClick={async () => {
          await onClick(data.id), handleClick();
        }}
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
