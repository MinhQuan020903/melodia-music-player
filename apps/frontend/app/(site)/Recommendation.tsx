'use client';
import React, { useEffect, useState } from 'react';
import getRecommendedSongs from '@/actions/getRecommendedSongs';
import PageContent from './components/PageContent';
import { useSelector } from 'react-redux';
import { Song } from '@/types';
import { persistor } from '@/redux/store';

const Recommendation = ({
  newestSongs,
  vietnameseSongs,
}: {
  newestSongs: any;
  vietnameseSongs: any;
}) => {
  const selectedSong = useSelector((state: any) => state.selectedSong.selectedSong);
  console.log('🚀 ~ selectedSong:', selectedSong);

  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);

  useEffect(() => {
    /* Dùng khi cần reset cấu trúc lưu trữ trong redux */
    /*     const resetPersistedStore = async () => {
      await persistor.purge();
    };
    resetPersistedStore(); */
    if (selectedSong === null) return;
    console.log('🚀 ~ selectedSong spotify_id:', selectedSong.spotify_id);
    const fetchRecommendation = async (): Promise<any> => {
      const res = await getRecommendedSongs(selectedSong.spotify_id);
      setRecommendedSongs(res);
    };
    fetchRecommendation();
  }, [selectedSong]);

  return (
    <div className="w-full h-full">
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={newestSongs} />
        </div>
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Vietnamese Songs</h1>
        </div>
        <div>
          <PageContent songs={vietnameseSongs} />
        </div>
      </div>
      {selectedSong && (
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Recommended Songs</h1>
          </div>
          <div>
            <PageContent songs={recommendedSongs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
