import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { addMovieToListRequestAction } from '../../features/movies/moviesActions';
import { getAuth } from "firebase/auth";
import { fetchMovieDetails as movieDetail, fetchTVDetails as tvDetail } from '../../services/api';
import { RootState } from '../../app/store';
import { Media } from '../../types/movie';
import { catchError, from, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';


const ListItemContainer = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const currentMoviesList = useSelector((state: RootState) => state.movies.movieLists);

  const fetchMovieDetails = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      movieDetail(id).pipe(
        map((result: any) => result.response)
      ).subscribe({
        next: (response: any) => {
          setLoading(false)
          return resolve(response)
        },
        error: (error: any) => {
          setLoading(false)
          return reject(error)
        }
      })
    })
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    const fetchDetails = async () => {
      try {
        const movieIds = currentMoviesList[0]?.movies ?? [];
        const details = await Promise.all(movieIds.map(id => fetchMovieDetails(id)));
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (userId) {
      fetchDetails();
    } else {
      console.log("User is not authenticated or there are no movies in the list!");

    }
  }, [currentMoviesList]);

  function onAddMedia(movieId: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (userId)
      return dispatch(addMovieToListRequestAction(userId, movieId));
    else 
      console.log("User is not authenticated!")
  }

  return <ListItem movieDetails={movieDetails} onAddMedia={onAddMedia} isLoading={loading} navigation={navigation} />;
};

export default ListItemContainer;

