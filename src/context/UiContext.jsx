import { createContext, useState } from "react";


const UiContext = createContext(); //Contexto de Temas

export const UiProvider = ({ children }) => {

    const [isFinderOpen, setIsFinderOpen] = useState(false)
    const [isDashBoardOpen, setIsDashBoardOpen] = useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isHubOpen, setIsHubOpen] = useState(false)

    return (
        <UiContext.Provider value={{
            isMenuOpen,
            setIsMenuOpen,
            isFinderOpen,
            setIsFinderOpen,
            isHubOpen,
            setIsHubOpen,
            isDashBoardOpen,
            setIsDashBoardOpen
        }}>
            {children}
        </UiContext.Provider>

    );
};

export default UiContext;