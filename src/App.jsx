import PlanetEarth from "./component/PlanetEarth";
import { useWorld } from './hook/UseWorld'
import Screen from "./component/particle/Screen";

const App = () => {

  const {
    continents,
    languages,
    countries,
    setSelectedCountry,
    selectedContinents,
    setSelectedLanguages,
    setSelectedContinents } = useWorld()

  return (

      <main className="bg-slate-900 w-screen h-screen min-h-90
      bg-radial from-slate-600 to-black sm:flex items-center grid grid-cols-[40px_1fr]">
          <header className="sm:absolute sm:w-full top-1/2 -translate-y-0 sm:-translate-y-1/2 sm:top-1/6 z-100">

             {/*<Menu category={continents} action={setSelectedContinents} />*/}
             <Screen name='Menu'/>

          </header>
        <div className="min-w-[100vw] h-2/3 bg-slate-950 flex justify-center items-center overflow-hidden scale-70 sm:scale-80
        relative rounded-full border-4 border-slate-900 px-10 sm:min-h-52">
          
          <main className="relative h-80 flex justify-center items-center">
            <div className="rotate-348 lg:scale-100 md:scale-90 sm:scale-80 scale-70">

              <PlanetEarth />

            </div>
          </main>

        </div>
           {/*languages.map((language) => (
          <Screen item={language} action={setSelectedLanguages} /> ))*/}
      </main>

    
  );
}

export default App