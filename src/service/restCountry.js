import axios from "axios";

 //Brings data of a given single country
 //(Name may come from params, on useEffect by CountryHub.jsx)
 
const restCountry = async (countryName) => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`, {
      params: {
        fields: 'continents,languages,timezones,cca2,name,flags,capital,population,area,latlng'
      }
    });

    // We get an array with a single country
    return res.data[0];
  } catch (error) {
    console.error("Error fetching country by name:", error);
    throw error;
  }
};

export default restCountry;
