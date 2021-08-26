import { get } from 'axios';

export default async function getTopMusics(index) {
  const corsAnywhere = 'http://localhost:3001';
  const ENDPOINT = `https://api.deezer.com/chart?index=${index}&limit=15`;
  try {
    const response = await get(`${corsAnywhere}/${ENDPOINT}`);
    const data = await response.data.tracks.data;
    return data;
  } catch (error) {
    return error;
  }
}
