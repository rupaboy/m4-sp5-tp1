import { createContext, useState } from "react";


const UiContext = createContext(); //Contexto de Temas

export const UiProvider = ({ children }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <UiContext.Provider value={{
            isMenuOpen,
            setIsMenuOpen
        }}>
            {children}
        </UiContext.Provider>

    );
};

export default UiContext;