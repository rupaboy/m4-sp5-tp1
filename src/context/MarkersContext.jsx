import { createContext, useState, useEffect } from "react";

export const MarkersContext = createContext();
export const MarkersProvider = ({ children }) => {

    const [isMarkersOpen, setIsMarkersOpen] = useState(false)
    const [markers, setMarkers] = useState(() => {
        const savedMarkers = localStorage.getItem('markers');
        return savedMarkers ? JSON.parse(savedMarkers) : [];
    });

    /*const toggleMarkers = () => {
        setIsMarkersOpen(prev => !prev)
    }*/

    const addToMarkers = (currentCountry) => {
        if (!isMarkedAlreadyComparisson(currentCountry)) {
            const updatedMarkers = [...markers, currentCountry]
            setMarkers(updatedMarkers);
            localStorage.setItem('markers', [JSON.stringify(updatedMarkers)]);
        }
    }

    const isMarkedAlreadyComparisson = (marker) => {
        return markers.some((c) => c.id === marker.id)
    };

    const removeFromMarkers = (country) => {
        if (isMarkedAlreadyComparisson(country)) {
            const updatedMarkers = markers.filter((marker) => marker.id !== country.id);
            setMarkers(updatedMarkers);
            localStorage.setItem('markers', JSON.stringify(updatedMarkers));
        }
    };

    const clearMarkers = () => {
        window.confirm('Do you want to clear all markers?')
            ? setMarkers([])
            : null;
    }

    useEffect(() => {
        const storedMarkers = localStorage.getItem('markers');
        if (storedMarkers !== null) {
            setMarkers(JSON.parse(storedMarkers));
        }
    }, [])


    return (
        <MarkersContext.Provider
            value={{
                isMarkersOpen,
                //toggleMarkers,
                addToMarkers,
                removeFromMarkers,
                isMarkedAlreadyComparisson,
                clearMarkers,
                markers,
            }}
        >
            {children}
        </MarkersContext.Provider>
    );

};