import PlanetEarth from "../component/particle/PlanetEarth";
import { UseWorld } from '../hook/UseWorld';
import Bubble from "./particle/molecule/Bubble";
import Table from "./particle/molecule/Table";

const CountryFinder = ({ setCurrentCountry }) => {

  const {
    stages,
    uiStage,
    continents,
    countries,
    nextStage,
    previousStage,
    selectedContinent,
    countryContinentalFilterRemoval,
    countriesInContinent,
    selectedLanguages,
    selectedCountries,
    countryContinentalFilter,
    continentalFilter,
    extractPopulation,
    extractArea,
    extractLanguages,
    languagesFilter,
    hoveredLanguages,
    languageHover,
    languageUiName,
    setLanguageUiName,
    countryHover,
    hoveredCountries,
    getFillClass

  } = UseWorld()

  return (

    <main className="h-full items-center justify-center
    flex flex-col md:flex-row">

      {
        <PlanetEarth
          stages={stages}
          uiStage={uiStage}
          getFillClass={getFillClass}
          hoveredCountries={hoveredCountries}
          previousStage={previousStage}
          continents={continents}
          selectedContinent={selectedContinent}
          selectedCountries={selectedCountries}
        />
      }

      <div className='
      text-white z-100 overflow-y-scroll overflow-x-hidden min-h-35 w-53 text-center
      justify-center flex flex-wrap flex-col items-center min-w-53'>

        {(() => { //Continents descriptions 
          if (stages[uiStage]?.name === 'Continent' && selectedContinent !== null) {
            return (
              <Table
                title={selectedContinent}
                header1={'Countries'}
                footer1={selectedCountries.length}
                header2={'Languages'}
                footer2={selectedLanguages.length}
                header3={'Population'}
                footer3={extractPopulation(selectedCountries).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language' && hoveredLanguages.length !== 0) {
            return ( //Languages descriptions 
              <Table
                title={languageUiName}
                header1={'Countries'}
                footer1={hoveredLanguages.length}
                header2={'in'}
                footer2={selectedContinent}
                header3={`${hoveredLanguages.length === 1 ? 'Population' : 'Total Population'}`}
                footer3={extractPopulation(hoveredLanguages).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Language' && stages[0]?.name === 'Language' && hoveredLanguages.length !== 0) {
            return ( //Languages descriptions 
              <Table
                title={languageUiName}
                header1={'Countries'}
                footer1={hoveredLanguages.length}
                header2={'Speak'}
                footer2={languageUiName}
                header3={`${hoveredLanguages.length === 1 ? 'Population' : 'Total Population'}`}
                footer3={extractPopulation(hoveredLanguages).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Country' && hoveredCountries.length !== 0 && countries) {
            return ( //Countries descriptions 
              <Table
                title={hoveredCountries[0].name}
                header1={'Capital'}
                footer1={hoveredCountries[0].capitals}
                header3={'Population'}
                footer3={hoveredCountries[0].population.toLocaleString('de-DE')}
                header4={'Area'}
                footer4={extractArea(hoveredCountries).toLocaleString('de-DE') + ' km\u00B2'}
              />
            )
          }
          
          if (stages[uiStage]?.name === 'Continent') {
            return ( //Continents UI Guides
              <Table
                title={stages[uiStage].description}
                header1={'Countries'}
                footer1={countries.length}
                header2={'Languages'}
                footer2={extractLanguages(countries).length}
                header3={'Total Population'}
                footer3={extractPopulation(countries).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Continent' && stages[0]?.name !== 'Language') {
            return ( //Country UI Guides
              <Table
                title={stages[uiStage].description}
                header1={`Countries`}
                footer1={`${selectedCountries.length}`}
                header2={'Speak'}
                footer2={languageUiName}
                header3={'in'}
                footer3={selectedContinent}
              />
            )
          }


          if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language') {
            return ( //Language by continent UI Guides
              <Table
                title={stages[uiStage].description}
                header1={'Languages'}
                footer1={selectedLanguages.length}
                header2={'Countries'}
                footer2={countriesInContinent.length}
                header3={'in'}
                footer3={selectedContinent}
              />
            )
          }

          if (stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language') {
            return ( //Language without continental filters UI Guides
              <Table
                title={stages[uiStage].description}
                header1={'Languages'}
                footer1={extractLanguages(countries).length}
                header2={'Countries'}
                footer2={countries.length}
                header3={'Total Population'}
                footer3={extractPopulation(countries).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Country' && stages[0]?.name === 'Language') {
            return ( //Countries by Language without continental filters UI Guides
              <Table
                title={stages[uiStage].description}
                header1={'Countries'}
                footer1={selectedCountries.length}
                header2={'Speak'}
                footer2={languageUiName}
                header3={'Total Population'}
                footer3={extractPopulation(selectedCountries).toLocaleString('de-DE')}
              />
            )
          }

          if (stages[uiStage]?.name === 'Country' && stages[0]?.name !== 'Language') {

            if (stages.some((stage) => stage.name === 'Language')) {
              return ( //Country UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={`Countries`}
                  footer1={`${selectedCountries.length}`}
                  header2={'Speak'}
                  footer2={languageUiName}
                  header3={'in'}
                  footer3={selectedContinent}
                />
              )
            }

            if (stages[0]?.name === 'Country') {
              return ( //Country UI Guides ALL COUNTRIES
                <Table
                  title={stages[uiStage].description}
                  header1={`Countries`}
                  footer1={`${selectedCountries?.length}`}
                  header2={'Languages'}
                  footer2={extractLanguages(countries).length}
                  header3={'Total Population'}
                  footer3={extractPopulation(countries).toLocaleString('de-DE')}

                />
              )
            }

            if ((stages.some((stage) => stage.name !== 'Language')) && selectedCountries) {
              return ( //Country UI Guides WITHOUT LANGUAGE FILTER

                <Table
                  title={stages[uiStage].description}
                  header1={'Countries'}
                  footer1={`${selectedCountries.length}`}
                  header2={'Languages'}
                  footer2={extractLanguages(selectedCountries).length}
                  header3={'in'}
                  footer3={selectedContinent}
                />
              )
            }

          }


        })()}
      </div>

      <aside className={`
      text-xs gap-0.5 grid items-center
    text-slate-300/80 sm:h-full h-full my-auto font-black overflow-y-scroll`}>
        <div
          className={`
            flex flex-wrap gap-0.5 h-auto text-nowrap my-auto
            overflow-y-scroll overflow-x-hidden items-center justify-center
          `}>

          {stages[uiStage]?.name === "Continent" && continents.length > 0 && (
            continents.map((continent) => (
              <Bubble
                key={continent.id}
                name={continent.name}
                action={() => {
                  continentalFilter(continent.name)
                  nextStage()
                }}
                hover={() => {
                  continentalFilter(continent.name)
                }}
                unhover={() => {
                  continentalFilter(null)
                }}
                id={continent.id}
                uiStage={uiStage}
                stages={stages}
              />
            ))
          )}

          {
            stages[uiStage]?.name === 'Language'
            && stages[0]?.name === 'Continent'
            && selectedLanguages.map((language) => (
              <Bubble
                key={language.id}
                name={language.name}
                id={language.id}
                action={() => {
                  languagesFilter(language.name)
                  nextStage()
                }}
                hover={() => {
                  languageHover(language.name)
                  setLanguageUiName(language.name)
                }}
                unhover={() => {
                  continentalFilter(selectedContinent)
                  languageHover([])
                  setLanguageUiName(null)
                }}
                uiStage={uiStage}
                stages={stages}
              />
            ))}

          {
            stages[0]?.name === 'Language'  // First Language Country Finder Stage
            && stages[uiStage]?.name === 'Language' &&

            extractLanguages(countries).map((language) => (
              <Bubble
                key={language.id}
                name={language.name}
                id={language.id}
                action={() => {
                  languagesFilter(language.name)
                  nextStage()
                }}
                hover={() => {
                  languageHover(language.name)
                  setLanguageUiName(language.name)
                }}
                unhover={() => {
                  languageHover([])
                  setLanguageUiName(null)
                }}
                uiStage={uiStage}
                stages={stages}
              />
            ))}


          {
            stages[0]?.name === 'Language'
            && stages[uiStage]?.name === 'Country'  // Second Language Country Finder Stage

            && selectedCountries?.map((country) => (
              <Bubble
                key={country.id}
                name={country.name}
                flag={country.flag}
                action={() => setCurrentCountry(country)}
                hover={() => {
                  countryHover(country.id)
                  countryContinentalFilter(country.continents[0])
                }
                }
                unhover={() => {

                  selectedCountries.length !== 1 ? countryHover(null) : countryHover(country.id)
                  countryContinentalFilterRemoval()

                }}
                uiStage={uiStage}
                stages={stages}
              />
            ))}

          {stages[uiStage]?.name === 'Country' && stages[0]?.name !== 'Language'
            && selectedCountries?.map((country) => (
              <Bubble
                key={country.id}
                name={country.name}
                flag={country.flag}
                action={() => setCurrentCountry(country)}
                hover={() => {
                  if (stages[0].name !== 'Country') {
                    countryHover(country.id)
                  } else {
                    countryContinentalFilter(country.continents[0])
                    countryHover(country.id)
                  }
                }}
                unhover={() => {
                  if (stages[0].name !== 'Country') {
                    selectedCountries.length !== 1 ? countryHover(null) : countryHover(country.id)
                  } else {
                    selectedCountries.length !== 1 ? countryHover(null) : countryHover(country.id)
                    countryContinentalFilterRemoval()
                  }
                }}
                uiStage={uiStage}
                stages={stages}
              />
            ))}

        </div>

      </aside>
    </main>


  );
}

export default CountryFinder