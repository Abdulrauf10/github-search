import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import { AppState } from '../../types/search';

const rootReducer = combineReducers<AppState>({
  search: searchReducer as any,
});

export default rootReducer;
