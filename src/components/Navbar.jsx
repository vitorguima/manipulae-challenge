import React from 'react';
import { Link } from 'react-router-dom';
import NavButton from '../styles/NavButton';

export default function Navbar() {
  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <NavButton>
          Músicas
        </NavButton>
      </Link>
      <Link to="/favorite-songs" style={{ textDecoration: 'none' }}>
        <NavButton>
          Favoritas
        </NavButton>
      </Link>
    </div>
  );
}
