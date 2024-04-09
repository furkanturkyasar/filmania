import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, TvState } from '../../types/movie';


const initialState: TvState = {
  upcomingTv: [],
  trendingTv: [],
  nowPlayingTv: [],
  discoverTv: []
};

export const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    getUpcomingTv: (state, action: PayloadAction<Media[]>) => {
        state.upcomingTv = action.payload;
    },
    getTrendingTv: (state, action: PayloadAction<Media[]>) => {
      state.trendingTv = action.payload;
    },
    getNowPlayingTv: (state, action: PayloadAction<Media[] | null>) => {
      if (state.nowPlayingTv && action.payload) {
        state.nowPlayingTv = [...state.nowPlayingTv, ...action.payload];
      } else {
        state.nowPlayingTv = action.payload
      }
    },
    getDiscoverTv: (state, action: PayloadAction<Media[] | null>) => {
      if (state.discoverTv && action.payload) {
        state.discoverTv = [...state.discoverTv, ...action.payload];
      } else {
        state.discoverTv = action.payload
      }
    }
  },
});

export const { getUpcomingTv, getTrendingTv, getNowPlayingTv, getDiscoverTv } = tvSlice.actions;

export default tvSlice.reducer;
