import { GET_TOP_MUSICS } from '../actions/index';

const INITIAL_STATE = {
  musicList: [],
};

function displayedMusics(state = INITIAL_STATE, { type, musicList }) {
  switch (type) {
  case GET_TOP_MUSICS:
    return {
      ...state,
      musicList,
    };
  default:
    return state;
  }
}

export default displayedMusics;
