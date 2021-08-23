import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Footer } from '../styles/Footer';
import { Header } from '../styles/Header';

import { removeFavoriteMusic } from '../actions/';

function UserFavoriteSongs({ favoriteList, setNewFavoriteList }) {
  const convertSecondsToMinutes = (time) => {
    return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
  };

  const removeFromFavorite = (musicId) => {
    const currentFavorites = [...favoriteList];
    if (currentFavorites.length === 1) {
      setNewFavoriteList([]);
    } else {
      const newFavorites = currentFavorites
      .filter(({ id }) => id.toString() !== musicId.toString());
      setNewFavoriteList(newFavorites);
    }
  }
  
  const renderMusicList = () => {
    return(
      favoriteList
        .map((music, index) => {
        if (favoriteList.length === index + 1) {
          return (
          <div 
            key={index}
          >
            <p>{music.title}</p>
            <img 
              src={music.album.cover_medium} 
              alt={music.title}
            />
            <p>{music.artist.name}</p>
            <div>
              <p>{convertSecondsToMinutes(music.duration)}</p>
              <button
              type="button"
              >
                Tocar
              </button>
              <button
                type="button"
                onClick={({ target }) => removeFromFavorite(target.id)}
              >
                Remover
              </button>
            </div>
          </div>)
        }
        return (
        <div 
          key={index}
        >
          <p>{music.title}</p>
          <img 
            src={music.album.cover_medium} 
            alt={music.title}
          />
          <p>{music.artist.name}</p>
          <div>
            <p>{convertSecondsToMinutes(music.duration)}</p>
            <button
              type="button"
            >
              Tocar
            </button>
            <button
              type="button"
              id={music.id}
              onClick={({ target }) => removeFromFavorite(target.id)}
            >
              Remover
            </button>
          </div>
        </div>)})
    )
  }

  return (
    <div>
      <Header>
        <Link to="/">Músicas</Link>
        <Link to="/favorite-songs">Favoritas</Link>
      </Header>
      <section>
        <div>
          { favoriteList ? renderMusicList() : null }
        </div>
      </section>
      <Footer>
        <p>MusicFavorite footer</p>
      </Footer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  favoriteList: state.favoriteMusics.favoriteList,
});

const mapDispatchToProps = (dispatch) => ({
  setNewFavoriteList: (musicList) => dispatch(removeFavoriteMusic(musicList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFavoriteSongs);
