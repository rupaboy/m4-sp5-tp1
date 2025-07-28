import { createContext, useState, useMemo, useEffect, useRef } from "react";
import { UseNotification } from "../hook/UseNotification.jsx";
import { restCountries } from "../service/restCountries.js";

export const WorldContext = createContext();

export const WorldProvider = ({ children }) => {

    const [uiStage, setUiStage] = useState(0);
    const [rawCountries, setRawCountries] = useState(null);
    const [isFinderOpen, setIsFinderOpen] = useState(false)


    //Estados para interacción del usuario
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [countriesInContinent, setCountriesInContinent] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [hoveredLanguages, setHoveredLanguages] = useState([]);
    const [languageUiName, setLanguageUiName] = useState(null);
    const [hoveredCountries, setHoveredCountries] = useState([]);

    // Estado que disparará el render si los datos están cargados
    const [dataLoaded, setDataLoaded] = useState(false);

    const [stages, setStages] = useState([

        {
            id: 0,
            name: 'Continent',
            description: 'Select Continent'
        },
        {
            id: 1,
            name: 'Country',
            description: 'Select Country'
        },
    ]);

    const countryFinder = () => { //100%
        setStages([
            {
                id: 1,
                name: 'Country',
                description: 'Select Country'
            }
        ])
    }

    const continentCountryFinder = () => { //100%
        setStages([
            {
                id: 0,
                name: 'Continent',
                description: 'Select Continent'
            },
            {
                id: 1,
                name: 'Country',
                description: 'Select Country'
            },
        ]);
    };


    const languageCountryFinder = () => { //0%
        setStages([
            {
                id: 2,
                name: 'Language',
                description: 'Select Language'
            },
            {
                id: 1,
                name: 'Country',
                description: 'Select Country'
            }
        ])
    }

    const continentLanguageCountryFinder = () => { //100% original model
        setStages([
            {
                id: 0,
                name: 'Continent',
                description: 'Select Continent'
            },
            {
                id: 2,
                name: 'Language',
                description: 'Select Language'
            },
            {
                id: 1,
                name: 'Country',
                description: 'Select Country'
            },
        ]);
    };

    //AntiStrictMode
    const didFetch = useRef(false)
    //Notification Tool
    const { notify } = UseNotification()


    const resetFilters = () => {
        if (rawCountries !== null) {
            setSelectedCountries(countries);

            setSelectedContinent(null);
            setSelectedLanguages(null);
            setHoveredCountries([]);
            setHoveredLanguages([]);
            setUiStage(0);
        };
    };

    const previousStage = () => {

        if (stages[uiStage - 1].name === 'Continent') {

            setSelectedContinent(null)
        }

        if (stages[uiStage - 1].name === 'Language' && stages[0].name === 'Language') {
            setSelectedCountries(countries)
            setSelectedLanguages([])
            countryHover(null)
            languageHover([])
        }


        if (stages[uiStage - 1].name === 'Language' && stages[0].name === 'Continent') {
            continentalFilter(selectedContinent)
            languageHover([])
        }

        setUiStage((prevStage) =>
            prevStage - 1 >= 0 ? prevStage - 1 : prevStage
        );
    };


    const nextStage = () => {
        setUiStage((prevStage) =>
            prevStage + 1 < stages.length ? prevStage + 1 : prevStage
        );
    };


    //Setea estados para países y lenguas de un continente.
    const continentalFilter = (continent) => {
        setSelectedContinent(continent)
        const filteredCountries = countries.filter((country) =>
            country.continents.includes(continent))
        setSelectedCountries(filteredCountries)
        setCountriesInContinent(filteredCountries)

        const availableLanguages = extractLanguages(filteredCountries);
        setSelectedLanguages(availableLanguages);

    };

    const countryContinentalFilter = (continent) => {
        setSelectedContinent(continent)

        const availableLanguages = extractLanguages(countries);
        setSelectedLanguages(availableLanguages)
    }

    const countryContinentalFilterRemoval = () => {
        setSelectedContinent(null)
    }

    const languageHover = (language) => {
        const countriesByLanguage = (selectedCountries || []).filter(country =>
            Array.isArray(country.languages) && country.languages.includes(language)
        );
        setHoveredLanguages(countriesByLanguage);
    };


    const countryHover = (country) => {
        const hoveredCountries = selectedCountries.filter((selected) =>
            selected.id.includes(country))

        setHoveredCountries(hoveredCountries)
    }

    //Setea estados para países hablantes de un lenguaje.
    const languagesFilter = (language) => {

        const availableLanguages = extractLanguages(selectedCountries);
        setSelectedLanguages(availableLanguages);

        const filteredCountries = selectedCountries
            .filter((country) =>
                country.languages.includes(language)
            )
            .sort((a, b) => a.name.localeCompare(b.name)); // 👈 ordenar alfabéticamente

        if (filteredCountries.length === 1) { countryHover(filteredCountries[0].id) }

        setSelectedCountries(filteredCountries);
    };


    // Procesar countries listos para UI
    const countries = useMemo(() => {
        return (rawCountries || [])
            .filter(country =>
                Array.isArray(country.continents) &&
                !(country.continents.length === 1 && country.continents[0] === 'Antartica'))
            //Elimina países cuyo único continente sea la Antártida
            .map((country) => ({
                id: country.cca2,
                name: country.name.common,
                area: country.area,
                population: country.population,
                continents: country.continents.filter(c => c !== "Antarctica"),
                //Elimina Antartida de los países que tienen bases científicas allí
                flag: country.flags.svg,
                languages: Object.values(country.languages).filter(l => !l.includes('Sign Language')) || [],
                capitals: country.capital || ["N/A"],
                timezones: country.timezones,
                latlng: country.latlng,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); //Alfabéticamente
    }, [rawCountries]); // recalcula cuando cargan datos


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


    useEffect(() => {
        if (rawCountries && !dataLoaded) {
            setSelectedCountries(countries);
            setDataLoaded(true);
        }
    }, [rawCountries, countries]);

    useEffect(() => {
        selectedCountries?.forEach(country => {
            const img = new Image()
            img.onload = () => {
            }
            img.src = country.flag // asegurate que sea un URL válido
        })
    }, [stages])

    useEffect(() => {
        const fetch = async () => {
            if (didFetch.current || rawCountries) return
            didFetch.current = true
            try {
                // Notificación con id fija, para que reemplace la anterior
                notify({ id: 'loading-countries', notificationTag: 'Loading countries' })

                const data = await restCountries()
                setRawCountries(data)

                // Reemplaza la anterior por esta
                notify({ id: 'loading-countries', notificationTag: 'Countries Loaded', withProgress: false })
            } catch (error) {
                console.log(error)
            }
        }

        fetch()
    }, [])



    const extractLanguages = (selectedCountries = []) => {
        // Mapear a arrays de idiomas
        const languagesNested = selectedCountries.map(country => country.languages);

        // Aplanar sin flatMap
        const allLanguages = [].concat(...languagesNested);

        // Quitar duplicados y ordenar
        return [...new Set(allLanguages)]
            .sort()
            .map((name, i) => ({ id: i + 1, name }));
    };

    const extractPopulation = (selectedCountries = []) => {

        const totalPopulation = selectedCountries.reduce(
            (acc, country) => acc + country.population, 0
        )
        return totalPopulation
    }

    const extractArea = (selectedCountries = []) => {

        const totalArea = selectedCountries.reduce(
            (acc, country) => acc + country.area, 0
        )
        return totalArea
    }


    const getFillClass = (countryId) => { //Estilos de tailwind para los países en Planet Earth

        //Stage: Continent
        if (stages[uiStage]?.name === 'Continent') {

            //Continental Filter
            if (selectedContinent !== null &&
                countriesInContinent?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //Rusia es Bicontinental
            if (selectedContinent === 'Asia' && countryId === 'RU_asia') { return 'fill-amber-500' }
            else if (selectedContinent === 'Europe' && countryId === 'RU_europe') { return 'fill-amber-500' }
            else { return 'fill-slate-500' } //Default
        }

        //Stage: Language con Filtro continental
        if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language') {

            //Language Filter
            if (hoveredLanguages?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //Caso Ruso
            if (countryId === 'RU_europe'
                && selectedContinent === 'Europe'
                && hoveredLanguages?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && selectedContinent === 'Asia'
                && hoveredLanguages?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }

            //Continental Language
            if (selectedCountries?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Caso Ruso
            if (countryId === 'RU_europe' && selectedContinent === 'Europe') { return 'fill-slate-500' }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia') { return 'fill-slate-500' }

            if (selectedCountries?.some((c) => c.id !== countryId)) { return 'fill-slate-700' } //Default
        }

        //Stage: Language sin filtro continental
        if (stages[uiStage]?.name === 'Language' && stages[0]?.name === 'Language') {
            if (hoveredLanguages.length === 0) { return 'fill-slate-500' }
            else {
                //Language Filter
                if (hoveredLanguages?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
                //Caso Ruso
                if (hoveredLanguages?.some((c) => c.id === 'RU' && countryId.includes('RU'))) { return 'fill-amber-500' }
                else { return 'fill-slate-500' }
            }
        }

        //Stage: Country con filtro continental y de idioma
        if (stages[uiStage]?.name === 'Country'
            && stages[0]?.name !== 'Country'
            && stages[0]?.name !== 'Language') {

            if (hoveredCountries?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //caso Ruso
            if (countryId === 'RU_europe'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }


            //Continental Country
            if (selectedCountries?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Caso Ruso
            if (countryId === 'RU_europe' && selectedContinent === 'Europe' && selectedCountries?.some((c) => c.id === 'RU')) {
                return 'fill-slate-500'
            }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia' && selectedCountries?.some((c) => c.id === 'RU')) {
                return 'fill-slate-500'
            }

            if (countriesInContinent?.some((c) => c.id === countryId)) { return 'fill-slate-600' }
            //Caso Ruso
            if (countryId === 'RU_europe' && selectedContinent === 'Europe' && countriesInContinent?.some((c) => c.id === 'RU')) {
                return 'fill-slate-600'
            }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia' && countriesInContinent?.some((c) => c.id === 'RU')) {
                return 'fill-slate-600'
            }

            //Stage: Country sin filtros
            if (countryId.includes('RU') && stages[0]?.name === 'Country') {
                return 'fill-slate-600'
            }

            if (countriesInContinent?.some((c) => c.id !== countryId)) { return 'fill-slate-700' }
            else { return 'fill-slate-600' } //Default para finder By Country
        }

        else //Countries si está en Languages
        {
            if (hoveredCountries?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //caso Ruso
            if (countryId === 'RU_europe'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }


            if (selectedLanguages?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Caso Ruso
            if (countryId.includes('RU') && selectedCountries?.some((c) => c.id.includes('RU'))) {
                return 'fill-slate-500'
            }

            if (selectedCountries?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            else { return 'fill-slate-700' }
        }

    }


    return (
        <WorldContext.Provider
            value={{
                countries,
                stages,
                setIsFinderOpen,
                isFinderOpen,
                uiStage,
                resetFilters,
                previousStage,
                nextStage,
                continents,
                extractLanguages,
                extractPopulation,
                extractArea,
                languagesFilter,
                languageHover,
                languageUiName,
                setLanguageUiName,
                hoveredLanguages,
                countryHover,
                hoveredCountries,
                getFillClass,
                countryContinentalFilterRemoval,
                countriesInContinent,
                selectedLanguages,
                setSelectedLanguages,
                countryContinentalFilter,
                continentalFilter,
                selectedCountries,
                selectedContinent,
                countryFinder,
                continentCountryFinder,
                languageCountryFinder,
                continentLanguageCountryFinder,
            }}
        >
            {children}
        </WorldContext.Provider>
    );
};

export default WorldProvider;