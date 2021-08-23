import { get } from 'axios';

export default async function getTopMusics() {
  const cors_anywhere = 'http://localhost:3001';
  const ENDPOINT = 'https://api.deezer.com/chart'
  const response = await get(`${cors_anywhere}/${ENDPOINT}`);
  return response.data;
};
