import { SearchState } from './search.state';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { createReducer, on } from '@ngrx/store';
import { CommonSearchResultModel } from '../../model/search.model';
import * as SearchActions from './search.actions';

export const initialState: SearchState = {
  searchResult: <CommonSearchResultModel>{},
  searchResultLoading: false,
  searchResultFailure: <HttpErrorResponseModel>{},
  isSearching: false,
  isSearchingSuccess: false,
};

export const SearchReducer = createReducer(
  initialState,

  on(SearchActions.search, (state, { query, type }) => {
    console.log(type);
    return {
      ...state,
      searchResultLoading: true,
      isSearching: true,
    };
  }),

  on(SearchActions.searchSuccess, (state, { searchResult, type }) => {
    console.log(type);
    return {
      ...state,
      searchResult: searchResult,
      searchResultLoading: false,
      isSearching: false,
      isSearchingSuccess: true,
    };
  }),

  on(
    SearchActions.searchFailure,
    (state, { searchResultPostFailure, type }) => {
      console.log(type);
      return {
        ...state,
        searchResultFailure: searchResultPostFailure,
        searchResultLoading: false,
      };
    },
  ),

  on(SearchActions.searchReset, (state, { type }) => {
    console.log(type);
    return {
      searchResult: <CommonSearchResultModel>{},
      searchResultLoading: false,
      searchResultFailure: <HttpErrorResponseModel>{},
      isSearching: false,
      isSearchingSuccess: false,
    };
  }),
);
