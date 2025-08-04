// services/getCapitalImage.js
import axios from "axios";

const getCapitalImage = async (capitalName) => {
  try {
    const res = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(capitalName)}`
    );

    return res.data.thumbnail?.source || null;
  } catch (err) {
    // Lanza el error para que lo capture el componente
    throw new Error(err?.response?.statusText || err.message);
  }
};

export default getCapitalImage;