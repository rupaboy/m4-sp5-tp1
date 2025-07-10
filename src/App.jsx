import PlanetEarth from "./component/PlanetEarth";
import Menu from "./component/Menu";

const App = () => {

  return (

    
      <main className="bg-slate-800 w-screen h-screen flex flex-col items-center justify-center relative">

        <Menu />

        <div className="block relative h-80">
          <div className="rotate-348 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:scale-100 md:scale-90 sm:scale-80 scale-70">
            <PlanetEarth />
          </div>
        </div>

        <Menu />

      </main>

    
  );
}

export default App