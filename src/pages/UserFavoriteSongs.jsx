import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Header, NavWrapper, SearchBarWrapper } from '../styles/Header';

import { removeFavoriteMusic } from '../actions/';

import Navbar from '../components/Navbar';

import useLocalStorage from '../hooks/useLocalStorage';

import { MusicListStyle, MusicListWrapper } from '../styles/MusicListStyle';
import MusicCard from '../components/MusicCard';

function UserFavoriteSongs({ favoriteList, setNewFavoriteList }) {
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage('favoriteMusics', []);
  const [favoriteMusics, setFavoriteMusics] = useState(favoriteList.length ? favoriteList : favoriteStorage);

  const removeFromFavorite = (target) => {
    const { id } = target;
    const currentFavorites = [...favoriteMusics];
    if (currentFavorites.length === 1) {
      setNewFavoriteList([]);
      setFavoriteStorage([])
      setFavoriteMusics([]);
    } else {
      const newFavorites = currentFavorites
      .filter((favorite) => favorite.id.toString() !== id.toString());
      setNewFavoriteList(newFavorites);
      setFavoriteStorage(newFavorites);
      setFavoriteMusics(newFavorites);
    }
  }

  const renderMusicList = () => {
    return(
      favoriteMusics
        .map((music, index) => {
          return (
          <MusicCard 
            key={index}
            music={music}
            saveFavoriteList={removeFromFavorite}
          /> 
        )
      })
    )
  }

  return (
    <div>
      <Header>
        <NavWrapper>
        <Navbar />
        </NavWrapper>
        <SearchBarWrapper />
      </Header>
      <MusicListWrapper>
        <MusicListStyle>
          { favoriteList || favoriteStorage ? renderMusicList() : null }
        </MusicListStyle>
      </MusicListWrapper>
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
