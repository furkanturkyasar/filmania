import { nowPlayingMediaParam } from "../../types/movie";

export const fetchUpcomingTvAction = (type?: string) => ({ type: 'tv/fetchUpcomingTv', payload: type });
export const fetchTrendingTvAction = (type?: string) => ({ type: 'tv/fetchTrendingTv', payload: type });
export const fetchNowPlayingTvAction = (param?: nowPlayingMediaParam) => ({ type: 'tv/fetchNowPlayingTv', payload: param });
