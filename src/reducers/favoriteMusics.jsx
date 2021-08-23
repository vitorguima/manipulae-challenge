import { NEW_FAVORITE_MUSIC, REMOVE_FAVORITE_MUSIC } from '../actions/index';

const INITIAL_STATE = {
  favoriteList: [],
};

function favoriteMusics(state = INITIAL_STATE, action) {
  const {
    type,
    newFavorite,
    newFavoriteList
  } = action;
  switch (type) {
  case NEW_FAVORITE_MUSIC:
    return {
      ...state,
      favoriteList: [...state.favoriteList, newFavorite],
    };
  case REMOVE_FAVORITE_MUSIC:
    return {
      ...state,
      favoriteList: [...newFavoriteList],
    }
  default:
    return state;
  }
}

export default favoriteMusics;
