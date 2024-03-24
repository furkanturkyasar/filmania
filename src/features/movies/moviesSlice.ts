import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieState } from '../../types/movie';


const initialState: MovieState = {
  upcomingMovies: [],
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
        console.log("triggered!!!!!!")
        state.upcomingMovies = action.payload;
    },
  },
});

export const { getUpcomingMovies } = movieSlice.actions;

export default movieSlice.reducer;
