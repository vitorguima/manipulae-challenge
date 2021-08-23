import { combineReducers } from 'redux';
import favoriteMusics from './favoriteMusics';
import musicsToDisplay from './musicsToDisplay';

const rootReducer = combineReducers({
  favoriteMusics,
  musicsToDisplay,
});

export default rootReducer;