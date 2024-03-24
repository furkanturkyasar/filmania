import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getUpcomingMovies } from './moviesSlice';
import { fetchUpcomingMovies } from '../../services/api';

export const moviesEpic = (action$: any) =>
  action$.pipe(
    ofType('movies/fetchUpcomingMovies'),
    mergeMap(() =>
      fetchUpcomingMovies().pipe(
        map((ajaxResponse: any) => 
          getUpcomingMovies(ajaxResponse.response.results)
        ),
        catchError((error: any) => of({ type: 'movies/fetchFailed', error: error.message }))
      )
    )
  );