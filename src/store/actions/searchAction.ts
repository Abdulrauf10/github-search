import axios from 'axios';
import { Dispatch } from 'redux';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

interface SearchRequestAction {
  type: typeof SEARCH_REQUEST;
  payload: { query: string; type: string; page: number };
}

interface SearchSuccessAction {
  type: typeof SEARCH_SUCCESS;
  payload: any[];
}

interface SearchFailureAction {
  type: typeof SEARCH_FAILURE;
  payload: string;
}

export type SearchActionTypes =
  | SearchRequestAction
  | SearchSuccessAction
  | SearchFailureAction;

export const searchRequest = (
  query: string,
  type: string,
  page: number,
): SearchRequestAction => ({
  type: SEARCH_REQUEST,
  payload: { query, type, page },
});

export const searchSuccess = (data: any[]): SearchSuccessAction => ({
  type: SEARCH_SUCCESS,
  payload: data,
});

export const searchFailure = (error: string): SearchFailureAction => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const fetchSearchResults: any = (
  query: string,
  type: string,
  page: number,
) => {
  return async (dispatch: Dispatch<SearchActionTypes>) => {
    dispatch(searchRequest(query, type, page));
    try {
      const response = await axios.get(
        `https://api.github.com/search/${type}`,
        {
          params: { q: query, page: page, per_page: 10 },
        },
      );
      dispatch(searchSuccess(response.data.items));
      dispatch(searchFailure(''));
    } catch (error: any) {
      console.log('err :', error);
      dispatch(searchFailure(error.message));
    }
  };
};
