import { combineReducers } from 'redux';
import selectedSong from './selectedSong/selectedSong';
import recommendedSong from './recommendedSong/recommendedSong';

export default combineReducers({ selectedSong, recommendedSong });
