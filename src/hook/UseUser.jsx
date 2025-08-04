import { useContext } from "react";
import UserContext from '../context/UserContext'

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser debe ser utilizado dentro del UserProvider");
    }

    return context;
};
