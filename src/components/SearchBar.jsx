import React from 'react';

import PropTypes from 'prop-types';

import {
  SearchBarStyle,
  SearchButton,
  ClearButton,
  CheckList,
} from '../styles/SearchbarStyle';

import SearchIcon from '../svg/search.svg';

export default function SearchBar(props) {
  const {
    searchValue,
    setSearchValue,
    setSearchType,
    setCustomSearch,
    totalSearchs,
    setTotalSearchs,
  } = props;

  const handleSearch = (target) => {
    const { value } = target;
    setSearchValue(value);
  };

  const handleCustomSearch = () => {
    setCustomSearch(true);
    setTotalSearchs(totalSearchs + 1);
  };

  const cleanCustomSearch = () => {
    setCustomSearch(false);
    setSearchValue('');
    setSearchType('');
  };

  return (
    <>
      <form onSubmit={((e) => { e.preventDefault(); handleCustomSearch(); })}>
        <SearchBarStyle>
          <img src={SearchIcon} alt="search-icon" />
          <input
            value={searchValue}
            onChange={(({ target }) => handleSearch(target))}
            type="text"
            id="song-searchbar"
            placeholder="Digite sua busca..."
          />
        </SearchBarStyle>
      </form>
      <div>
        <CheckList>
          Album
          <input
            name="search-type"
            type="radio"
            value="album"
            onChange={({ target }) => setSearchType(target.value)}
          />
        </CheckList>
        <CheckList>
          Título
          <input
            name="search-type"
            type="radio"
            value="track"
            onChange={({ target }) => setSearchType(target.value)}
          />
        </CheckList>
        <CheckList>
          Artista
          <input
            name="search-type"
            type="radio"
            value="artist"
            onChange={({ target }) => setSearchType(target.value)}
          />
        </CheckList>
      </div>
      <div style={{ margin: '10px' }}>
        <SearchButton
          type="button"
          onClick={() => handleCustomSearch()}
        >
          Buscar
        </SearchButton>
        <ClearButton
          type="button"
          onClick={() => cleanCustomSearch()}
        >
          Limpar
        </ClearButton>
      </div>
    </>
  );
}

SearchBar.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  setSearchType: PropTypes.string,
  setCustomSearch: PropTypes.func,
  totalSearchs: PropTypes.number,
  setTotalSearchs: PropTypes.func,
}.isRequired;
