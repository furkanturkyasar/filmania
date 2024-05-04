import { ajax } from 'rxjs/ajax';
import Config from 'react-native-config';
import { MediaParam } from '../types/movie';

const token: string = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2MxNDMwOGE0ZTAyOWI4MWMyZGEzN2M0OWMxOWNmMCIsInN1YiI6IjY1OTAyYTU0ZjVmMWM1NzY5MDAwOTE5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sSENPbCWPLO8zdv2w89B5wqaVwxFvYwlDXEWs_NSeEk`

export const fetchUpcomingMedias = (type: string | null = "movie") => {
 
  let url: string = `${Config.BASE_API_URL}/${type}/upcoming?language=tr-TR&page=1`;

  if (type === "tv") {
    url= `${Config.BASE_API_URL}/${type}/on_the_air?language=tr-TR&page=1`;
  }

  return ajax({
    url: url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  });
};

export const fetchTrendingMedias = (type: string | null = "movie") => {
 
  const url: string = `${Config.BASE_API_URL}/trending/${type}/week?language=tr-TR`;
  
  return ajax({
    url: url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  });
};

export const fetchNowPlayingMedias = (param?: MediaParam) => {
  let query: string = "";

  if (param) {
    if (param.pageNumber) {
      query += "&page=" + param.pageNumber
    }
  }
 
  let url: string = `${Config.BASE_API_URL}/movie/now_playing?language=tr-TR${query}`;

  if (param && param.type === "tv") {
    url= `${Config.BASE_API_URL}/tv/airing_today?language=tr-TR${query}`;
  }

  return ajax({
    url: url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  });
};

export const fetchDiscoverMedias = (param?: MediaParam) => {
  let query: string = "movie"
  if (param) {
    if (param.type && param.type === "tv") {
      query = "tv"
    }
  }

  const url: string = `${Config.BASE_API_URL}/discover/${query}?language=tr-TR`;
  
  return ajax({
    url: url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  });
};
