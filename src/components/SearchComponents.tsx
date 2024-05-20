import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types/search';
import { fetchSearchResults } from '../store/actions/searchAction';
import './SearchComponent.css';

const Search: React.FC = () => {
  const [type, setType] = useState<string>('users');
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const searchState = useSelector((state: AppState) => state.search);

  const handleSearch = (query: any) => {
    setValue(query);
    setPage(1);
    dispatch(fetchSearchResults(query, type, page));
  };

  const handleSelect = (query: any) => {
    setType(query);

    dispatch(fetchSearchResults(value, query, page));
  };

  const handlePageIncrement = () => {
    const newPage = page + 1;
    setPage(newPage);
    dispatch(fetchSearchResults(value, type, newPage));
  };

  const handlePageDecrement = () => {
    const newPage = page - 1;
    setPage(newPage);
    dispatch(fetchSearchResults(value, type, newPage));
  };

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          value={value}
          placeholder="Typing to search users or repositories"
          style={{ marginRight: '20px' }}
        />
        <select value={type} onChange={(e) => handleSelect(e.target.value)}>
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
        </select>
      </div>

      <div>
        {searchState.error && value !== '' ? (
          <p style={{ color: 'red' }}>{searchState.error}</p>
        ) : null}
        <ul>
          {searchState?.data?.map((item: any, index: any) => (
            <li key={index}>
              {type === 'users' ? (
                <>
                  <img src={item.avatar_url} alt={item.login} width="50" />
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.login}
                  </a>
                </>
              ) : type === 'repositories' && item ? (
                <>
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                  <p>{item.description}</p>
                  <p>Stars: {item.stargazers_count}</p>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="button-page">
        <button
          onClick={handlePageDecrement}
          disabled={page === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <button onClick={handlePageIncrement}>Next</button>
      </div>
    </div>
  );
};

export default Search;
