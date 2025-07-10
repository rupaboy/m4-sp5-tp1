import { useContext } from "react";
import { WorldContext } from '../context/WorldContext'


export const useWorld = () => {
    const context = useContext(WorldContext);

    if (!context) {
        throw new Error("useWorld debe ser utilizado dentro del WorldProvider");
    }

    return context;
};