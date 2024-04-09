import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getUpcomingTv, getTrendingTv, getNowPlayingTv, getDiscoverTv } from './tvSlice';
import { fetchUpcomingMedias, fetchTrendingMedias, fetchNowPlayingMedias, fetchDiscoverMedias } from '../../services/api';

export const upcomingTvEpic = (action$: any) =>
  action$.pipe(
    ofType('tv/fetchUpcomingTv'),
    mergeMap((action: any) =>
      fetchUpcomingMedias(action.payload).pipe(
        map((ajaxResponse: any) => 
          getUpcomingTv(ajaxResponse.response.results)
        ),
        catchError((error: any) => of({ type: 'tv/fetchFailed', error: error.message }))
      )
    )
);

export const trendingTvEpic = (action$: any) =>
  action$.pipe(
    ofType('tv/fetchTrendingTv'),
    mergeMap((action: any) =>
      fetchTrendingMedias(action.payload).pipe(
        map((ajaxResponse: any) =>  {
          return getTrendingTv(ajaxResponse.response.results.slice(0, 10))
        }
        ),
        catchError((error: any) => of({ type: 'tv/fetchFailed', error: error.message }))
      )
    )
);

export const nowPlayingTvEpic = (action$: any) => {
  return (
    action$.pipe(
      ofType('tv/fetchNowPlayingTv'),
      mergeMap((action: any) => {
        return fetchNowPlayingMedias(action.payload).pipe(
            map((ajaxResponse: any) => 
            getNowPlayingTv(ajaxResponse.response.results)
            ),
            catchError((error: any) => of({ type: 'tv/fetchFailed', error: error.message }))
          )
        }
      )
  )
  )
}

export const discoverTvEpic = (action$: any) => {
    return (
      action$.pipe(
        ofType('tv/fetchDiscoverTv'),
        mergeMap((action: any) => {
          return fetchDiscoverMedias(action.payload).pipe(
              map((ajaxResponse: any) => 
              getDiscoverTv(ajaxResponse.response.results)
              ),
              catchError((error: any) => of({ type: 'tv/fetchFailed', error: error.message }))
            )
          }
        )
    )
    )
  }
  
