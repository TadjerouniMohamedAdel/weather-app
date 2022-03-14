import React from 'react';
import { debounce } from 'lodash';
import { LatLngExpression } from 'leaflet';

import './Searchbox.css';

type Props = {
  type: 'text' | 'password' | 'checkbox' | 'file' | 'radio';
  placeholder: string;
};

type Suggestion = {
  properties: {
    formatted: string;
    geometry: {
      coordinates: LatLngExpression;
    };
  };
};

const Searchbox: React.FC<Props> = ({ type, placeholder }) => {
  const [searchText, setSearchText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);

  const request = debounce((value: string) => {
    setSearchText(value);
  }, 2000);

  const debouceRequest = React.useCallback(
    (value) => (value !== '' ? request(value) : setSearchText(value)),
    []
  );

  React.useEffect(() => {
    if (searchText !== '') {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=${process.env.REACT_APP_API_ADDRESS}`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('result', result.features);
          setSuggestions(result.features);
        })
        .catch((error) => console.log('error', error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      setSuggestions([]);
    }
  }, [searchText]);

  return (
    <div className="searchbox-container">
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
      <ul className="research-suggest">
        {suggestions.map((suggest) => (
          <li key={suggest.properties.formatted}>
            <i className="bx bx-map" />
            <span>{suggest.properties.formatted}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Searchbox;
