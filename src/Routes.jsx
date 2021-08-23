import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import UserFavoriteSongs from './pages/UserFavoriteSongs';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/favorite-songs" component={ UserFavoriteSongs } />
    </Switch>
  );
}

export default Routes;
