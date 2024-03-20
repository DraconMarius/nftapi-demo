import React, { useState, useEffect } from 'react';

import { Pane, Select, SearchInput, Button } from 'evergreen-ui';

function Search({ apikey }) {
    const [searchString, setSearchString] = useState('');
    const [searchType, setSearchType] = useState('Wallet');


    const handleSearch = async (apikey) => {
        console.log(apikey)
        console.log(`Searching for: ${searchString} in ${searchType} using key ${apikey}`)

    };

    return (
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
            <Button appearance="primary" onClick={() => handleSearch(apikey)}>Search</Button>
        </Pane>
    );
}

export default Search;