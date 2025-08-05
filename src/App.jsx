import { useState } from "react";
import { UseUi } from "./hook/UseUi";
import { useTheme } from "./hook/UseTheme";
import CountryFinder from "./component/CountryFinder";
import CountryHub from './component/CountryHub'
import Menu from './component/particle/Menu'
import Button from "./component/particle/molecule/Button";
import Dashboard from "./component/Dashboard";
import { useUser } from './hook/UseUser'
import Unregistered from "./component/Unregistered";

const App = () => {

  const [ currentCountry, setCurrentCountry ] = useState(null)
  const toCountryHub = ( selectedCountry ) => {
    setCurrentCountry(prev => selectedCountry !== prev ? selectedCountry : prev)
    setIsHubOpen(true)
    setIsDashBoardOpen(false)
  }

  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn, logInUser, logOutUser, hasStoragedUser } = useUser()

  const {
    isMenuOpen,
    setIsMenuOpen,
    isFinderOpen,
    setIsFinderOpen,
    isHubOpen,
    setIsHubOpen,
    isDashBoardOpen,
    setIsDashBoardOpen
  } = UseUi()

  return (
    <main className={`${isFinderOpen ? '' : ''}
      dark:bg-radial dark:from-slate-800 dark:to-slate-950
      bg-radial from-slate-300 to-slate-500 text-slate-900
      dark:text-slate-300/90 dark:hover:text-slate-200
      w-screen h-screen items-center justify-center md:justify-evenly
      overflow-hidden px-5 sm:px-0 flex flex-col md:flex-row`}>

      <div className="top-4 left-4 z-100 fixed">
        <Button
          buttonText={<i className={`z-1000 ${ isMenuOpen ?'bi-x':"bi-three-dots-vertical"}`} />}
          title={'Toggle Menu'}
          buttonName={`${isMenuOpen ? 'Close' : 'Menu'}`}
          action={() => setIsMenuOpen(prev => !prev)}
        />
      </div>

      { !isMenuOpen &&
        <div className="fixed bottom-4 right-4 z-100">
        <Button
          buttonText={<i className={`z-1000 ${isFinderOpen ? 'bi-x' :'bi-search'}`} />}
          title={'Toggle Finder'}
          buttonName={`${isFinderOpen ? 'Close' : 'Finder'}`}
          action={() => {setIsFinderOpen(prev => !prev)
            if (isMenuOpen) {setIsMenuOpen(false)}
          }}
        />
      </div>
      }

      <div className="fixed bottom-4 left-4 z-100">
        <Button
          buttonText={<i className={`z-1000 ${isDark ? 'bi-sun' :'bi-moon'}`} />}
          title={`${isDark ? 'Toggle Light Theme' : 'Toggle Dark Theme'}`}
          buttonName={`${isDark ? 'Dark' : 'Light'}`}
          action={() => toggleTheme()}
        />
      </div>

      {!isMenuOpen &&
        <div className="fixed top-4 right-4 z-100">
        <Button
          buttonText={<i className={`z-1000' ${isLoggedIn ? 'bi-person' : hasStoragedUser ? 'bi-box-arrow-in-right' : 'bi-person-plus'}`} />}
          title={`${isLoggedIn ? 'User Profile' : 'Login/Sign Up'}`}
          buttonName={`${isLoggedIn ? 'User' : hasStoragedUser ? 'Login':'Register'}`}
          action={() => isLoggedIn ? logOutUser() :logInUser()}
        />
      </div>}

      {isMenuOpen &&
        <Menu/>}

      {isFinderOpen &&
        <CountryFinder
          toCountryHub={toCountryHub}
        />}

      {isHubOpen && !isFinderOpen && currentCountry !== null &&
        <CountryHub
          currentCountry={currentCountry}
        />}

        { isLoggedIn && isDashBoardOpen &&
          <Dashboard
          toCountryHub={toCountryHub}
          currentCountry={currentCountry}
        />}

              {
        currentCountry !== null && isHubOpen && isDashBoardOpen && !isFinderOpen &&
        <div className="absolute left-4 top-1/2 translate-y-[3em]">
          <Button
            buttonText={<i className="bi-caret-left" />}
            buttonName={`${`current: ${currentCountry.id}`}`}
            action={() => {
              setIsDashBoardOpen(false)
              setIsHubOpen(true)
            }}
          />
        </div>
      }

        { !isMenuOpen && !isFinderOpen && !isLoggedIn && !hasStoragedUser && isDashBoardOpen &&
          <Unregistered/>
          }

    </main>
  );
}

export default App