import React, { useState, createContext, useContext } from 'react';

const blankState = {
    network: '',
    walletAdd: '',
    collectionAdd: '',
    contractAdd: ''
}

const SearchContext = createContext({
    searchParams: {
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: ''

    },
    setParams: () => { }
});

// Context provider component
export function SearchProvider({ children }) {
    const [searchParams, setSearchParams] = useState({
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: ''
    });

    const updateSearchParams = (field, value) => {
        setSearchParams(prev => ({ ...prev, [field]: value }));
    };

    const resetSearchParams = () => {
        setSearchParams(blankState);
    };

    // The context value includes both the searchParams and the updater function
    const value = {
        searchParams,
        setSearchParams: updateSearchParams,
        resetSearchParams
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}