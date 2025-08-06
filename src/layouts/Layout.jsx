import { Outlet, useNavigate, useLocation } from 'react-router'
import { useTheme } from '../hook/UseTheme'
import { useUser } from '../hook/UseUser'
import { UseUi } from '../hook/UseUi'
import Button from '../component/particle/molecule/Button'
import Menu from '../component/particle/Menu'

const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { isDark, toggleTheme } = useTheme()
    const { isLoggedIn, hasStoragedUser } = useUser()
    const { isMenuOpen, setIsMenuOpen } = UseUi()

    const isFinderOpen = location.pathname.startsWith('/finder')

    return (
        <main className={`
              dark:bg-radial dark:from-slate-800 dark:to-slate-950
              bg-radial from-slate-300 to-slate-500 text-slate-900
              dark:text-slate-300/90 dark:hover:text-slate-200
              w-screen h-screen items-center justify-center md:justify-evenly
              overflow-hidden px-5 sm:px-0 flex flex-col md:flex-row`}>

            {/* Menu Button */}
            <div className="top-4 left-4 z-100 fixed">
                <Button
                    buttonText={<i className={`z-1000 ${isMenuOpen ? 'bi-x' : "bi-three-dots-vertical"}`} />}
                    title={'Toggle Menu'}
                    buttonName={`${isMenuOpen ? 'Close' : 'Menu'}`}
                    action={() => {setIsMenuOpen(prev => !prev)}}
                />
            </div>

            {/* Finder Button */}
            {!isMenuOpen &&
                <div className="fixed bottom-4 right-4 z-100">
                    <Button
                        buttonText={<i className={`z-1000 ${isFinderOpen ? 'bi-x' : 'bi-search'}`} />}
                        title={'Toggle Finder'}
                        buttonName={`${isFinderOpen ? 'Close' : 'Finder'}`}
                        action={() => {
                            if (isFinderOpen) navigate('/')
                            else navigate('/finder')
                        }}
                    />
                </div>
            }
            {/* Theme Button */}
            <div className="fixed bottom-4 left-4 z-100">
                <Button
                    buttonText={<i className={`z-1000 ${isDark ? 'bi-sun' : 'bi-moon'}`} />}
                    title={`${isDark ? 'Toggle Light Theme' : 'Toggle Dark Theme'}`}
                    buttonName={`${isDark ? 'Dark' : 'Light'}`}
                    action={() => toggleTheme()}
                />
            </div>
            {/* User Button */}
            {!isMenuOpen &&
                <div className="fixed top-4 right-4 z-100">
                    <Button
                        buttonText={<i className={`z-1000' ${isLoggedIn ? 'bi-person' : hasStoragedUser ? 'bi-box-arrow-in-right' : 'bi-person-plus'}`} />}
                        title={`${isLoggedIn ? 'User Profile' : 'Login/Sign Up'}`}
                        buttonName={`${isLoggedIn ? 'User' : hasStoragedUser ? 'Login' : 'Register'}`}
                        action={() => {
                            if (isLoggedIn) navigate('/user/id/:id')
                            else navigate('/user/register')
                        }}
                    />
                </div>}

            {/* Menu Panel */}
            {isMenuOpen &&
                <Menu />}

            {/* Current View */}

                <Outlet />

        </main>
    )
}

export default Layout