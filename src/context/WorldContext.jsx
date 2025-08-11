import { createContext, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router";
import { UseNotification } from "../hook/UseNotification.jsx";
import { UseFetchStatus } from "../hook/UseFetchStatus.jsx";
import { restCountries } from "../service/restCountries/restCountries.js";

export const WorldContext = createContext();

export const WorldProvider = ({ children }) => {

    // Fetch Status Context
    const { runFetch, getStatus } = UseFetchStatus()
    const { didFetch } = getStatus('preloadedFlags')
    const { isLoading, hasError, dataLoaded } = getStatus('countries');

    // Current Country for CountryHub.jsx
    const [currentCountry, setCurrentCountry] = useState(null)

    // Loaded Data Flag
    const [rawCountries, setRawCountries] = useState(null);

    //Search Function
    const [searchResults, setSearchResults] = useState([]);

    //User Interaction States
    const [selectedCountries, setSelectedCountries] = useState(null);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [countriesInContinent, setCountriesInContinent] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [hoveredLanguages, setHoveredLanguages] = useState([]);
    const [languageUiName, setLanguageUiName] = useState(null);
    const [hoveredCountries, setHoveredCountries] = useState([]);

    //Stages
    const [uiStage, setUiStage] = useState(0); //Current stage

    const [stages, setStages] = useState([ //Default Finder Stages

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


    const languageCountryFinder = () => { //100%
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

    //Se ejecuta solamente en /finder
    const location = useLocation()
    const isFinderOpen = location.pathname.startsWith('/finder')

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
            countryContinentalFilterRemoval()
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


    //Sets countries and languages featured in given Continent
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

    //Equivalent to selectedCountries, for countries with a set language
    const languagesFilter = (language) => {

        const availableLanguages = extractLanguages(selectedCountries);
        setSelectedLanguages(availableLanguages);

        const filteredCountries = selectedCountries
            .filter((country) =>
                country.languages.includes(language)
            )
            .sort((a, b) => a.name.localeCompare(b.name)); // ABC

        if (filteredCountries.length === 1) {
            countryHover(filteredCountries[0].id)
            setSelectedContinent(filteredCountries[0].continents[0])
        }

        setSelectedCountries(filteredCountries);
    };


    // Procesar countries listos para UI
    const countries = useMemo(() => {
        return (rawCountries || [])
            .filter(country =>
                Array.isArray(country.continents) &&
                !(country.continents.length === 1 && country.continents[0] === 'Antarctica'
                ))
            //Remove countries within Antartica territory
            .map((country) => ({
                id: country.cca2,
                name: country.name.common,
                area: country.area,
                population: country.population,
                continents: country.continents.filter(c => c !== "Antarctica"),
                //Removes Antartica from the countries.continents featuring scientific bases there.
                flag: country.flags.svg,
                languages: Object.values(country.languages).filter(l => !l.includes('Sign Language')) || [],
                capitals: country.capital || ["N/A"],
                timezones: country.timezones,
                latlng: country.latlng,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)); //ABC
    }, [rawCountries]); // rawCountries results from api Rest COUNTRIES fetching donde by useEffect


    // Listar continentes y darles un ID
    const continents = useMemo(() => {
        const normalized = countries
            .flatMap(c => c.continents)
            .filter(Boolean) // Takes off falsy (null, undefined and empty string)

        return [...new Set(normalized)]
            .sort()
            .map((name, i) => (
                { id: i + 1, name }
            ));
    }, [countries]);

    //Search Function
    const searchCountries = (query) => {
        if (query.length < 2) return setSearchResults([]);
        const matches = countries.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(matches)
    }

    useEffect(() => {
        if (rawCountries) {
            setSelectedCountries(countries);
        }
    }, [rawCountries, countries]);

    useEffect(() => { //Flag Precharge
        if (!countries?.length || didFetch || !location.pathname.startsWith('/finder')) return;

        runFetch('preloadedFlags', async () => {
            countries.forEach((country) => {
                const img = new Image();
                img.src = country.flag;
            });
        });

        if (location.pathname.startsWith('/finder'))
        notify({
            id: 'cached-flags',
            notificationTag: 'Pre-loading flags of the world.',
            withProgress: false,
            duration: 5000
        });
    }, [countries]);

    useEffect(() => {
        if (isFinderOpen && !dataLoaded) {
            runFetch('countries', restCountries, setRawCountries)

            notify({
                id: 'loading-countries',
                notificationTag: 'Loading countries...'
            });
        }
        // FETCH API REST COUNTRIES ON CONTEXT LOAD
    }, [location.pathname])

    const retryFetchCountries = async () => {
        const result = await runFetch('countries', restCountries, setRawCountries);

        if (result) {
            notify({
                id: 'loading-countries', notificationTag: 'Countries Loaded'
            })
            return { ok: true, data: result };
        } else {
            return { ok: false, error: 'Could not load countries' }
        }
    };

    const extractLanguages = (selectedCountries = []) => {
        // Mapping array of arrays
        // (languages is an array)
        const languagesNested = selectedCountries.map(country => country.languages);

        // to plain array
        const allLanguages = [].concat(...languagesNested);

        // Remove duplicates
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


    const getFillClass = (countryId) => { //TailWind Styles for World Map countries

        //Stage: Continent
        if (stages[uiStage]?.name === 'Continent') {

            //Continental Filter
            if (selectedContinent !== null &&
                countriesInContinent?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //Russia gets cut by Continental Frontier
            if (selectedContinent === 'Asia' && countryId === 'RU_asia') { return 'fill-amber-500' }
            else if (selectedContinent === 'Europe' && countryId === 'RU_europe') { return 'fill-amber-500' }
            else { return 'fill-slate-500' } //Default
        }

        //Stage: Language w/ continental filter
        if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language') {

            //Language Filter
            if (hoveredLanguages?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //Case Russia
            if (countryId === 'RU_europe'
                && selectedContinent === 'Europe'
                && hoveredLanguages?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && selectedContinent === 'Asia'
                && hoveredLanguages?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }

            //Continental Language
            if (selectedCountries?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Case Russia
            if (countryId === 'RU_europe' && selectedContinent === 'Europe') { return 'fill-slate-500' }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia') { return 'fill-slate-500' }

            if (selectedCountries?.some((c) => c.id !== countryId)) { return 'fill-slate-700' } //Default
        }

        //Stage: Language without continental filter
        if (stages[uiStage]?.name === 'Language' && stages[0]?.name === 'Language') {
            if (hoveredLanguages.length === 0) { return 'fill-slate-500' }
            else {
                //Language Filter
                if (hoveredLanguages?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
                //Case Russia
                if (hoveredLanguages?.some((c) => c.id === 'RU' && countryId.includes('RU'))) { return 'fill-amber-500' }
                else { return 'fill-slate-500' }
            }
        }

        //Stage: Country w/continental & language filter
        if (stages[uiStage]?.name === 'Country'
            && stages[0]?.name !== 'Country'
            && stages[0]?.name !== 'Language') {

            if (hoveredCountries?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //case Russia
            if (countryId === 'RU_europe'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }


            //Continental Country
            if (selectedCountries?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Case Russia
            if (countryId === 'RU_europe' && selectedContinent === 'Europe' && selectedCountries?.some((c) => c.id === 'RU')) {
                return 'fill-slate-500'
            }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia' && selectedCountries?.some((c) => c.id === 'RU')) {
                return 'fill-slate-500'
            }

            if (countriesInContinent?.some((c) => c.id === countryId)) { return 'fill-slate-600' }
            //Case Russia
            if (countryId === 'RU_europe' && selectedContinent === 'Europe' && countriesInContinent?.some((c) => c.id === 'RU')) {
                return 'fill-slate-600'
            }
            if (countryId === 'RU_asia' && selectedContinent === 'Asia' && countriesInContinent?.some((c) => c.id === 'RU')) {
                return 'fill-slate-600'
            }

            //Stage: Country filterless
            if (countryId.includes('RU') && stages[0]?.name === 'Country') {
                return 'fill-slate-600'
            }

            if (countriesInContinent?.some((c) => c.id !== countryId)) { return 'fill-slate-700' }
            else { return 'fill-slate-600' } //Default para finder By Country
        }

        else //Country By Language Mode
        {
            if (hoveredCountries?.some((c) => c.id === countryId)) { return 'fill-amber-500' }
            //Case Russia
            if (countryId === 'RU_europe'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }
            if (countryId === 'RU_asia'
                && hoveredCountries?.some((c) => c.id === 'RU')) { return 'fill-amber-500' }


            if (selectedLanguages?.some((c) => c.id === countryId)) { return 'fill-slate-500' }
            //Case Russia
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
                searchCountries,
                searchResults,
                countries,
                stages,
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
                setSelectedContinent,
                countryFinder,
                continentCountryFinder,
                languageCountryFinder,
                continentLanguageCountryFinder,
                retryFetchCountries,
                isLoading,
                hasError,
                currentCountry,
                setCurrentCountry
            }}
        >
            {children}
        </WorldContext.Provider>
    );
};

export default WorldProvider;