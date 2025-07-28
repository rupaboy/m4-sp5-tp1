import Table from '../component/particle/molecule/Table'
import Button from '../component/particle/molecule/Button'

const CountryHub = ({ currentCountry }) => {

  return (
    <main
      className='text-slate-300 text-center grid grid-cols-2'>

      <aside>
        <Table
          header1={'Continents'}
          footer1={currentCountry.continents.join(', ')}
        />
        <Table
          header1={`Area`}
          footer1={currentCountry.area.toLocaleString('de-DE') + ' km\u00B2'}
        />
        <Table
          header1={`Population`}
          footer1={currentCountry.population.toLocaleString('de-DE')}
        />
        <Table
          header1={'Lat/Lng'}
          footer1={currentCountry.latlng.map(l => l.toFixed(1)).join(', ')}
        />
        <Table
          header1={`${currentCountry.timezones.length === 1 ? 'Timezone' : 'Timezones'}`}
          footer1={currentCountry.timezones.map((tz, i) => (<p key={i}>{tz}</p>))}
        />
      </aside>

      <aside>
        <Button
          buttonText={'hola'}
          ratio={'text-center px-2'}
        />
      </aside>

      {/*
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
                */}
    </main>
  )
}
export default CountryHub
