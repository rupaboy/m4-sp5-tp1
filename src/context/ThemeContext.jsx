import { createContext, useState, useEffect } from "react";


const ThemeContext = createContext(); //Contexto de Temas

export const ThemeProvider = ({ children }) => {

    //Estado para Tema Oscuro
    const [isDark, setIsDark] = useState(() => {

        //Estado inicial desde LocalStorage
        const savedTheme = localStorage.getItem('theme')
        return savedTheme === 'dark';
    });


    const toggleTheme = () => { //Función palanca
        setIsDark((currentTheme) => {
            const nextTheme = !currentTheme;
            // Guarda el nuevo estado en localStorage
            localStorage.setItem('theme', nextTheme ? 'dark' : 'light')
            return nextTheme;
        });
    };

    useEffect(() => {
        const rootElement = document.getElementById('rootElement');

        if (isDark) {
            rootElement.classList.add('dark');
        } else {
            rootElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>

            <div //Todos los elementos hijos podrán tener className 'dark'
            id='rootElement'
            className={`${isDark ? 'dark' : ''}
            bg-zinc-400 dark:bg-zinc-900 min-w-82`}>

                {children}

            </div>
        </ThemeContext.Provider>

    );
};

export default ThemeContext;