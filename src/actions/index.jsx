import searchMusicById from "../services/searchMusicById";

export const NEW_FAVORITE_MUSIC = 'NEW_FAVORITE_MUSIC';
export const REMOVE_FAVORITE_MUSIC = 'REMOVE_FAVORITE_MUSIC';

export const submitFavoriteMusic = (musicData) => ({
  type: NEW_FAVORITE_MUSIC,
  newFavorite: musicData,
});

export const dispatchFavoriteMusic = (musicId) => async (dispatch) => {
  const musicData = await searchMusicById(musicId);
  return dispatch(submitFavoriteMusic(musicData));
};

export const removeFavoriteMusic = (newFavoriteList) => ({
  type: REMOVE_FAVORITE_MUSIC,
  newFavoriteList,
});
