import React, { useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import playButtonImage from '../images/botao-play.png';
import pauseButtonImage from '../images/botao-pause16px.png';
import { PlayButton } from '../styles/MusicCardStyle';

export default function AudioPlayer({ musicUrl, isPlaying, setIsPlaying }) {
  const audioRef = useRef();

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      if (isPlaying) audioRef.current.play();
      if (!isPlaying) audioRef.current.pause();
    }
  }, [isPlaying]);

  const playButton = () => (
    <img
      src={playButtonImage}
      alt="play-button"
    />
  );

  const pauseButton = () => (
    <img
      src={pauseButtonImage}
      alt="play-button"
    />
  );

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={musicUrl} autoPlay="autoplay" ref={audioRef} />
      <div className="musicControls">
        <PlayButton
          onClick={() => togglePlaying()}
        >
          { !isPlaying ? playButton() : pauseButton() }
        </PlayButton>
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  musicUrl: PropTypes.string.isRequired,
}.isRequired;
