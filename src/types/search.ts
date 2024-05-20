export interface SearchState {
  loading?: boolean;
  query?: string;
  type?: string;
  page?: number;
  data?: any[];
  error?: string | null;
}

export interface AppState {
  search: SearchState;
}
