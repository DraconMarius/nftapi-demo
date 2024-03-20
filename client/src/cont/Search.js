import React, { useState, useEffect } from 'react';

import { Pane, TextInputField, Select, Button } from 'evergreen-ui';

function Search() {
    const [searchString, setSearchString] = useState('');
    const [searchType, setSearchType] = useState('Wallet');

    const handleSearch = () => {
        console.log(`Searching for: ${searchString} in ${searchType}`);
        // Implement your search logic here
    };

    return (
        <Pane padding={40} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Pane marginBottom={20} width="100%" maxWidth={400}>
                <TextInputField
                    label="Search Query"
                    placeholder="Enter your search..."
                    // value={searchString}
                    onChange={e => setSearchString(e.target.value)}
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
            <Button appearance="primary" onClick={handleSearch}>Search</Button>
        </Pane>
    );
}

export default Search;