import React, { useState, createContext, useContext } from 'react';

const blankState = {
    network: '',
    walletAdd: '',
    collectionAdd: '',
    contractAdd: '',
    tokenId: '',
    pageKey: ''
}

const SearchContext = createContext({
    searchParams: {
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: ''
    },
    setParams: () => { }
});

// Context provider component
export function SearchProvider({ children }) {
    const [searchParams, setSearchParams] = useState({
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: ''
    });

    const updateSearchParams = (newParams) => {
        setSearchParams({ ...blankState, ...newParams });
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