// services/restCountries.js
import axios from 'axios';

export const restCountries = async () => {
  try {
    const res = await axios.get('https://restcountries.com/v3.1/all', {
      params: {
        fields: 'continents,languages,timezones,cca2,name,flags,capital,population,area,latlng'
      }
    });
    return res.data;
  } catch (error) {
    console.error('Falló la solicitud:', error);
    throw error;
  }
};
