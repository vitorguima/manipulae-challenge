import React from 'react';

import { connect } from 'react-redux';

import { Footer } from '../styles/Footer';
import { Header } from '../styles/Header';

import { removeFavoriteMusic } from '../actions/';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

import deezerLogo from '../images/deezerLogo.png';

import {
  MusicCard,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
} from '../styles/MusicCardStyle';
import { MusicListStyle } from '../styles/MusicListStyle';

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
          return (
            <MusicCard
          key={index}
        >
          <AlbumImage>
            <img 
              src={music.album.cover_medium} 
              alt={music.title}
            />
          </AlbumImage>
          <RightCard>
            <MusicInformation>
              <p>{music.title}</p>
              <p>Artista: {music.artist.name}</p>
              <p>Duração: {convertSecondsToMinutes(music.duration)}</p>
            </MusicInformation>
            <CardButtons >
              {/* <button
                type="button"
                id={music.preview}
                onClick={({target}) => playOrPause(target)}
              >
                Tocar
              </button> */}
              <button
                type="button"
                onClick={({ target }) => removeFromFavorite(target.id)}
                id={music.id}
              >
                Remover
              </button>
              <a href={music.link}>
                <DeezerLogo src={ deezerLogo }/>
              </a>
            </CardButtons>
          </RightCard>
        </MusicCard>
        )
      })
    )
  }

  return (
    <div>
      <Header>
        <Navbar />
        <div style={ { visibility: 'hidden' } }>
        <SearchBar />
        </div>
      </Header>
      <section>
        <MusicListStyle>
          { favoriteList ? renderMusicList() : null }
        </MusicListStyle>
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
