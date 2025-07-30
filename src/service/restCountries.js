
export const restCountries = async () => {

    try {
        const res = await fetch(
            'https://restcountries.com/v3.1/all?fields=continents,languages,timezones,cca2,name,flags,capital,population,area,latlng')
            
        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status}`);

        }
        return await res.json();

    } catch (error) {

        console.error("Falló la solicitud:", error);
        throw error; // vuelve a lanzar el error para que lo maneje quien llame la función

    }
};
