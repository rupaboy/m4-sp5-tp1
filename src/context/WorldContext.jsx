import { createContext, useEffect, useState, useMemo } from "react";
import { restCountries } from "../service/restCountries.js";

export const WorldContext = createContext();

// Cache por fuera del componente para evitar doble fetch y useRef()
let worldDataCache = null;

export const WorldProvider = ({ children }) => {

    //Estados para interacción del usuario
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedContinents, setSelectedContinents] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    // Estado que disparará el render si los datos están cargados
    const [dataLoaded, setDataLoaded] = useState(false);


    const fetchCountriesCached = async () => {

        if (worldDataCache) return worldDataCache; // Fetch con caché

        try {
            const data = await restCountries();
            worldDataCache = data; // guarda en caché
            return data;
        }
        catch (error) {
            console.error("Error al cargar datos:", error);
            return [];
        }
    };

    //Ejecuta fetch una vez y setea el estado para evitar repetición de Strict Mode
    useEffect(() => { fetchCountriesCached().then(() => setDataLoaded(true)); }, []);

    // Procesar countries listos para UI
    const countries = useMemo(() => {
        return (worldDataCache || [])
            .filter(country =>
                Array.isArray(country.continents) &&
                !(country.continents.length === 1 && country.continents[0] === 'Antartica'))
            //Elimina países cuyo único continente sea la Antártida

            .map((country) => ({
                id: country.cca2,
                name: country.name.nativeName || country.name.common,
                area: country.area,
                population: country.population,
                continents: country.continents.filter(c => c !== "Antarctica"),
                //Elimina Antartida de los países que tienen bases científicas allí
                flag: country.flags.svg,
                languages: Object.values(country.languages || []),
                capitals: country.capital || ["N/A"],
                timezones: country.timezones,
                latlng: country.latlng,
            }));
    }, [dataLoaded]); // recalcula cuando cargan datos


    // Listar continentes y darles un ID
    const continents = useMemo(() => {
        const normalized = countries
            .flatMap(c => c.continents)
            .filter(Boolean) // quita falsy (null, undefined y string vacío)

        return [...new Set(normalized)]
            .sort()
            .map((name, i) => (
                { id: i + 1, name }
            ));
    }, [countries]);


    // Listar idiomas totales
    const languages = useMemo(() => {
        const allLanguages = countries.flatMap(c =>
            Object.values(c.languages || {}).map(lang => lang.trim())
        );

        return [...new Set(allLanguages)]
            .sort()
            .map((name, i) => (
                { id: i + 1, name }
            ))
    }, [countries]);

    return (
        <WorldContext.Provider
            value={{
                countries,
                continents,
                languages,
                selectedCountry,
                setSelectedCountry,
                selectedContinents,
                setSelectedContinents,
                selectedLanguages,
                setSelectedLanguages,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
};
