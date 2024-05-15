import { Song } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

/* Todo: Đã lấy được token, cần fetch bài hát bằng token đó */

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song>();
  const { supabaseClient } = useSessionContext();

  const fetchSongFromSpotify = async (spotifyId: string) => {
    try {
      // Fetch the Spotify access token from your API
      const tokenResponse = await axios.get('/api/get-spotify-token');
      console.log('Access token:', tokenResponse.data);
      const accessToken = tokenResponse.data.accessToken;

      const response = await axios.get(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching song from Spotify:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient.from('songs').select('*').eq('id', id).single();

      console.log('Check bai hat: ', data, error);
      if (error || !data) {
        const spotifySong = await fetchSongFromSpotify(id);
        console.log('Check bai hat spotify: ', spotifySong);
        if (spotifySong) {
          setSong({
            id: spotifySong.id,
            user_id: '', // Assuming user_id is not available from Spotify, set as empty or handle accordingly
            author: spotifySong.artists[0].name,
            title: spotifySong.name,
            song_path: spotifySong.preview_url,
            image_path: spotifySong.album.images[0].url, // Assuming image_path can be retrieved from the album's first image
          });
        } else {
          toast.error('Fetching song failed.');
        }
      } else {
        setSong(data as Song);
      }

      setSong(data as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  useEffect(() => {
    console.log('Songggggggg:', song);
  }, [song]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song],
  );
};

export default useGetSongById;
