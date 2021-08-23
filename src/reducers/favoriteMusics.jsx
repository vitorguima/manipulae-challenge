import { NEW_FAVORITE_MUSIC } from '../actions/index';

const INITIAL_STATE = {
  favoriteList: [],
};

function favoriteMusics(state = INITIAL_STATE, { type, newFavorite }) {
  switch (type) {
  case NEW_FAVORITE_MUSIC:
    return {
      ...state,
      favoriteList: [...state.favoriteList, newFavorite],
    };
  default:
    return state;
  }
}

export default favoriteMusics;
