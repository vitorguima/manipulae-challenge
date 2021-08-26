import styled from 'styled-components';
import { colors } from './global';

export const NavButton = styled.span`
  heigth: 20px;
  line-heigth: 48px;
  padding: 12px 55px;
  font-weigth: 99999999;
  color: ${colors.gray};
  background: ${colors.white};
  cursor: pointer;
  margin: 15px 25px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 100px;
  border: 0.5px solid ${colors.gray};
  &:hover {
    box-shadow: 0 0 5px rgba(33,33,33,.2);
    text-decoration: underline; 
  }
`;