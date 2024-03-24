import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';

export const rootReducer = combineReducers({
  movies: moviesReducer,
});
