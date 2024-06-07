import { Song } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const emptySong: Song = {
  id: '',
  user_id: '',
  author: '',
  title: '',
  song_path: '',
  image_path: '',
  genre: '',
  spotify_id: '',
};

const initialState = {
  selectedSong: emptySong,
};

const selectedSongSlice = createSlice({
  name: 'selectedSong',
  initialState,
  reducers: {
    setSelectedSong: (state, action) => {
      console.log('action.payload', action.payload);
      state.selectedSong = action.payload;
    },
  },
});

export const { setSelectedSong } = selectedSongSlice.actions;

export default selectedSongSlice.reducer;
