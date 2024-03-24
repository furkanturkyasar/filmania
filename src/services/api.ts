import { ajax } from 'rxjs/ajax';
import Config from 'react-native-config';

export const fetchUpcomingMovies = () => {

  const url: string = `${Config.BASE_API_URL}/movie/upcoming?language=tr-TR&page=1`;
  const token: string = `Bearer ${Config.API_TOKEN}`

  return ajax({
    url: url,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token
    }
  });
};
