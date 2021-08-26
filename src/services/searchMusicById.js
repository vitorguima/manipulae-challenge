import { get } from 'axios';

export default async function searchMusicById(musicId) {
  const corsAnywhere = 'http://localhost:3001';
  const ENDPOINT = `https://api.deezer.com/track/${musicId}`;
  try {
    const response = await get(`${corsAnywhere}/${ENDPOINT}`);
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
}
