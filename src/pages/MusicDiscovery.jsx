import React, { useEffect, useState, useCallback, useRef } from 'react';

import { connect } from 'react-redux';
import { dispatchFavoriteMusic } from '../actions';

import SearchBar from '../components/SearchBar';
import MusicCard from '../components/MusicCard';

import getTopMusics from '../services/getTopMusics';
import customMusicSearch from '../services/customMusicSearch';
import searchMusicById from "../services/searchMusicById";

import { Footer } from '../styles/Footer';
import { Header } from '../styles/Header';
import { Loading } from '../styles/MusicList';

import AudioPlayer from '../components/AudioPlayer';
import Navbar from '../components/Navbar';

import useLocalStorage from '../hooks/useLocalStorage';

import { MusicListStyle } from '../styles/MusicListStyle';

function MusicDisvorey({ saveFavoriteMusic }) {
  const [isLoading, setLoading] = useState(true);
  const [listRange, setlistRange] = useState(0);
  const [musicList, setMusicList] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isCustomSearch, setCustomSearch] = useState(false);
  const [totalSearchs, setTotalSearchs] = useState(0);
  const [playingMusic, setPlayingMusic] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage('favoriteMusics', []);

  const observer = useRef();

  const lastMusicElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const listRangeSum = 15;
      if(entries[0].isIntersecting) {
        setlistRange((previousRange) => previousRange + listRangeSum);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomSearch, totalSearchs]);

  useEffect(() => {
    const lengthToNextLoad = 15;
    const setInicialMusicList = async () => {
      setLoading(true);
      const musicList = await customSearchOptions[isCustomSearch]();
      setMusicList((previousList) => [...previousList, ...musicList]);
      setLoading(false);
    }
    if (listRange >= lengthToNextLoad) {
      setInicialMusicList();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRange]);

  const playOrPause = (target) => {
    setPlayingMusic(target.id)
    setIsPlaying((previous) => !previous);
  };

  const saveFavoriteList = async (target) => {
    const { id } = target;
    const musicData = await searchMusicById(id)
    const newMusicList = [...favoriteStorage, musicData];
    saveFavoriteMusic(newMusicList);
    setFavoriteStorage(newMusicList);
  };

  const renderMusicList = () => {
    return(
      musicList
        .map((music, index) => {
        if (musicList.length === index + 1) {
          return (
          <MusicCard 
            music={music}
            musicRef={lastMusicElementRef}
            playOrPause={playOrPause}
            saveFavoriteList={saveFavoriteList}
          />
        )}
        return (
        <MusicCard 
          music={music}
          playOrPause={playOrPause}
          saveFavoriteList={saveFavoriteList}
        />
      )})
    )
  }

  return (
    <div>
      <Header>
        <Navbar />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSearchType={setSearchType}
          setCustomSearch={setCustomSearch}
          setTotalSearchs={setTotalSearchs}
          totalSearchs={totalSearchs}
        />
      </Header>
      <section>
        <MusicListStyle>
          { musicList ? renderMusicList() : null }
        </MusicListStyle>
        { isLoading ? <Loading>Loading...</Loading> : null }
      </section>
      <Footer>
        <AudioPlayer 
          musicUrl={playingMusic}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </Footer>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  saveFavoriteMusic: (musicId) => dispatch(dispatchFavoriteMusic(musicId)),
});

export default connect(null, mapDispatchToProps)(MusicDisvorey);
