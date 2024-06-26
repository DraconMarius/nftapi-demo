import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: '',
        prevKeys: [],
        currentKey: ''
    });

    const updateSearchParams = (newParams) => {
        setSearchParams((prev) => {
            const updatedPrevKeys = (newParams.pageKey && !newParams.isPrevPage)
                ? [...prev.prevKeys, prev.pageKey].filter(Boolean)
                : prev.prevKeys;

            // console.log(updatedPrevKeys)

            if (newParams.isPrevPage) {
                const prevPageKey = updatedPrevKeys.pop() || '';
                return { ...prev, pageKey: prevPageKey, prevKeys: updatedPrevKeys, currentKey: prevPageKey };
            }
            if (newParams.isNew) {
                return { ...prev, ...newParams }
            }

            return { ...prev, ...newParams, prevKeys: updatedPrevKeys };
        });
    };

    const resetSearchParams = () => setSearchParams({
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: '',
        prevKeys: [],
        currentKey: '',
    });

    return (
        <SearchContext.Provider value={{ searchParams, updateSearchParams, resetSearchParams }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
