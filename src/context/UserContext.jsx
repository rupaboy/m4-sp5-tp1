import { createContext, useState } from "react";


const UserContext = createContext(); //Contexto de Temas

export const UserProvider = ({ children }) => {

    //Estado para Tema Oscuro
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [hasStoragedUser, setHasStoragedUser] = useState(false)

    const logInUser = () => {
        setIsLoggedIn(true);
    }

    const logOutUser = () => {
        setIsLoggedIn(false);
    }


    return (
        <UserContext.Provider value={{ isLoggedIn, logInUser, logOutUser, hasStoragedUser }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserContext;