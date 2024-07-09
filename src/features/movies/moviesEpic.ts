import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getUpcomingMovies, getTrendingMovies, getNowPlayingMovies, getDiscoverMovies, fetchMovieListsStart, fetchMovieListsSuccess, fetchMovieListsFailure, addMovieToListRequest, addMovieToListSuccess, addMovieToListFailure } from './moviesSlice';
import { fetchUpcomingMedias, fetchTrendingMedias, fetchNowPlayingMedias, fetchDiscoverMedias } from '../../services/api';
import { FIREBASE_FIRESTORE } from '../../../FireBaseConfig';
import { collection, doc, getDocs, updateDoc, arrayUnion, getDoc, setDoc, arrayRemove } from 'firebase/firestore';
import { MovieList } from '../../types/movie';


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

export const fetchMovieListsEpic = (action$: any) =>
  action$.pipe(
    ofType(fetchMovieListsStart.type, 'movies/fetchCurrentMoviesList'),
    mergeMap((action: any) => {
      const userId = action.payload;
      return from(getDocs(collection(FIREBASE_FIRESTORE, 'users', userId, 'movieLists'))).pipe(
        map(querySnapshot => {
          const movieLists: MovieList[] = [];
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const movieList: MovieList = {
              movies: data.movies
            };
            movieLists.push(movieList);
          });
          return fetchMovieListsSuccess(movieLists);
        }),
        catchError(error => of(fetchMovieListsFailure(error.message)))
      );
    })
);
 
export const addMovieToListEpic = (action$: any) =>
  action$.pipe(
    ofType(addMovieToListRequest.type),
    mergeMap((action: any) => {
      const { userId, movieId } = action.payload;
      const listRef = doc(FIREBASE_FIRESTORE, 'users', userId, 'movieLists', 'default');
      return from(getDoc(listRef)).pipe(
        mergeMap(docSnapshot => {
          if (!docSnapshot.exists()) {
            return from(setDoc(listRef, { movies: [movieId] })).pipe(
              map(() => {
                return fetchMovieListsStart(userId);
              }),
              catchError(error => {
                return of(addMovieToListFailure(error.message));
              })
            );
          } else {
            const data = docSnapshot.data();
            if (data && data.movies && !data.movies.includes(movieId)) {
              return from(updateDoc(listRef, {
                movies: arrayUnion(movieId),
              })).pipe(
                map(() => {
                  return fetchMovieListsStart(userId);
                }),
                catchError(error => {
                  console.error("Error updating document: ", error.message);
                  return of(addMovieToListFailure(error.message));
                })
              );
            } else if (data && data.movies && data.movies.includes(movieId)) {
              return from(updateDoc(listRef, {
                movies: arrayRemove(movieId),
              })).pipe(
                map(() => fetchMovieListsStart(userId)),
                catchError(error => of(addMovieToListFailure(error.message)))
              );
            }
            return of(fetchMovieListsStart(userId));
          }
        }),
        catchError(error => {
          console.error("Error fetching document: ", error.message);
          return of(addMovieToListFailure(error.message));
        })
      );
    })
  );