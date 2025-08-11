import { createContext, useEffect, useState } from "react";
import { userDelete } from '../service/user/userDelete'

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [storedUsers, setStoredUsers] = useState([])
    const [hasStoragedUser, setHasStoragedUser] = useState(false)

    //Logged User State
    const [user, setUser] = useState(null)

    const logInUser = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);

        //Saving username on LocalStorage
        setStoredUsers((prev) => {
            const exists = prev.find(user => user.userName === userData.userName);
            const updated = exists ? prev : [...prev, userData]
            localStorage.setItem('sphereOne-users', JSON.stringify(updated))
            return updated;
        });
    };

    const logOutUser = () => {
        setUser(null);
        setIsLoggedIn(false);
    }

    const deleteUser = async (userId) => {
        try {
            await userDelete(userId);
            setStoredUsers(prev => prev.filter(user => user.id !== userId));
            if (user?.id === userId) {
                setStoredUsers(prev => {
                    const updated = prev.filter(user => user.id !== userId);
                    localStorage.setItem('sphereOne-users', JSON.stringify(updated));
                    return updated;
                });
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        const savedUsers = localStorage.getItem('sphereOne-users');
        if (savedUsers) {
            try {
                const parsed = JSON.parse(savedUsers);
                if (Array.isArray(parsed)) {
                    setStoredUsers(parsed);
                    setHasStoragedUser(parsed.length > 0);
                } else {
                    localStorage.removeItem('sphereOne-users')
                    setStoredUsers([]);
                    setHasStoragedUser(false);
                }
            } catch (error) {
                localStorage.removeItem('sphereOne-users');
                setStoredUsers([]);
                setHasStoragedUser(false)
            }
        }
    }, [])

    // If storedUserNames changes, updates hasStoragedUser
    useEffect(() => {
        setHasStoragedUser(storedUsers.length > 0);
    }, [storedUsers]);


    return (
        <UserContext.Provider value={{
            isLoggedIn,
            logInUser,
            logOutUser,
            deleteUser,
            hasStoragedUser,
            storedUsers,
            user
        }}>
            {children}
        </UserContext.Provider>

    );
};

export default UserContext;