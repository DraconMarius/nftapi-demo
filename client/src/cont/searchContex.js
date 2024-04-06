import React, { useState, createContext, useContext } from 'react';

const blankState = {
    network: '',
    walletAdd: '',
    collectionAdd: '',
    contractAdd: '',
    tokenId: '',
    pageKey: '',
    prevKey: []
}

const SearchContext = createContext({
    searchParams: {
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: '',
        prevKey: []
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
        pageKey: '',
        prevKey: []
    });

    const updateSearchParams = (newParams) => {
        setSearchParams(prev => {
            let updatedPrevKeys = Array.isArray(prev.prevKey) ? [...prev.prevKey] : [];

            if (newParams.reset) {

                delete newParams.reset;

                return { ...blankState, ...newParams, prevKey: updatedPrevKeys };
            }

            if (newParams.pageKey && !newParams.prevKey && prev.pageKey) {
                updatedPrevKeys.push(prev.pageKey);
            }
            else if (newParams.prevKey) {
                newParams.pageKey = updatedPrevKeys.pop(); // This adjusts prevKeys
                delete newParams.prevKey;
            }

            return { ...prev, ...newParams, prevKey: updatedPrevKeys };
        });
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