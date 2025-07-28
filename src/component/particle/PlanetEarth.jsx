import WorldMap from "./molecule/WorldMap";
import { motion } from "framer-motion";
import Button from "./molecule/Button";

const PlanetEarth = ({
  selectedContinent,
  selectedCountries,
  hoveredCountries,
  continents,
  getFillClass,
  previousStage,
  uiStage,
  stages
}) => {


  return (
    <main>
      <div className={`border border-slate-950/25 bg-slate-950/25
        relative w-74 h-74 flex items-start justify-center overflow-hidden
      ${(stages[uiStage]?.name === 'Continent'
          || stages[0]?.name === 'Country' && hoveredCountries.length === 0
          || stages[0]?.name === 'Language' && hoveredCountries.length === 0
            && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
          || stages[uiStage]?.name === 'Country'
          && selectedContinent === null) ? 'rounded-full rotate-[-12deg]' : 'border-slate-800'}`}>

        <motion.main
          key={(stages[uiStage]?.name === 'Continent'
            || stages[0]?.name === 'Country' && hoveredCountries.length === 0
            || stages[0]?.name === 'Language' && hoveredCountries.length === 0
              && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
            || stages[uiStage]?.name === 'Country'
            && selectedContinent === null) ? 'loop' : 'static'} //Fuerza reinicio
          initial={{ x: -180 }}
          animate={{
            x:
              stages[uiStage]?.name === 'Continent'
                || stages[0]?.name === 'Country' && hoveredCountries.length === 0
                || stages[0]?.name === 'Language' && hoveredCountries.length === 0
                  && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
                || stages[uiStage]?.name === 'Country'
                && selectedContinent === null
                ? -652 // Loop infinito
                : (selectedContinent === continents[0]?.name)
                  ? -240 // Africa
                  : selectedContinent === continents[1]?.name
                    ? -392 // Asia
                    : selectedContinent === continents[2]?.name
                      ? -250 // Europe
                      : selectedContinent === continents[3]?.name
                        ? -140 // North America
                        : selectedContinent === continents[4]?.name
                          ? -395 // Oceania
                          : -130, // South America
          }}
          transition={{
            duration: (stages[uiStage]?.name === 'Continent'
              || stages[0]?.name === 'Country' && hoveredCountries.length === 0
              || stages[0]?.name === 'Language' && hoveredCountries.length === 0
                && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
              || stages[uiStage]?.name === 'Country'
              && selectedContinent === null) ? 30 : 3,
            ease: (stages[uiStage]?.name === 'Continent'
              || stages[0]?.name === 'Country' && hoveredCountries.length === 0
              || stages[0]?.name === 'Language' && hoveredCountries.length === 0
                && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
              || stages[uiStage]?.name === 'Country'
              && selectedContinent === null) ? "linear" : "easeOut",
            repeat: (stages[uiStage]?.name === 'Continent'
              || stages[0]?.name === 'Country' && hoveredCountries.length === 0
              || stages[0]?.name === 'Language' && hoveredCountries.length === 0
                && stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language'
              || stages[uiStage]?.name === 'Country'
              && selectedContinent === null) ? Infinity : 0,
            repeatType: "loop",
          }}
        >

          <aside className={`
            absolute left-0 w-124 h-74
            ${stages[uiStage]?.name === 'Continent'
              || selectedContinent === null
              ? ''
              : selectedContinent === continents[0]?.name ? 'scale-240 top-[-160px]' //Africa
                : selectedContinent === continents[1]?.name ? 'scale-140 top-5' //Asia
                  : selectedContinent === continents[2]?.name ? 'scale-200 top-23' //Europe
                    : selectedContinent === continents[3]?.name ? 'scale-160 left-35 top-10' //North America
                      : selectedContinent === continents[4]?.name ? 'scale-320 top-[-310px] left-[-340px]' //Oceania
                        : 'scale-250 top-[-240px] left-40' //South America
            }`}>
            <WorldMap
              getFillClass={getFillClass}
            />
          </aside>
          <aside className={`
            absolute left-118 w-124 h-74
            ${stages[uiStage]?.name === 'Continent'
              || stages[uiStage]?.name !== 'Country' && stages[uiStage]?.name !== 'Language'
              || stages[0]?.name === 'Country' && hoveredCountries.length === 0
              || stages[0]?.name === 'Language' && hoveredCountries.length === 0
              || stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Country' && hoveredCountries.length === 0
              ? '' : 'hidden'}`}>
            <WorldMap
              getFillClass={getFillClass}
            />
          </aside>
        </motion.main>
      </div>

      {
        uiStage !== 0
        && <Button
          ratio={'w-8 absolute md:translate-x-66'}
          title={`${uiStage}`}
          buttonText={<i className='bi-caret-left text-slate-400' />}
          action={() => previousStage()}
        />
      }

    </main >
  );
}

export default PlanetEarth