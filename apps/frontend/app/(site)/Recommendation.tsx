'use client';
import React, { useEffect, useState } from 'react';
import getRecommendedSongs from '@/actions/getRecommendedSongs';
import PageContent from './components/PageContent';
import { useSelector } from 'react-redux';
import { Song } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Recommendation = ({
  newestSongs,
  vietnameseSongs,
}: {
  newestSongs: any;
  vietnameseSongs: any;
}) => {
  const supabase = useSupabaseClient();

  const selectedSong = useSelector((state: any) => state.selectedSong.selectedSong);
  console.log('🚀 ~ selectedSong:', selectedSong);

  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);

  function getRandomSongs(n, v) {
    const combinedSongs = [...n, ...v];

    // Shuffle array
    for (let i = combinedSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedSongs[i], combinedSongs[j]] = [combinedSongs[j], combinedSongs[i]];
    }

    // Return first 5 songs
    return combinedSongs.slice(0, 5);
  }

  const [prevRecommendedSongs, setPrevRecommendedSongs] = useState(() =>
    getRandomSongs(newestSongs, vietnameseSongs),
  );

  useEffect(() => {
    /* Dùng khi cần reset cấu trúc lưu trữ trong redux */
    /*     const resetPersistedStore = async () => {
      await persistor.purge();
    };
    resetPersistedStore(); */
    if (selectedSong) {
      //Save the previous recommended songs
      setPrevRecommendedSongs(recommendedSongs);
      const fetchRecommendation = async (): Promise<any> => {
        console.log('halo');
        const res = await getRecommendedSongs({ track_id: selectedSong.spotify_id });
        setRecommendedSongs(res);
      };
      fetchRecommendation();
      /** After fetching recommend songs from backend,
       * we will fetch the song_url from supabase
       */

      recommendedSongs?.forEach(async (song) => {
        const { data, error } = await supabase
          .from('songs')
          .select('*')
          .eq('spotify_id', song)
          .single();
        if (error) {
          console.error('Failed to fetch song_url:', error);
          return;
        }
        song.song_path = data.song_url;
      });
      console.log('🚀 ~ recommendedSongs?.forEach ~ recommendedSongs:', recommendedSongs);
    } else return;
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
      {(selectedSong || prevRecommendedSongs.length > 0) && (
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Recommended Songs</h1>
          </div>
          <div>
            <PageContent songs={prevRecommendedSongs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;
