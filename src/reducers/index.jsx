import { combineReducers } from 'redux';
import favoriteMusics from './favoriteMusics';
import displayedMusics from './displayedMusics';

const rootReducer = combineReducers({
  favoriteMusics,
  displayedMusics,
});

export default rootReducer;