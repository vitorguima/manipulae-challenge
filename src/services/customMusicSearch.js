import { get } from 'axios';

export default async function customMusicSearch(searchType, searchParam, index) {
  const corsAnywhere = 'http://localhost:3001';
  const ENDPOINT = `https://api.deezer.com/search?q=${searchType}:%22${searchParam}%22?index=${index}&limit=20`;
  try {
    const response = await get(`${corsAnywhere}/${ENDPOINT}`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    return error;
  }
}
