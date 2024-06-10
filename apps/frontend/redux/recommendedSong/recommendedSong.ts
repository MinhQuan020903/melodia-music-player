import { createSlice } from '@reduxjs/toolkit';
import { Song } from '@/types';

const initialState = {
  recommendedSongs: [] as Song[],
};

const recommendedSongSlice = createSlice({
  name: 'recommendedSong',
  initialState,
  reducers: {
    setReduxRecommendedSongs: (state, action) => {
      console.log('Setting recommended songs:', action.payload);
      state.recommendedSongs = action.payload;
    },
  },
});

export const { setReduxRecommendedSongs } = recommendedSongSlice.actions;

export default recommendedSongSlice.reducer;
