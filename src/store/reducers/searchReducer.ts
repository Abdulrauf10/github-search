import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SearchActionTypes,
} from '../actions/searchAction';
import { SearchState } from '../../types/search';

const initialState: SearchState = {
  loading: false,
  query: '',
  type: 'users',
  page: 1,
  data: [],
  error: null,
};

const searchReducer = (
  state = initialState,
  action: SearchActionTypes,
): SearchState => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        query: action.payload.query,
        type: action.payload.type,
        page: action.payload.page,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
