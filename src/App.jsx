import { useState, useEffect, useContext } from "react";
import { UseWorld } from "./hook/UseWorld";
import CountryFinder from "./component/CountryFinder";
import CountryHub from './component/CountryHub'
import Menu from './component/particle/Menu'
import Button from "./component/particle/molecule/Button";
import NotificationTag from "./component/NotificationTag";

const App = () => {

  const [currentCountry, setCurrentCountry] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { isFinderOpen, setIsFinderOpen } = UseWorld()

  return (
    <main className={`${isFinderOpen ? '' : ''}
      bg-slate-900 bg-radial from-slate-800 to-slate-950
      w-screen h-screen min-h-[600px] items-center justify-center md:justify-evenly pt-10
      overflow-hidden px-5 pb-10 flex flex-col md:flex-row md:pt-5 md:pb-5`}>

      <div className="absolute top-4 left-4">
        <Button
          buttonText={<i className="z-1000 bi-three-dots-vertical text-slate-100" />}
          title={'Toggle Menu'}
          action={() => setIsMenuOpen(prev => !prev)}
        />
      </div>

      {isMenuOpen &&
        <Menu
          setIsFinderOpen={setIsFinderOpen}
          setIsMenuOpen={setIsMenuOpen}
        />}

      {currentCountry === null && isFinderOpen && !isMenuOpen &&
        <CountryFinder
          setCurrentCountry={setCurrentCountry}
        />}

      {currentCountry !== null && isFinderOpen &&
        <CountryHub
          currentCountry={currentCountry}
        />}


    </main>
  );
}

export default App