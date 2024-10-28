import React, { createContext, useContext } from 'react';
import { useStandards } from '../hooks/useStandard';
import useAllHistory from '../hooks/useAllHistory';

const ApiContext = createContext();

const useApi = () => {
    return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
    const standardsQuery = useStandards();
    const historyQuery = useAllHistory();

    const contextValue = {
        standards: standardsQuery,
        history: historyQuery
    };

    return (
        <ApiContext.Provider value={contextValue}>
            {children}
        </ApiContext.Provider>
    );
};

export default useApi