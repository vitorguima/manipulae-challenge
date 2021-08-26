import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Header, NavWrapper, SearchBarWrapper } from '../styles/Header';

import { removeFavoriteMusic } from '../actions';

import Navbar from '../components/Navbar';

import useLocalStorage from '../hooks/useLocalStorage';

import { MusicListStyle, MusicListWrapper } from '../styles/MusicListStyle';
import MusicCard from '../components/MusicCard';

function UserFavoriteSongs({ favoriteList, setNewFavoriteList }) {
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage('favoriteMusics', []);
  const [
    favoriteMusics,
    setFavoriteMusics,
  ] = useState(favoriteList.length ? favoriteList : favoriteStorage);

  const removeFromFavorite = (target) => {
    const { id } = target;
    const currentFavorites = [...favoriteMusics];
    if (currentFavorites.length === 1) {
      setNewFavoriteList([]);
      setFavoriteStorage([]);
      setFavoriteMusics([]);
    } else {
      const newFavorites = currentFavorites
        .filter((favorite) => favorite.id.toString() !== id.toString());
      setNewFavoriteList(newFavorites);
      setFavoriteStorage(newFavorites);
      setFavoriteMusics(newFavorites);
    }
  };

  const renderMusicList = () => (
    favoriteMusics
      .map((music, index) => (
        <MusicCard
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          music={music}
          saveFavoriteList={removeFromFavorite}
        />
      ))
  );

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
          { favoriteMusics ? renderMusicList() : null }
        </MusicListStyle>
      </MusicListWrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  favoriteList: state.favoriteMusics.favoriteList,
});

const mapDispatchToProps = (dispatch) => ({
  setNewFavoriteList: (musicList) => dispatch(removeFavoriteMusic(musicList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFavoriteSongs);

UserFavoriteSongs.propTypes = {
  setNewFavoriteList: PropTypes.func,
  favoriteList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      duration: PropTypes.number,
      preview: PropTypes.string,
      album: PropTypes.shape({
        cover_medium: PropTypes.string,
      }).isRequired,
      artis: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
      setIsPlaying: PropTypes.func,
    }),
  ).isRequired,
}.isRequired;
