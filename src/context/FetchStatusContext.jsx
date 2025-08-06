import { createContext, useCallback, useRef, useState } from "react";

export const FetchStatusContext = createContext();

export const FetchStatusProvider = ({ children }) => {

    const [statusMap, setStatusMap] = useState({}); //key: fetch name
    const didFetchMap = useRef({})
    
    const runFetch = useCallback(async (key, fetchFn, onSuccess) => {
        
        didFetchMap.current[key] = true;
        try {
            const data = await fetchFn();
            setStatusMap(prev => ({
                ...prev, [key]: {dataLoaded: true, fetchFailed: false }
            }));
            if (onSuccess) onSuccess(data);
            return data;

        } catch (error) {
            setStatusMap(prev => ({
                ...prev, [key]: { dataLoaded: false, fetchFailed: true }
            }));
            return null;
        }
    }, []);

    const getStatus = ( key ) => {
        const { dataLoaded, fetchFailed } = statusMap[key] || {};
        const didFetch = !!didFetchMap.current[key];
        return {
            isLoading: !dataLoaded && !fetchFailed && didFetch,
            hasError: fetchFailed && !dataLoaded && didFetch,
            dataLoaded: !!dataLoaded,
            fetchFailed: !!fetchFailed,
            didFetch
        };
    };

    return (
        <FetchStatusContext.Provider value={{ runFetch, getStatus }}>
            {children}
        </FetchStatusContext.Provider>
    )
}
