import { config } from 'dotenv';

config();

export default {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
};