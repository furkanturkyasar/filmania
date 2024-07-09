export interface Media {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MediaParam {
    language?: string;
    pageNumber?: number;
    type?: string;
}

export interface MovieList {
    movies?: string[];
}

export interface MovieState {
    upcomingMovies: Media[] | null;
    trendingMovies: Media[] | null;
    nowPlayingMovies: Media[] | null;
    discoverMovies: Media[] | null;
    movieLists: MovieList[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface TvState {
    upcomingTv: Media[] | null;
    trendingTv: Media[] | null;
    nowPlayingTv: Media[] | null;
    discoverTv: Media[] | null;
}

export interface SharedState {
    activeIndex: number;
    bookmarkList: Media[] | [];
    multiMedias: Media[] | [];
    pagedInfo: {};
}