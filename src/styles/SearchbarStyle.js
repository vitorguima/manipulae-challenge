import styled from 'styled-components';
import { colors } from './global';

export const SearchBarStyle = styled.div`
  height: 48px;
  width: 650px;
  position: relative;
  margin: 15px 24px;
  border-radius: 100px;

  input {
    height: 48px;
    padding: 0 54px;
    width: 500px;
    border-radius: 100px;
    border: 1px solid #BEBEBE;
    font-size: 14px; 
    position: relative;
    outline: none;
    color: ${colors.black};
    &::placeholder {
      color: ${colors.grey}
    }
    &:hover {
      box-shadow: 0 0 5px rgba(33,33,33,.2);
    }
  }

  img {
    position: absolute;
    top: 30%;
    left: 34px;
    transform: translateY(-50);
    z-index: 10;
    width: 16px;
    height: 16px;
  }
`;

export const SearchButton = styled.span`
  heigth: 20px;
  // line-heigth: 48px;
  padding: 4px 30px;
  font-weigth: 99999999;
  color: ${colors.grey};
  border: 2px solid #ACE1AF;
  cursor: pointer;
  margin: 5px 25px;
  font-size: 14px;
  text-decoration: none;
  // border-radius: 100px;
  &:hover {
    background: #ACE1AF;
    color: ${colors.black};
    box-shadow: 0 0 5px rgba(33,33,33,.2);
    text-decoration: underline; 
  }
`;

export const ClearButton = styled.span`
  heigth: 20px;
  // line-heigth: 48px;
  padding: 4px 30px;
  font-weigth: 99999999;
  color: ${colors.grey};
  border: 2px solid #fd5c63;
  cursor: pointer;
  margin: 8px 25px;
  font-size: 14px;
  text-decoration: none;
  // border-radius: 100px;
  &:hover {
    background: #fd5c63;
    color: ${colors.white};
    box-shadow: 0 0 5px rgba(33,33,33,.2);
    text-decoration: underline; 
  }
`;

export const CheckList = styled.span`
  color: black;
  margin: 10px 10px;
  color: ${colors.grey};

  input {
    margin: 3px;
  }
`;