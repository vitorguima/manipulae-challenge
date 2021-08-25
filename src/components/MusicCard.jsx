import React from 'react'

import deezerLogo from '../images/deezerLogo.png';
import playButton from '../images/botao-play.png';
import heartButton from '../images/heart.png';

import {
  MusicCardWrapper,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
  PlayButton,
  FavoriteButton,
} from '../styles/MusicCardStyle';

const convertSecondsToMinutes = (time) => {
  return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
};

export default function MusicCard(props) {
  const {
    music,
    musicRef,
    playOrPause,
    saveFavoriteList
  } = props;

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
          <a href={music.link}>
            <DeezerLogo src={ deezerLogo }/>
          </a>
        </CardButtons >
      </RightCard>
    </MusicCardWrapper>
  )
}
