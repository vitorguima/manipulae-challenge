import React, { useEffect, useState } from 'react';

import { Content, Loading } from '../styles/MusicList';

import SearchBar from '../components/SearchBar';

import getTopMusics from '../services/getTopMusics';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [listStartRange, setListStartRange] = useState(0);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const setInicialMusicList = async () => {
      setLoading(true);
      const initialMusicList = await getTopMusics(listStartRange);
      setMusicList((previous) => [...previous, ...initialMusicList]);
      setLoading(false);
    }
    setInicialMusicList();
  }, [listStartRange])

  const renderMusicList = () => {
    return(
      musicList
        .map((music, index) =>
        <div>
          <p>{music.title}</p>
          <img 
            src={music.album.cover_medium} 
            key={index} alt={music.title}
          />
          <p>{music.artist.name}</p>
          <button
            type="button"
            id={ music.preview }
          >
            play
          </button>
        </div>)
    )
  }

  const handleScroll = ({ currentTarget }) => {
    const { 
      scrollTop,
      clientHeight,
      scrollHeight,
    } = currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setListStartRange((previous) => previous + 20);
    }
  }

  return (
    <div>
      <header>
        <p>HOME HEADER</p>
      </header>
      <SearchBar />
      <section>
        <p>Music List</p>
        <Content onScroll={ handleScroll }>
          { musicList ? renderMusicList() : null }
        </Content>
        { isLoading ? <Loading>Loading...</Loading> : null }
      </section>
    </div>
  )
}

