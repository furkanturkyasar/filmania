import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getUpcomingMovies, getTrendingMovies, getNowPlayingMovies, getDiscoverMovies } from './moviesSlice';
import { fetchUpcomingMedias, fetchTrendingMedias, fetchNowPlayingMedias, fetchDiscoverMedias } from '../../services/api';


export const upcomingMoviesEpic = (action$: any) =>
  action$.pipe(
    ofType('movies/fetchUpcomingMovies'),
    mergeMap(() =>
      fetchUpcomingMedias().pipe(
        map((ajaxResponse: any) => 
          getUpcomingMovies(ajaxResponse.response.results)
        ),
        catchError((error: any) => of({ type: 'movies/fetchFailed', error: error.message }))
      )
    )
);

export const trendingMoviesEpic = (action$: any) =>
  action$.pipe(
    ofType('movies/fetchTrendingMovies'),
    mergeMap(() =>
      fetchTrendingMedias().pipe(
        map((ajaxResponse: any) =>  {
          return getTrendingMovies(ajaxResponse.response.results.slice(0, 10))
        }
        ),
        catchError((error: any) => of({ type: 'movies/fetchFailed', error: error.message }))
      )
    )
);

export const nowPlayingMoviesEpic = (action$: any) => {
  return (
    action$.pipe(
      ofType('movies/fetchNowPlayingMovies'),
      mergeMap((action: any) =>
        fetchNowPlayingMedias(action.payload).pipe(
          map((ajaxResponse: any) => 
          getNowPlayingMovies(ajaxResponse.response.results)
          ),
          catchError((error: any) => of({ type: 'movies/fetchFailed', error: error.message }))
        )
      )
  )
  )
}

export const discoverMoviesEpic = (action$: any) => {
  return (
    action$.pipe(
      ofType('movies/fetchDiscoverMovies'),
      mergeMap((action: any) =>{
        return fetchDiscoverMedias(action.payload).pipe(
          map((ajaxResponse: any) => {
            return getDiscoverMovies(ajaxResponse.response.results)
          } 
          ),
          catchError((error: any) => of({ type: 'movies/fetchFailed', error: error.message }))
        )
      }
        
      )
  )
  )
}
  
