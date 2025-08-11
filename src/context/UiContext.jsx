import { createContext, useState } from "react";
import { useLocation } from "react-router";

const UiContext = createContext(); //Contexto de Temas

export const UiProvider = ({ children }) => {

    const location = useLocation()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const [showPopUp, setShowPopUp] = useState(false)

    const isFinderOpen = location.pathname.startsWith('/finder')
    const isHubOpen = location.pathname.startsWith('/countries')
    const isUserOpen = location.pathname.startsWith('/user')
    const isDashBoardOpen = location.pathname.endsWith('/')

    return (
        <UiContext.Provider value={{
            isMenuOpen,
            setIsMenuOpen,
            showPopUp,
            setShowPopUp,
            isFinderOpen,
            isDashBoardOpen,
            isHubOpen,
            isUserOpen
        }}>
            {children}
        </UiContext.Provider>

    );
};

export default UiContext;