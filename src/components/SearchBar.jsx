import React from 'react'

export default function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="song-searchbar">
          <input 
            type="text"
            id="song-searchbar"
            placeholder="Encontre sua música aqui..."
          />
        </label>
      </form>
    </div>
  )
}
