import { combineEpics } from 'redux-observable';
import { upcomingMoviesEpic, trendingMoviesEpic, nowPlayingMoviesEpic, discoverMoviesEpic, addMovieToListEpic, fetchMovieListsEpic } from '../features/movies/moviesEpic';
import { upcomingTvEpic, trendingTvEpic, nowPlayingTvEpic, discoverTvEpic} from '../features/tv/tvEpic';
import { saveListEpic } from '../features/list/listEpic';
import { fetchMultiMediasEpic } from '../features/shared/sharedEpic';

export const rootEpic = combineEpics(
    upcomingMoviesEpic,
    trendingMoviesEpic,
    nowPlayingMoviesEpic,
    discoverMoviesEpic,
    upcomingTvEpic,
    trendingTvEpic,
    nowPlayingTvEpic,
    discoverTvEpic,
    saveListEpic,
    addMovieToListEpic,
    fetchMovieListsEpic,
    fetchMultiMediasEpic
);
