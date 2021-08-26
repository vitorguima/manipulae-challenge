import styled from 'styled-components';
import colors from './global';

export const Header = styled.header`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 9vh;
  border-bottom: 1px solid #BEBEBE;
  text-align: center;
  z-index: 99999;
  background-color: ${colors.white};
`;

export const NavWrapper = styled.div`
  width: 25%;
  font-family: 'Montserrat 400', sans-serif;
`;

export const SearchBarWrapper = styled.div`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Montserrat 400', sans-serif;
`;
