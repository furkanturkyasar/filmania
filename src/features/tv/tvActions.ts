import { MediaParam } from "../../types/movie";

export const fetchUpcomingTvAction = (type?: string) => ({ type: 'tv/fetchUpcomingTv', payload: type });
export const fetchTrendingTvAction = (type?: string) => ({ type: 'tv/fetchTrendingTv', payload: type });
export const fetchNowPlayingTvAction = (param?: MediaParam) => ({ type: 'tv/fetchNowPlayingTv', payload: param });
export const fetchDiscoverTvAction = (param?: MediaParam) => ({ type: 'tv/fetchDiscoverTv', payload: param });
