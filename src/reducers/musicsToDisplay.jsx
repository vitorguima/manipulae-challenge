import { GET_TOP_MUSICS } from '../actions/index';

const INITIAL_STATE = {
  musicList: [],
};

function musicsToDisplay(state = INITIAL_STATE, { type, musicList }) {
  switch (type) {
  case GET_TOP_MUSICS:
    return {
      ...state,
      musicList: [...state.musicList, ...musicList],
    };
  default:
    return state;
  }
}

export default musicsToDisplay;
