import React, { useRef, useEffect } from 'react';

import playButtonImage from '../images/botao-play.png';
import pauseButtonImage from '../images/botao-pause16px.png';
import { PlayButton } from '../styles/MusicCardStyle';

export default function AudioPlayer({ musicUrl, isPlaying, setIsPlaying }) {
  const audioRef = useRef();

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if(audioRef && audioRef.current) {
      if (isPlaying) audioRef.current.play();
      if (!isPlaying) audioRef.current.pause();
    }
  }, [isPlaying])

  const playButton = () => {
    return (
      <img 
        src={playButtonImage}
        alt="play-button"
      />
    )
  }

  const pauseButton = () => {
    return (
      <img 
        src={pauseButtonImage}
        alt="play-button"
      />
    )
  }

  return (
    <div>
      <audio src={ musicUrl } autoPlay="autoplay" ref={ audioRef }/>
      <div className="musicControls">
        <PlayButton
          onClick={() => togglePlaying()}
        > 
          { !isPlaying ? playButton() : pauseButton() }
        </PlayButton>
      </div>
    </div>
  )
}
