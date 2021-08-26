import { combineReducers } from 'redux';
import favoriteMusics from './favoriteMusics';

const rootReducer = combineReducers({
  favoriteMusics,
});

export default rootReducer;
