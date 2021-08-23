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
        <div key={index}>
          <p>{music.title}</p>
          <img 
            src={music.album.cover_medium} 
            alt={music.title}
          />
          <p>{music.artist.name}</p>
          <audio src={music.preview} controls="controls"/>
          {/* <button
            type="button"
            id={ music.preview }
          >
            play
          </button> */}
        </div>)
    )
  }

  const handleScroll = ({ target }) => {
    const { 
      scrollTop,
      clientHeight,
      scrollHeight,
    } = target;

    console.log(scrollTop, clientHeight, scrollHeight);

    if (scrollHeight - scrollTop === clientHeight) {
      setListStartRange((previous) => previous + 20);
    }
  }

  return (
    <div>
      <header style={ { borderBottom: 'solid black 1px', margin: '0', padding: '0' } }>
        <p>HOME HEADER</p>
        <SearchBar
          setMusicList={setMusicList}
        />
      </header>
      <section>
        <Content onScroll={ handleScroll }>
          { musicList ? renderMusicList() : null }
        </Content>
        { isLoading ? <Loading>Loading...</Loading> : null }
      </section>
      <footer style={ { borderBottom: 'solid black 1px', margin: '0', padding: '0' } }>
        <p>HOME footer</p>
      </footer>
    </div>
  )
}

