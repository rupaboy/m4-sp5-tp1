import axios from "axios";

// Brings data of a given single country by cca2 (e.g., 'AR', 'FR', 'JP')
const restCountry = async (id) => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`, {
      params: {
        fields: 'continents,languages,timezones,cca2,name,flags,capital,population,area,latlng'
      }
    });

    // Always returns an array with a single country
    return res.data;
  } catch (error) {
    console.error("Error fetching country by code:", error);
    throw error;
  }
};

export default restCountry;
