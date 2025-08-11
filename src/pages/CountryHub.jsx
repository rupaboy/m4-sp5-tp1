import CountryCapitalImage from '../component/CountryCapitalImage'
import restCountry from '../service/restCountries/restCountry'
import Button from '../component/particle/molecule/Button'
import PopUpImage from '../component/particle/molecule/PopUpImage'
import Table from '../component/particle/molecule/Table'
import Logo from '../component/particle/Logo'
import Loading from '../component/particle/molecule/Loading'
import { UseMarkers } from '../hook/UseMarkers'
import { UseUi } from '../hook/UseUi'
import { UseUser } from '../hook/UseUser'
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
  const { isMenuOpen, showPopUp, setShowPopUp } = UseUi()
  const { isLoggedIn } = UseUser()
  const { getStatus } = UseFetchStatus()

  const { notify } = UseNotification()
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
            flag: raw.flags.svg,
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
  }, [id]);

  if (!currentCountry) {
    return (
      <main className="text-center h-screen flex w-screen items-center justify-center">
        <Loading />
      </main>
    )
  }


  return (

    <main className={`${isMenuOpen ? 'hidden' : ''}
    text-center h-screen w-screen overflow-y-scroll`}>
      {
        <div className='top-7 w-screen flex items-center justify-center fixed'>
          <Logo
            isIsoOnly={true}
          />
        </div>}

      <div className="h-full flex-wrap gap-2 w-full sm:grid-cols-[45%_55%] sm:grid sm:items-center sm:justify-center">

        {/* Nombre de país */}
        <div className='fixed top-0 sm:left-0 border-b
        pt-20 sm:pt-0 w-screen sm:h-full text-nowrap flex-wrap sm:w-20
         sm:border-b-0 sm:border-r
        dark:bg-slate-950 bg-slate-300 dark:text-slate-500 text-slate-700
        sm:border-amber-800 border-b-amber-800 dark:sm:border-amber-500 dark:border-b-amber-500
        '> {/* con guarda responsiva ^ */}
          <aside className='sm:h-full sm:overflow-y-auto sm:absolute'>
            <h2 className='
            leading-6 font-extrabold text-[1em] overflow-visible relative top-1/2
            sm:text-nowrap sm:w-20 sm:relative sm:h-10 sm:py-0 sm:px-0 sm:rotate-[-90deg]
            text-wrap py-2 px-2 text-center
            '>
              {currentCountry.name}</h2>

            {/* Y bandera */}
            <img
            title={`Flag of ${currentCountry.name}`}
            onClick={() => setShowPopUp(true)}
            className='rounded cursor-pointer sm:ml-4 sm:mr-auto sm:w-8 object-fit max-h-5 fixed
            sm:relative top-15 left-1/2 translate-x-[-1em] sm:left-0 sm:top-12 sm:translate-x-0 w-8'
              src={currentCountry.flag} alt={`${currentCountry.id}`} />
          </aside>
        </div>

        {/* Datos de API Rest Countries */}
        <aside className="space-y-2 mt-40 sm:mt-0 sm:ml-32 flex-col flex items-center">
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
                title={`${currentCountry.name} is your User location`}
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

        <aside className='w-[300px] pb-10 sm:pb-0 mx-auto sm:ml-0'>
          {
            currentCountry?.capitals.map((capital, i) => (
              <CountryCapitalImage
                capital={capital} key={i}
                id={id} />
            ))
          }
        </aside>
      </div>

      {showPopUp &&
        <PopUpImage
          imageTag={'Flag of ' + currentCountry.name}
          image={currentCountry.flag}
        />
      }

      {currentCountry.borders &&
        <div> hola {currentCountry.name}</div>
      }
    </main>
  )
}

export default CountryHub
