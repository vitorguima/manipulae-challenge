import React, { useState } from 'react';

import { connect } from 'react-redux';

import AudioPlayer from './AudioPlayer';

import deezerLogo from '../images/deezerLogo.png';
import heartButton from '../images/heart.png';
import blackHeartButton from '../images/black-heart.png';

import {
  MusicCardWrapper,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
  FavoriteButton,
  MusicTitle,
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
    var mins = Math.floor((time % 3600) / 60);
    var secs = Math.floor(time % 60);

    let ret = '';
    ret = ` ${mins}${':'}${(secs < 10 ? '0' : '')}`;
    ret += `${secs}`;
    return ret;
  };

  const musicNameLimit = (name) => {
    const maxCharacters = 30;
    if (name.length > maxCharacters) {
      const treatedName = `${name.slice(0, 27)}...`
      return treatedName;
    } return name;
  }

  const handleFavoriteButton = (musicId) => {
    const musicIsFavorite = favoriteList ? favoriteList.some(({ id }) => id === musicId) : false;
    const storageFavorites = JSON.parse(window.localStorage.getItem('favoriteMusics'));
    const isOnStorage = storageFavorites ? storageFavorites.some(({ id }) => id === musicId) : false;

    if (musicIsFavorite || isOnStorage) {
      return (
        <FavoriteButton
        type="button"
        id={music.id}
        onClick={({ target }) => saveFavoriteList(target)}
      >
        <img 
          src={blackHeartButton}
          alt="play-button"
          id={music.id}
        />
      </FavoriteButton>
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
          <MusicTitle>{musicNameLimit(music.title)}</MusicTitle>
          <p>{musicNameLimit(music.artist.name)}</p>
          <p>{convertSecondsToMinutes(music.duration)}</p>
        </MusicInformation>
        <CardButtons >
        <AudioPlayer 
          musicUrl={music.preview}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
          { handleFavoriteButton(music.id) }
          <a href={music.link}
            target="_blank"
            rel="noopener noreferrer"
          >
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
