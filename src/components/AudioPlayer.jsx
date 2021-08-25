import React, { useRef, useEffect } from 'react';

import playButtonImage from '../images/botao-play64px.png';
import pauseButtonImage from '../images/botao-pause.png';
import { PlayButton } from '../styles/MusicCardStyle';

// import AudioProgressBar from './AudioProgressBar';
// import { AudioContainer }from '../styles/AudioPlayerStyle';

export default function AudioPlayer({ musicUrl, isPlaying, setIsPlaying }) {
  // const [percentage, setPercentage] = useState(0);

  // const onChange = (target) => {
  //   const { value } = target;
  //   setPercentage(value);
  // }

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
      <div className="vlme">
      <span className="volum"><i className="fas fa-volume-down"></i></span>
      </div>
      <div className="musicControls">
        <PlayButton
          onClick={() => togglePlaying()}
        > 
          { !isPlaying ? playButton() : pauseButton() }
        </PlayButton>
        {/* {audioRef.current ? audioRef.current.duration - audioRef.current.currentTime : null} */}
        {/* <AudioContainer>
          <AudioProgressBar 
            percentage={percentage}
            onChange={onChange}
          />
        </AudioContainer> */}
      </div>
    </div>
  )
}
