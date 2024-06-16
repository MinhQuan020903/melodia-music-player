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
      /*       // Fetch the Spotify access token from your API
      const tokenResponse = await axios.get('/api/get-spotify-token');
      console.log('Access token:', tokenResponse.data);
      const accessToken = tokenResponse.data.accessToken;

      const response = await axios.get(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data; */
      const { data } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('spotify_id', spotifyId)
        .single();
      return data;
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

      if (error || !data) {
        const spotifySong = await fetchSongFromSpotify(id);
        if (spotifySong) {
          setSong(spotifySong as Song);
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

  useEffect(() => {}, [song]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song],
  );
};

export default useGetSongById;
