import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExploreCarousel, { ExploreCarouselProps } from '../components/ExploreCarousel';
import { RootState } from '../../app/store';
import { addMovieToListRequestAction } from '../../features/movies/moviesActions';
import { getAuth } from "firebase/auth";

const ExploreCarouselContainer = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const activeIndex = useSelector((state: RootState) => state.shared.activeIndex); 
  const discoverMovies = useSelector((state: RootState) => state.movies.discoverMovies);
  const discoverTv = useSelector((state: RootState) => state.tv.discoverTv);
  const currentMoviesList = useSelector((state: RootState) => state.movies.movieLists);

  let discoverMedia  = discoverMovies;
  if (activeIndex !== 0)
    discoverMedia = discoverTv


  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  function onAddMedia(movieId: string) {
    if (userId) {
      return dispatch(addMovieToListRequestAction(userId, movieId));
    }
    else 
      console.log("User is not authenticated!")
  }  

  return <ExploreCarousel currentMoviesList={currentMoviesList} activeIndex={activeIndex} discoverMedia={discoverMedia} onAddMedia={onAddMedia} navigation={navigation} />;
};

export default ExploreCarouselContainer;
