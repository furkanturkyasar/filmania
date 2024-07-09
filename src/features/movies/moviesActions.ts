import { MediaParam } from "../../types/movie";

export const fetchUpcomingMoviesAction = () => ({ type: 'movies/fetchUpcomingMovies' });
export const fetchTrendingMoviesAction = () => ({ type: 'movies/fetchTrendingMovies' });
export const fetchNowPlayingMoviesAction = (param?: MediaParam) => ({ type: 'movies/fetchNowPlayingMovies', payload: param });
export const fetchDiscoverMoviesAction = (param?: MediaParam) => ({ type: 'movies/fetchDiscoverMovies', payload: param });
export const addMovieToListRequestAction = (userId: string, movieId: string) => ({ type: 'movies/addMovieToListRequest', payload: { userId, movieId }});
export const fetchCurrentMovieList = (userId: string) => ({type: 'movies/fetchCurrentMoviesList', payload: userId});  
