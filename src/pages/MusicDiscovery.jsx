import React, { useEffect, useState, useCallback, useRef } from 'react';

import { connect } from 'react-redux';
import { dispatchFavoriteMusic } from '../actions';

import SearchBar from '../components/SearchBar';
import MusicCard from '../components/MusicCard';

import getTopMusics from '../services/getTopMusics';
import customMusicSearch from '../services/customMusicSearch';
import searchMusicById from "../services/searchMusicById";

import { Header, NavWrapper, SearchBarWrapper } from '../styles/Header';

import Navbar from '../components/Navbar';

import useLocalStorage from '../hooks/useLocalStorage';

import { MusicListStyle, MusicListWrapper } from '../styles/MusicListStyle';
import Spinner from '../styles/Spinner';

function MusicDisvorey({ saveFavoriteMusic, favoriteList }) {
  const [isLoading, setLoading] = useState(true);
  const [listRange, setlistRange] = useState(0);
  const [musicList, setMusicList] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isCustomSearch, setCustomSearch] = useState(false);
  const [totalSearchs, setTotalSearchs] = useState(0);
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

  const saveFavoriteList = async (target) => {
    const { id } = target;
    const musicData = await searchMusicById(id)
    const musicIsFavorite = favoriteStorage.some((music) => music.id.toString() === id.toString());
    
    if (!musicIsFavorite) {
      const newMusicList = [...favoriteStorage, musicData];
      saveFavoriteMusic(newMusicList);
      setFavoriteStorage(newMusicList);
      return;
    }
    const newMusicList = favoriteStorage
    ? favoriteStorage.filter((music) => music.id.toString() !== id.toString())
    : favoriteList.filter((music) => music.id.toString() !== id.toString());
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
            key={index}
            music={music}
            musicRef={lastMusicElementRef}
            saveFavoriteList={saveFavoriteList}
          />
        )}
        return (
        <MusicCard 
          key={index}
          music={music}
          saveFavoriteList={saveFavoriteList}
        />
      )})
    )
  }

  return (
    <div>
      <Header>
        <NavWrapper>
          <Navbar />
        </NavWrapper>
        <SearchBarWrapper>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSearchType={setSearchType}
            setCustomSearch={setCustomSearch}
            setTotalSearchs={setTotalSearchs}
            totalSearchs={totalSearchs}
          />
        </SearchBarWrapper>
      </Header>
      <MusicListWrapper>
        <MusicListStyle>
          { favoriteList || favoriteStorage ? renderMusicList() : null }
        </MusicListStyle>
        { isLoading ? <Spinner/> : null }
      </MusicListWrapper>
    </div>
  )
}

const mapStateToProps = (state) => ({
  favoriteList: state.favoriteMusics.favoriteList,
});

const mapDispatchToProps = (dispatch) => ({
  saveFavoriteMusic: (musicId) => dispatch(dispatchFavoriteMusic(musicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicDisvorey);
