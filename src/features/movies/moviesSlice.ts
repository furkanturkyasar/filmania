import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MovieState } from '../../types/movie';


const initialState: MovieState = {
  upcomingMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  discoverMovies: []
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getUpcomingMovies: (state, action: PayloadAction<Media[]>) => {
        state.upcomingMovies = action.payload;
    },
    getTrendingMovies: (state, action: PayloadAction<Media[]>) => {
      state.trendingMovies = action.payload;
    },
    getNowPlayingMovies: (state, action: PayloadAction<Media[] | null>) => {
      if (state.nowPlayingMovies && action.payload) {
        state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload];
      } else {
        state.nowPlayingMovies = action.payload
      }
    },
    getDiscoverMovies: (state, action: PayloadAction<Media[] | null>) => {
      if (state.discoverMovies && action.payload) {
        state.discoverMovies = [...state.discoverMovies, ...action.payload];
      } else {
        state.discoverMovies = action.payload
      }
    }
  },
});

export const { getUpcomingMovies, getTrendingMovies, getNowPlayingMovies, getDiscoverMovies } = movieSlice.actions;

export default movieSlice.reducer;
