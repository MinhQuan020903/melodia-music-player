'use client';
import React, { useEffect, useState } from 'react';
import getRecommendedSongs from '@/actions/getRecommendedSongs';
import PageContent from './components/PageContent';
import { useDispatch, useSelector } from 'react-redux';
import { Song } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { setReduxRecommendedSongs } from '@/redux/recommendedSong/recommendedSong';

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

  const dispatch = useDispatch();
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);

  useEffect(() => {
    /* Dùng khi cần reset cấu trúc lưu trữ trong redux */
    /*     const resetPersistedStore = async () => {
      await persistor.purge();
    };
    resetPersistedStore(); */
    if (selectedSong) {
      //Save the previous recommended songs
      const fetchRecommendation = async (): Promise<any> => {
        console.log('halo');
        const res = await getRecommendedSongs({ track_id: selectedSong.spotify_id });
        if (res) {
          // Tạo một mảng chứa các spotify_id từ kết quả res
          const spotifyIds = res.map((song) => song.id); // Giả sử song.id là spotify_id cần tìm

          const { data, error } = await supabase
            .from('songs')
            .select('*')
            .in('spotify_id', spotifyIds);

          if (error) {
            console.error('Failed to fetch spotify Ids:', error);
            return;
          }
          console.log('spotify iddddd: ', data);
          setRecommendedSongs(data as Song[]);
          dispatch(setReduxRecommendedSongs(data as Song[]));
        }
      };
      fetchRecommendation();
      /** Sau khi lấy các bài hát được đề xuất từ phía máy chủ,
       * chúng ta sẽ lấy song_url từ supabase
       */
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
      {(selectedSong || recommendedSongs.length > 0) && (
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
