import { combineEpics } from 'redux-observable';
import { moviesEpic } from '../features/movies/moviesEpic';

export const rootEpic = combineEpics(
    moviesEpic,
);
