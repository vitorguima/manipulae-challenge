import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Footer } from '../styles/Footer';
import { Header } from '../styles/Header';

import { removeFavoriteMusic } from '../actions/';

import AudioPlayer from '../components/AudioPlayer';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

import deezerLogo from '../images/deezerLogo.png';
import removeIcon from '../images/remove-icon.png';
import playButton from '../images/botao-play.png';

import useLocalStorage from '../hooks/useLocalStorage';

import {
  MusicCardWrapper,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
  RemoveButton,
  PlayButton,
} from '../styles/MusicCardStyle';

import { MusicListStyle } from '../styles/MusicListStyle';

function UserFavoriteSongs({ favoriteList, setNewFavoriteList }) {
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage('favoriteMusics', []);
  const [favoriteMusics, setFavoriteMusics] = useState(favoriteList.length ? favoriteList : favoriteStorage);
  const [playingMusic, setPlayingMusic] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const convertSecondsToMinutes = (time) => {
    return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
  };

  const removeFromFavorite = (musicId) => {
    const currentFavorites = [...favoriteMusics];
    if (currentFavorites.length === 1) {
      setNewFavoriteList([]);
      setFavoriteStorage([])
      setFavoriteMusics([]);
    } else {
      const newFavorites = currentFavorites
      .filter(({ id }) => id.toString() !== musicId.toString());
      setNewFavoriteList(newFavorites);
      setFavoriteStorage(newFavorites);
      setFavoriteMusics(newFavorites);
    }
  }

  const playOrPause = (target) => {
    setPlayingMusic(target.id)
    setIsPlaying((previous) => !previous);
  };
  
  const renderMusicList = () => {
    return(
      favoriteMusics
        .map((music, index) => {
          return (
            <MusicCardWrapper
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
            <PlayButton
              type="button"
              onClick={({target}) => playOrPause(target)}
            >
              <img 
                src={playButton}
                alt="play-button"
                id={music.preview}
                className={music.id}
              />
            </PlayButton>
              <RemoveButton
                type="button"
                onClick={({ target }) => removeFromFavorite(target.id)}
                id={music.id}
              >
                <img 
                  src={removeIcon}
                  alt="play-button"
                  id={music.id}
                />
              </RemoveButton>
              <a href={music.link}>
                <DeezerLogo src={ deezerLogo }/>
              </a>
            </CardButtons>
          </RightCard>
        </MusicCardWrapper>
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
          { favoriteList || favoriteStorage ? renderMusicList() : null }
        </MusicListStyle>
      </section>
      <Footer>
      <AudioPlayer 
          musicUrl={playingMusic}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
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
