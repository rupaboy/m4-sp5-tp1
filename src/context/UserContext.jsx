import { createContext, useState } from "react";


const UserContext = createContext(); //Contexto de Temas

export const UserProvider = ({ children }) => {

    //Estado para Tema Oscuro
    const [isLoggedIn, setIsLoggedIn] = useState(() => {

        //Estado inicial desde LocalStorage
        const savedUser = localStorage.getItem('User')
        return savedUser;
    });

    const logInUser = () => {
        setIsLoggedIn(true);
    }

    const logOutUser = () => {
        setIsLoggedIn(false);
    }


    return (
        <UserContext.Provider value={{ isLoggedIn, logInUser, logOutUser }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserContext;