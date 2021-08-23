import { get } from 'axios';

export default async function searchMusicById(musicId) {
  const cors_anywhere = 'http://localhost:3001';
  const ENDPOINT = `https://api.deezer.com/track/${musicId}`;
  const response = await get(`${cors_anywhere}/${ENDPOINT}`);
  const data = await response.data;
  return data;
};
