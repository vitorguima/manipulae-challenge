import React, { useRef, useEffect } from 'react';

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

  return (
    <div className="controls">
      <audio src={ musicUrl } autoPlay="autoplay" ref={ audioRef }/>
      <div className="vlme">
      <span className="volum"><i className="fas fa-volume-down"></i></span>
      </div>
      <div className="musicControls">
        <button
          onClick={() => togglePlaying()}
        > 
          { !isPlaying ? 'play' : 'pause' }
        </button>
        {/* {audioRef.current ? audioRef.current.duration - audioRef.current.currentTime : null} */}
        <div className="progressb">
          <span className="current"></span>
          <input type="range" name="progressBar" id="progressBar" />
        </div>
      </div>
    </div>
  )
}
