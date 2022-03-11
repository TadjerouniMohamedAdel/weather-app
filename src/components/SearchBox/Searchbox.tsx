import React from 'react';
import './Searchbox.css';

type Props = {
  type: 'text' | 'password' | 'checkbox' | 'file' | 'radio';
  placeholder: string;
  onChange: (ev: { target: { value: string } }) => void;
};

const Searchbox: React.FC<Props> = ({ type, placeholder, onChange }) => (
  <div
    className="searchbox"
    onDoubleClick={(e) => {
      e.stopPropagation();
    }}
  >
    <i className="bx bx-search" />
    <input placeholder={placeholder} type={type} onChange={onChange} />
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

export default Searchbox;
