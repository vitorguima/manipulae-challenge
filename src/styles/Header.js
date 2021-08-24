import styled from 'styled-components';
import { colors } from './global';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 25vh;
  border-bottom: 1px solid #BEBEBE;
  text-align: center;
  z-index: 99999;
  background-color: ${colors.white};
`;
