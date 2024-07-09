export interface Media {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ListParam {
    name: string;
    description?: string;
    language?: string;
}

export interface ListState {
    // saveList: ListParam;
    // deleteList: number;
    // addMedia: number;
    // deleteMedia: number;
    listDetails: Media[] | null;
    hasMedia: boolean;
}