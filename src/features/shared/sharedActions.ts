import { Media } from "../../types/movie";
import { MultiMediaParam } from "../../types/shared";

export const SetActiveIndexAction = (index: number) => ({ type: 'shared/setActiveIndex', payload: index });
export const SetBookmarkList = (movie: Media) => ({ type: 'shared/setBookmarkList', payload: movie });
export const fetchMultiMediasAction = (param: MultiMediaParam) => ({type: 'shared/fetchMultiMedias', payload: param});
