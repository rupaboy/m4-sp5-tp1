import CountryCapitalImage from '../component/particle/molecule/CountryCapitalImage'
import restCountry from '../service/restCountry'
import Button from '../component/particle/molecule/Button'
import Table from '../component/particle/molecule/Table'
import { UseMarkers } from '../hook/UseMarkers'
import { UseUi } from '../hook/UseUi'
import { useUser } from '../hook/UseUser'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { UseWorld } from '../hook/UseWorld'
import { useEffect } from 'react'
import { UseNotification } from '../hook/UseNotification'
import { UseFetchStatus } from '../hook/UseFetchStatus'

const CountryHub = () => {

  const { id } = useParams()

  const { countries, setCurrentCountry, currentCountry } = UseWorld()

  const { markers, addToMarkers, isMarkedAlreadyComparisson, removeFromMarkers } = UseMarkers()
  const { isMenuOpen } = UseUi()
  const { isLoggedIn } = useUser()
  const { getStatus } = UseFetchStatus()

  const {notify} = UseNotification()
  const navigate = useNavigate()

useEffect(() => {
  if (!id) return;

  if (getStatus('countries')?.dataLoaded) {
    
    notify({
      id: 'loading-countries', notificationTag: 'Filtering country Id'
    })
    const found = countries.find(c => c.id === id);
    setCurrentCountry(found || null);
  } else {
    // fallback: fetch individual
    const fetchSingle = async () => {
      try {
        const raw = await restCountry(id);

        // adaptamos igual que en context o donde sea necesario
        const country = {
          id: raw.cca2,
          cca2: raw.cca2,
          name: raw.name.common,
          capitals: raw.capital ?? [],
          continents: raw.continents ?? [],
          area: raw.area ?? 0,
          population: raw.population ?? 0,
          latlng: raw.latlng ?? [0, 0],
          timezones: raw.timezones ?? [],
        };
        setCurrentCountry(country);
      } catch (err) {
        console.error('Single country fetch failed:', err);
      }
    };

    fetchSingle();
  }
}, [id, countries]);



  if (!currentCountry) {
    return (
      <main className="text-center h-screen w-screen flex items-center justify-center">
        <p className="text-lg">Loading country...</p>
      </main>
    )
  }

  return (

    <main className={`${isMenuOpen ? 'hidden' : ''}
    text-center h-screen w-screen overflow-y-scroll`}>

      <Button
        ratio={'z-100 mx-auto w-8 absolute left-16 sm:left-28 mt-6'}
        title={`Go to DashBoard`}
        buttonText={<i className='bi-house' />}
        buttonName={`Home`}
        action={() => {
          navigate(`/countries/${currentCountry.id}`)
        }}
      />
      <div className="items-center justify-center h-full grid sm:flex flex-wrap gap-2">
        <div className='fixed top-0 sm:left-0
        pt-20 sm:pt-0 w-screen sm:h-screen text-nowrap flex-wrap sm:w-20
        dark:bg-slate-950 bg-slate-300
        dark:text-slate-500 text-slate-700 border-b sm:border-b-0 sm:border-r
        sm:border-amber-800 border-b-amber-800 dark:sm:border-amber-500 dark:border-b-amber-500
        text-2xl flex items-center justify-center'>
          {/* Nombre de País con guarda responsiva */}
          <h2 className='leading-12 font-extrabold sm:rotate-[-90deg] text-3xl'>{currentCountry.name}</h2>
        </div>

        {/* Datos de API Rest Countries */}
        <aside className="space-y-2 mx-auto mt-32 sm:mt-0 sm:ml-32">
          <Table header1="Continents" footer1={currentCountry.continents.join(', ')} />
          <Table header1="Area" footer1={`${currentCountry.area.toLocaleString('de-DE')} km\u00B2`} />
          <Table header1="Population" footer1={currentCountry.population.toLocaleString('de-DE')} />
          <Table header1="Lat/Lng" footer1={`${currentCountry.latlng[0].toFixed(1)}, ${currentCountry.latlng[1].toFixed(1)}`} />
          <Table
            header1={currentCountry.timezones.length === 1 ? 'Timezone' : 'Timezones'}
            footer1={currentCountry.timezones.map((tz, i) => <p key={i}>{tz}</p>)}
          />

          <div className='flex gap-6 mt-6 items-center justify-center'>
            {currentCountry !== null && !isMarkedAlreadyComparisson(currentCountry) && isLoggedIn &&
              <Button //Add To Markers
                buttonText={<i className="bi bi-star" />}
                buttonName="Mark"
                ratio="text-center px-2 text-xs w-8 mb-10"
                title={'Add ' + currentCountry.name + ' to Markers'}
                action={() => addToMarkers(currentCountry)}
              />}

            {currentCountry !== null && isLoggedIn && currentCountry.id !== markers[0]?.id && isMarkedAlreadyComparisson(currentCountry) &&
              //Non removable (user location)
              <Button //Revove From Markers
                buttonText={<i className="bi bi-star-fill" />}
                buttonName="Unmark"
                ratio="text-center px-2 text-xs w-8 mb-10"
                title={'Remove ' + currentCountry.name + ' from Markers'}
                action={() => removeFromMarkers(currentCountry)}
              />}

            {currentCountry !== null && isLoggedIn &&
              currentCountry.id === markers[0]?.id && //Non removable (user location)
              <Button //Revove From Markers
                buttonText={<i className="bi bi-star-fill" />}
                buttonName="Default"
                ratio={`
                  text-center px-2 text-xs w-8 mb-10
                  bg-slate-800/0 dark:bg-slate-800/0 hover:bg-slate-800/0 dark:hover:bg-slate-800/0`}
                title={`${currentCountry.name} is your born location`}
              />}

            <Button //DUMMY BUTTON
              buttonText={<i className="bi bi-music-note-list" />}
              buttonName="Radio"
              ratio="text-center px-2 text-xs w-8 mb-10"
              title={'Fetch Radios of ' + currentCountry.name}
              action={() => console.log('radio: ', currentCountry.name)}
            />
          </div>


        </aside>
        <aside className='w-[300px] mx-auto flex items-center justify-center pb-10 sm:pb-0'>
          {
            currentCountry?.capitals.map((capital, i) => (
              <CountryCapitalImage
                currentCountry={currentCountry}
                capital={capital} key={i} />
            ))
          }
        </aside>
      </div>
    </main>
  )
}

export default CountryHub
