import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { getMultiMedias } from './sharedSlice';
import { fetchMultiMedias } from '../../services/api';


export const fetchMultiMediasEpic = (action$: any) =>
  action$.pipe(
    ofType('shared/fetchMultiMedias'),
    mergeMap((action: any) => {
      return fetchMultiMedias(action.payload).pipe(
        map((ajaxResponse: any) => {
          return getMultiMedias(ajaxResponse.response)
        }
        ),
        catchError((error: any) => of({ type: 'shared/fetchFailed', error: error.message }))
      )
    }
    )
);

