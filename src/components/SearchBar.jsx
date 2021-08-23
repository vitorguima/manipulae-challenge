import React, { useState } from 'react'

export default function SearchBar({ setMusicList }) {
  const [searchType, setSearchType] = useState('artist');
  const [searchedValue, setSearchedValue] = useState('');
  
  const handleSearch = (target) => {
    const { value } = target;
    setSearchedValue(value);
  }

  return (
    <div>
      <form>
        <label>
          Album
          <input
            name="search-type"
            type="radio"
            value="album"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
        <input
          name="search-type"
          type="radio"
          value="artist"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        <input
          name="search-type"
          type="radio"
          value="title"
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        <label htmlFor="song-searchbar">
          <input
            value={ searchedValue }
            onChange={ (({ target }) => handleSearch(target)) }
            type="text"
            id="song-searchbar"
            placeholder="Encontre sua música aqui..."
          />
        </label>
{/* inserir função que fará a busca conforme o tipo de pesquisa e irá alterar o musicList */}
        <button
          type="button"
          onClick={() => console.log(searchedValue)}
        >
          Buscar
        </button>
      </form>
    </div>
  )
}
