import { useState } from "react";
import { UseWorld } from "./hook/UseWorld";
import { useTheme } from "./hook/UseTheme";
import CountryFinder from "./component/CountryFinder";
import CountryHub from './component/CountryHub'
import Menu from './component/particle/Menu'
import Button from "./component/particle/molecule/Button";
import Dashboard from "./component/Dashboard";
import { useUser } from './hook/UseUser'

const App = () => {

  const { isLoggedIn, logInUser, logOutUser, hasStoragedUser } = useUser()


  const [ currentCountry, setCurrentCountry ] = useState(null)
  
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)
  const { isFinderOpen, setIsFinderOpen } = UseWorld()
  const { isDark, toggleTheme } = useTheme()
  
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
        <Menu
          setIsFinderOpen={setIsFinderOpen}
          setIsMenuOpen={setIsMenuOpen}
        />}

      {isFinderOpen &&
        <CountryFinder
          setCurrentCountry={setCurrentCountry}
          setIsMenuOpen={setIsMenuOpen}
          setIsFinderOpen={setIsFinderOpen}
          isMenuOpen={isMenuOpen}
        />}

      {currentCountry !== null &&
        <CountryHub
          currentCountry={currentCountry}
          setCurrentCountry={setCurrentCountry}
          isFinderOpen={isFinderOpen}
          isMenuOpen={isMenuOpen}
        />}

        { isLoggedIn &&
          <Dashboard
          setCurrentCountry={setCurrentCountry}
          setIsMenuOpen={setIsMenuOpen}
          setIsFinderOpen={setIsFinderOpen}
          currentCountry={currentCountry}
          isFinderOpen={isFinderOpen}
          isMenuOpen={isMenuOpen}
        />}

        { !isMenuOpen && !isFinderOpen && !isLoggedIn && !hasStoragedUser && currentCountry === null &&
          <div className="w-full flex flex-col items-center justify-center">

            <h2 className="my-2 border-b border-b-amber-800 dark:border-b-amber-400">You are not registered!</h2>
            <h2 className="text-xs">Get to know your inner world.</h2>
            <Button
            ratio="flex items-center gap-2 px-2 mt-7"
            buttonText={<i className={'bi-person-plus'}/>}
            buttonName={'Sign Up'}
            title={'Register'}
            />

            <Button
            ratio="flex items-center gap-2 px-2 mt-4 mb-2 bg-slate-800/0 dark:bg-slate-800/0
            dark:hover:bg-slate-800/0 hover:bg-slate-800/0 hover:text-amber-800 dark:hover:text-amber-400 underline"
            buttonText={<i className={'bi-box-arrow-in-right'}/>}
            buttonName={'Already have an acoount?'}
            title={'Login'}
            />
          </div>
          }

    </main>
  );
}

export default App