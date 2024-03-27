import React, { useState, useEffect } from 'react';
// import { Alchemy, Network } from 'alchemy-sdk';

import Display from './Display';

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

function Search({ apikey }) {
    const [searchString, setSearchString] = useState('');
    const [searchType, setSearchType] = useState('Wallet');
    const [searching, setSearching] = useState(false);
    const [apiRes, setApiRes] = useState({});
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);



    const handleSearch = async (apikey) => {
        console.log(`Searching for: ${searchString} in ${searchType} using key ${apikey}`)


        setLoading(true)
        console.log("after loading and get all info from api call")
        setLoading(false)
        setSearching(true)
    };

    return (
        <>
            <Pane>
                <Overlay isShown={loading}>
                    <Spinner marginX="auto" marginY={120} />
                </Overlay>
                {searching ? (
                    <Pane>
                        <Pane position="relative" width="100%">
                            {/* Drawer toggle tab */}
                            <Pane
                                position="TOP"
                                transition="3sec"
                                elevation={2}
                                zIndex={1}
                            >
                                {/* Tab content and toggle search button */}
                                <Pane padding={16} display="flex" alignItems="center" justifyContent="center">
                                    <IconButton icon={isDrawerOpen ? ZoomOutIcon : ZoomInIcon} onClick={toggleDrawer} />
                                </Pane>
                                <Pane padding={16} display={isDrawerOpen ? 'block' : 'none'}>
                                    <Pane padding={40} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                                        <Pane marginBottom={20} width="100%" maxWidth={400}>
                                            <SearchInput
                                                placeholder="Enter your search..."
                                                // value={searchString}
                                                onChange={e => setSearchString(e.target.value)}
                                                width={400}

                                            />
                                        </Pane>
                                        <Pane marginBottom={20} width="100%" maxWidth={400}>
                                            <Select width="100%" value={searchType} onChange={e => setSearchType(e.target.value)}>
                                                <option value="Wallet">Wallet</option>
                                                <option value="Collection">Collection</option>
                                                <option value="Contract">Contract</option>
                                                <option value="NFT">NFT</option>
                                            </Select>
                                        </Pane>
                                        <Button appearance="primary" onClick={() => { handleSearch(apikey).then(toggleDrawer) }}>Search</Button>
                                    </Pane >
                                </Pane>
                            </Pane>
                        </Pane>
                        {isDrawerOpen ? (<></>) : (

                            <Pane padding={16} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                                <Display res={apiRes} type={searchType} />
                            </Pane>
                        )}
                    </Pane>
                ) :

                    (<Pane padding={40} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Pane marginBottom={20} width="100%" maxWidth={400}>
                            <SearchInput
                                placeholder="Enter your search..."
                                // value={searchString}
                                onChange={e => setSearchString(e.target.value)}
                                width={400}

                            />
                        </Pane>
                        <Pane marginBottom={20} width="100%" maxWidth={400}>
                            <Select width="100%" value={searchType} onChange={e => setSearchType(e.target.value)}>
                                <option value="Wallet">Wallet</option>
                                <option value="Collection">Collection</option>
                                <option value="Contract">Contract</option>
                                <option value="NFT">NFT</option>
                            </Select>
                        </Pane>
                        <Button appearance="primary" onClick={() => handleSearch(apikey)}>Search</Button>
                    </Pane >)
                }
            </Pane >
        </>
    );
}

export default Search;