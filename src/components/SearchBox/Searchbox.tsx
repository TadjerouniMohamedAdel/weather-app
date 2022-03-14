import React from 'react';
import { debounce } from 'lodash';

import './Searchbox.css';

type Props = {
  type: 'text' | 'password' | 'checkbox' | 'file' | 'radio';
  placeholder: string;
};

const Searchbox: React.FC<Props> = ({ type, placeholder }) => {
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const request = debounce((value: string) => {
    setSearchText(value);
  }, 2000);

  const debouceRequest = React.useCallback((value) => request(value), []);

  React.useEffect(() => {
    if (searchText !== '') {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${process.env.REACT_APP_API_ADDRESS}`
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [searchText]);

  return (
    <div
      className="searchbox"
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    >
      <i className="bx bx-search" />
      <input
        placeholder={placeholder}
        type={type}
        onChange={(e) => {
          setIsLoading(true);
          debouceRequest(e.target.value);
        }}
      />
      {isLoading && <i className="bx bx-loader-alt bx-spin" />}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="divider" />
        <i className="bx bx-current-location" />
      </button>
    </div>
  );
};

export default Searchbox;
