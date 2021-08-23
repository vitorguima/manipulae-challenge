import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // getMusicsList
    // setLoading(false);
  }, [])

  return (
    <div>
      <header>
        <p>HOME HEADER</p>
      </header>
      <SearchBar />
      <body>
        <p>Music List</p>
        <ul>
          <li>musica1</li>
          <li>musica1</li>
          <li>musica1</li>
          <li>musica1</li>
          <li>musica1</li>
        </ul>
      </body>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: '',
});

export default connect(null, mapDispatchToProps)(Home);
