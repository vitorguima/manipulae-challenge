import styled from 'styled-components';
import { colors } from './global';

export const MusicCard = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  border: 1px solid #B8B8B8;
  width: 30%;
  height: 250px;
  margin: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 2px 4px rgba(33,33,33,.2);
  background: #F8F8F8;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  };
`;

export const AlbumImage = styled.div`
  max-height: 100%;
  margin-right: 10px;
  border-right: 1px solid #B8B8B8;
`;

export const DeezerLogo = styled.img`
  width: 120px;
  heigth: 120px;
`;

export const RightCard = styled.div`
  height: 100%;
`;

export const MusicInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  heigth: 125px;

  p {
    margin: 10px;
    font-weight: bold;
    color: #585858;
  }
`;

export const CardButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0
  justify-content: center;
  heigth: 125px;
  align-items: flex-start;
  align-content: center;

  button {
    margin: 5px;
  }

  a {
    margin-left: 5px;
    margin-top: 20px;
  }
`;
