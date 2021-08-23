import React, { useEffect, useState, useCallback, useRef } from 'react';

import { Loading } from '../styles/MusicList';

import SearchBar from '../components/SearchBar';

import getTopMusics from '../services/getTopMusics';
import customMusicSearch from '../services/customMusicSearch';

import { Footer } from '../styles/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [listRange, setlistRange] = useState(0);
  const [musicList, setMusicList] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isCustomSearch, setCustomSearch] = useState(false);
  const [totalSearchs, setTotalSearchs] = useState(0);

  const observer = useRef();

  const lastMusicElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        setlistRange((previousRange) => previousRange + 20);
      }
    })
    if (node) observer.current.observe(node);
  }, [isLoading]);

  const customSearchOptions = {
    false: () => getTopMusics(listRange),
    true: () => customMusicSearch(searchType, searchValue, listRange),
  }

  useEffect(() => {
    const setInicialMusicList = async () => {
      setLoading(true);
      const musicList = await customSearchOptions[isCustomSearch]();
      setMusicList([...musicList]);
      setLoading(false);
    }
    setInicialMusicList();
  }, [isCustomSearch, totalSearchs])

  useEffect(() => {
    const setInicialMusicList = async () => {
      setLoading(true);
      const musicList = await customSearchOptions[isCustomSearch]();
      setMusicList((previousList) => [...previousList, ...musicList]);
      setLoading(false);
    }
    if (listRange >= 20) {
      setInicialMusicList();
    }
  }, [listRange])

  const renderMusicList = () => {
    return(
      musicList
        .map((music, index) => {
        if (musicList.length === index + 1) {
          return (
          <div 
            key={index}
            ref={lastMusicElementRef}
          >
            <p>{music.title}</p>
            <img 
              src={music.album.cover_medium} 
              alt={music.title}
            />
            <p>{music.artist.name}</p>
            <div>
              <p></p>
            </div>
            <button
              type="button"
            >
              Tocar
            </button>
          </div>)
        }
        return (
        <div 
          key={index}
        >
          <p>{music.title}</p>
          <img 
            src={music.album.cover_medium} 
            alt={music.title}
          />
          <p>{music.artist.name}</p>
          <button
            type="button"
          >
            Tocar
          </button>
        </div>)})
    )
  }

  return (
    <div>
      <header>
        <Link to="/">Músicas</Link>
        <Link to="/favorite-songs">Favoritas</Link>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSearchType={setSearchType}
          setCustomSearch={setCustomSearch}
          setTotalSearchs={setTotalSearchs}
          totalSearchs={totalSearchs}
        />
      </header>
      <section>
        <div>
          { musicList ? renderMusicList() : null }
        </div>
        { isLoading ? <Loading>Loading...</Loading> : null }
      </section>
      <Footer>
        <p>HOME footer</p>
      </Footer>
    </div>
  )
}

