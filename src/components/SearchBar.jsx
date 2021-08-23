import React from 'react';

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
  }

  const handleCustomSearch = () => {
    setCustomSearch(true);
    setTotalSearchs(totalSearchs + 1);
  }

  const cleanCustomSearch = () => {
    setCustomSearch(false);
    setSearchValue('');
    setSearchType('');
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
        <label>
          Título
          <input
            name="search-type"
            type="radio"
            value="track"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
        <label>
          Artista
          <input
            name="search-type"
            type="radio"
            value="artist"
            onChange={ ({ target }) => setSearchType(target.value) }
          />
        </label>
        <label htmlFor="song-searchbar">
          <input
            value={ searchValue }
            onChange={ (({ target }) => handleSearch(target)) }
            type="text"
            id="song-searchbar"
            placeholder="Encontre sua música aqui..."
          />
        </label>
{/* inserir função que fará a busca conforme o tipo de pesquisa e irá alterar o musicList */}
        <button
          type="button"
          onClick={() => handleCustomSearch()}
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={() => cleanCustomSearch()}
        >
          Limpar
        </button>
      </form>
    </div>
  )
}
