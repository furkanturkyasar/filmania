import { combineEpics } from 'redux-observable';
import { upcomingMoviesEpic, trendingMoviesEpic, nowPlayingMoviesEpic, discoverMoviesEpic } from '../features/movies/moviesEpic';
import { upcomingTvEpic, trendingTvEpic, nowPlayingTvEpic, discoverTvEpic} from '../features/tv/tvEpic';

export const rootEpic = combineEpics(
    upcomingMoviesEpic,
    trendingMoviesEpic,
    nowPlayingMoviesEpic,
    discoverMoviesEpic,
    upcomingTvEpic,
    trendingTvEpic,
    nowPlayingTvEpic,
    discoverTvEpic
);
