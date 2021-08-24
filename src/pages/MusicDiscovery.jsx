import React, { useEffect, useState, useCallback, useRef } from 'react';

import { connect } from 'react-redux';
import { dispatchFavoriteMusic } from '../actions';

import SearchBar from '../components/SearchBar';

import getTopMusics from '../services/getTopMusics';
import customMusicSearch from '../services/customMusicSearch';

import { Footer } from '../styles/Footer';
import { Header } from '../styles/Header';
import { Loading } from '../styles/MusicList';

import AudioPlayer from '../components/AudioPlayer';
import Navbar from '../components/Navbar';

import deezerLogo from '../images/deezerLogo.png';

import {
  MusicCard,
  AlbumImage,
  DeezerLogo,
  MusicInformation,
  RightCard,
  CardButtons,
} from '../styles/MusicCardStyle';

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

  const observer = useRef();

  const lastMusicElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const listRangeSum = 20;
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
    const lengthToNextLoad = 20;
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

  const convertSecondsToMinutes = (time) => {
    return Math.floor(time / 60) + ":" + (time % 60 ? time % 60 : '00');
  };

  const playOrPause = (target) => {
    setPlayingMusic(target.id)
    setIsPlaying((previous) => !previous);
  };

  const renderMusicList = () => {
    return(
      musicList
        .map((music, index) => {
        if (musicList.length === index + 1) {
          return (
          <MusicCard
            key={index}
            ref={lastMusicElementRef}
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
                <button
                  type="button"
                  id={music.preview}
                  onClick={({target}) => playOrPause(target)}
                >
                  Tocar
                </button>
                <button
                  type="button"
                  id={music.id}
                  onClick={({ target }) => saveFavoriteMusic(target.id)}
                >
                  Favoritar
                </button>
                <a href={music.link}>
                  <DeezerLogo src={ deezerLogo }/>
                </a>
              </CardButtons >
            </RightCard>
          </MusicCard>)
        }
        return (
          <MusicCard
          key={index}
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
              <button
                type="button"
                id={music.preview}
                onClick={({target}) => playOrPause(target)}
              >
                Tocar
              </button>
              <button
                type="button"
                onClick={({ target }) => saveFavoriteMusic(target.id)}
                id={music.id}
              >
                Favoritar
              </button>
              <a href={music.link}>
                <DeezerLogo src={ deezerLogo }/>
              </a>
            </CardButtons>
          </RightCard>
        </MusicCard>
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
        <div>
          { musicList ? renderMusicList() : null }
        </div>
        { isLoading ? <Loading>Loading...</Loading> : null }
      </section>
      <Footer>
        {/* <audio controls="controls" src={playingMusic} autoplay="autoplay"></audio> */}
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
