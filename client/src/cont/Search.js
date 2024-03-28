import React, { useState, useEffect } from 'react';
// import { Alchemy, Network } from 'alchemy-sdk';

import Display from './Display';

import { useSearch } from './searchContex'

import {
    getNFTsForOwner,
    getNFTsCollection,
    getNFTsPage,
    getTokenBalnce
} from '../util/alchemyapi';

import {
    Pane,
    Select,
    SearchInput,
    Button,
    Overlay,
    Spinner,
    Position,
    Paragraph,
    ZoomOutIcon,
    ZoomInIcon,
    IconButton
} from 'evergreen-ui';

function Search() {
    const { searchCriteria } = useSearch()
    const [searching, setSearching] = useState(false);
    const [apiRes, setApiRes] = useState({});
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    // useEffect(() => {
    //     console.log(searchCriteria)
    //     if (searchCriteria.walletAdd) {
    //         getNFTsForOwner(searchCriteria.walletAdd)

    //     }
    //     if (searchCriteria.)
    // }, [searchCriteria]);



    return (
        <>
            <Pane>
                <Overlay isShown={loading}>
                    <Spinner marginX="auto" marginY={120} />
                </Overlay>

            </Pane >
        </>
    );
}

export default Search;