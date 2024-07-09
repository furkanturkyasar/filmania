import { ListParam } from "../../types/list";

export const saveListAction = (params: ListParam) => ({ type: 'list/saveList' });
export const deleteListAction = (id: number) => ({ type: 'list/deleteList' });
export const addMediaAction = (id: number) => ({ type: 'list/addMedia' });
export const deleteMediaAction = (id: number) => ({ type: 'list/deleteMedia' });
export const listDetailsAction = (id: number) => ( {type: 'list/listDetails' });
export const hasMediaAction = (listId: number, movieId: number) => ( {type: 'list/hasMedia' });