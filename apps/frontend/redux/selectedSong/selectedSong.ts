import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSong: null,
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
