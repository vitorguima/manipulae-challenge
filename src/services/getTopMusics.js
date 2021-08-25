import { get } from 'axios';

export default async function getTopMusics(index) {
  const cors_anywhere = 'http://localhost:3001';
  const ENDPOINT = `https://api.deezer.com/chart?index=${index}&limit=15`;
  try {
    const response = await get(`${cors_anywhere}/${ENDPOINT}`);
    const data = await response.data.tracks.data;
    return data;
  } catch (error) {
    console.error(error)
  }
};
