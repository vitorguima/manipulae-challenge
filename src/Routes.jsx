import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MusicDiscovery from './pages/MusicDiscovery';
import UserFavoriteSongs from './pages/UserFavoriteSongs';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ MusicDiscovery } />
      <Route path="/favorite-songs" component={ UserFavoriteSongs } />
    </Switch>
  );
}

export default Routes;
