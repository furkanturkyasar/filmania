import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Media, MovieList, MovieState } from '../../types/movie';


const initialState: MovieState = {
  upcomingMovies: [],
  trendingMovies: [],
  nowPlayingMovies: [],
  discoverMovies: [],
  movieLists: [],
  status: 'idle',
  error: null,
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
    },
    fetchMovieListsStart: (state) => {
      state.status = 'loading';
    },
    fetchMovieListsSuccess: (state, action: PayloadAction<MovieList[]>) => {
      state.status = 'succeeded';
      state.movieLists = action.payload;
    },
    fetchMovieListsFailure: (state, action: PayloadAction<string>) => {
      console.log("failure: ", action.payload)
      state.status = 'failed';
      state.error = action.payload;
    },
    addMovieToListRequest: (state) => {
      state.status = 'loading';
    },
    addMovieToListSuccess: (state, action: PayloadAction<{ listId: string, movie: Media }>) => {
      const { listId, movie } = action.payload;
      // const existingList = state.movieLists.find((list) => list.id === listId);
      // if (existingList) {
      //   existingList.movies.push(movie.id);
      // }
      state.status = 'succeeded';
    },
    addMovieToListFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { getUpcomingMovies, getTrendingMovies, getNowPlayingMovies, getDiscoverMovies, fetchMovieListsStart, fetchMovieListsSuccess, fetchMovieListsFailure, addMovieToListSuccess, addMovieToListRequest, addMovieToListFailure } = movieSlice.actions;

export default movieSlice.reducer;
