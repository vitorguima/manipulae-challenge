import getTopMusics from "../services/getTopMusics";

export const REQUEST_API = 'REQUEST_API';
export const GET_TOP_MUSICS = 'GET_TOP_MUSICS';
export const NEW_FAVORITE_MUSIC = 'NEW_FAVORITE_MUSIC';

export const submitTopMusics = (musicList) => ({
  type: GET_TOP_MUSICS,
  musicList,
});

export const dispatchTopMusics = (index) => async (dispatch) => {
  const musicList = await getTopMusics(index);
  return dispatch(submitTopMusics(musicList));
};