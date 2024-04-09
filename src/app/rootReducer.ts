import { combineReducers } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import tvReducer from '../features/tv/tvSlice';


export const rootReducer = combineReducers({
  movies: moviesReducer,
  tv: tvReducer
});
