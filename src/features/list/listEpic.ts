import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getListDetails } from './listSlice';
import { saveList, deleteList } from '../../services/api';


export const saveListEpic = (action$: any) =>
  action$.pipe(
    ofType('list/saveList'),
    mergeMap((action: any) =>
      saveList(action.payload).pipe(
        map((ajaxResponse: any) => 
          getListDetails(ajaxResponse.response.results)
        ),
        catchError((error: any) => of({ type: 'list/fetchFailed', error: error.message }))
      )
    )
);

export const deleteListEpic = (action$: any) =>
  action$.pipe(
    ofType('list/deleteList'),
    mergeMap((action: any) =>
      deleteList(action.payload).pipe(
        map((ajaxResponse: any) => 
          getListDetails(ajaxResponse.response.results)
        ),
        catchError((error: any) => of({ type: 'list/fetchFailed', error: error.message }))
      )
    )
);
