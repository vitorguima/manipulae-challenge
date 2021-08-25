import React, { useState } from 'react';

import { connect } from 'react-redux';

import AudioPlayer from './AudioPlayer';

import deezerLogo from '../images/deezerLogo.png';
import heartButton from '../images/heart.png';

import {
  MusicCardWrapper,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
  FavoriteButton,
  IsFavoriteButton,
} from '../styles/MusicCardStyle';

function MusicCard(props) {
  const {
    music,
    musicRef,
    saveFavoriteList,
    favoriteList,
  } = props;

  const [isPlaying, setIsPlaying] = useState(false);

  const convertSecondsToMinutes = (time) => {
    return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
  };

  const handleFavoriteButton = (musicId) => {
    const musicIsFavorite = favoriteList ? favoriteList.some(({ id }) => id === musicId) : false;
    const storageFavorites = JSON.parse(window.localStorage.getItem('favoriteMusics'));
    const isOnStorage = storageFavorites ? storageFavorites.some(({ id }) => id === musicId) : false;

    if (musicIsFavorite || isOnStorage) {
      return (
        <IsFavoriteButton
        type="button"
        id={music.id}
      >
        <img 
          src={heartButton}
          alt="play-button"
          id={music.id}
        />
      </IsFavoriteButton>
      )
    } return (
      <FavoriteButton
      type="button"
      id={music.id}
      onClick={({ target }) => saveFavoriteList(target)}
    >
      <img 
        src={heartButton}
        alt="play-button"
        id={music.id}
      />
    </FavoriteButton>
    )
  };

  return (
    <MusicCardWrapper
      key={music.id}
      ref={musicRef}
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
        <AudioPlayer 
          musicUrl={music.preview}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
          { handleFavoriteButton(music.id) }
          <a href={music.link}>
            <DeezerLogo src={ deezerLogo }/>
          </a>
        </CardButtons >
      </RightCard>
    </MusicCardWrapper>
  )
}

const mapStateToProps = (state) => ({
  favoriteList: state.favoriteMusics.favoriteList,
});

export default connect(mapStateToProps)(MusicCard);
