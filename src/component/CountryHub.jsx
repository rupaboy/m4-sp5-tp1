import Table from '../component/particle/molecule/Table'
import Button from '../component/particle/molecule/Button'
import { UseMarkers } from '../hook/UseMarkers'
import CountryCapitalImage from './particle/molecule/CountryCapitalImage'


const CountryHub = ({ currentCountry, isMenuOpen }) => {

  const { addToMarkers, isMarkedAlreadyComparisson, removeFromMarkers } = UseMarkers()

  return (

    <main className={`${isMenuOpen ? 'hidden' : ''} text-center text-slate-300 h-auto overflow-y-scroll`}>

      <h2 className='font-extrabold text-md mt-8 mb-8'>{currentCountry.name}</h2>

      <div className="items-center justify-start flex flex-col sm:flex-row flex-wrap gap-12">
        <aside className="space-y-2">
          <Table header1="Continents" footer1={currentCountry.continents.join(', ')} />
          <Table header1="Area" footer1={`${currentCountry.area.toLocaleString('de-DE')} km\u00B2`} />
          <Table header1="Population" footer1={currentCountry.population.toLocaleString('de-DE')} />
          <Table header1="Lat/Lng" footer1={`${currentCountry.latlng[0].toFixed(1)}, ${currentCountry.latlng[1].toFixed(1)}`} />
          <Table
            header1={currentCountry.timezones.length === 1 ? 'Timezone' : 'Timezones'}
            footer1={currentCountry.timezones.map((tz, i) => <p key={i}>{tz}</p>)}
          />

          {!isMarkedAlreadyComparisson(currentCountry) &&
            <Button //Add To Markers
              buttonText={<i className="bi bi-star" />}
              buttonName="To markers"
              ratio="text-center px-2 text-xs"
              title={currentCountry.name}
              action={() => addToMarkers(currentCountry)}
            />}

          {isMarkedAlreadyComparisson(currentCountry) &&
            <Button //Revove From Markers
              buttonText={<i className="bi bi-star" />}
              buttonName="Unmark"
              ratio="text-center px-2 text-xs"
              title={currentCountry.name}
              action={() => removeFromMarkers(currentCountry)}
            />}


        </aside>
        <aside className='w-[300px] max-w-full'>
          {currentCountry.capitals.length !== 0 && //No se renderiza si no hay una capital
            currentCountry.capitals.map((capital, i) => (
              <CountryCapitalImage capital={capital} key={i} />
            ))
          }
        </aside>
      </div>
    </main>
  )
}

export default CountryHub
