import { createAction, props } from '@ngrx/store';
import { CommonSearchResultModel } from '../../model/search.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

export const search = createAction(
  '[Search] Search',
  props<{ query: string }>(),
);

export const searchSuccess = createAction(
  '[Search] Search Success',
  props<{ searchResult: CommonSearchResultModel }>(),
);

export const searchFailure = createAction(
  '[Search] Search Failure',
  props<{ searchResultPostFailure: HttpErrorResponseModel }>(),
);

export const searchReset = createAction('[Search] Search Reset');
