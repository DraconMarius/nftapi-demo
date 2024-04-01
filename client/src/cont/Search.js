import React, { useState, useEffect } from 'react';
// import { Alchemy, Network } from 'alchemy-sdk';

import Display from './Disp';

import { useSearch } from './searchContex'

import {
    getNFTsForOwner,
    getNFTsCollection,
    getNFTsPage,
    getTokenBalance
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
    const { searchParams } = useSearch()
    const [apiRes, setApiRes] = useState({});
    const [loading, setLoading] = useState(false)
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [type, setType] = useState("default")
    //storing pgKey response
    const [pgKey, setPgKey] = useState([]);

    const fetchServer = async (searchParams) => {
        setLoading(true)
        let data
        try {
            if (searchParams.walletAdd) {
                data = await getNFTsForOwner(searchParams.walletAdd);
                // getTokenBalance(searchCriteria.walletAdd)
                setType('wallet')

            } else if (searchParams.collectionAdd) {
                data = await getNFTsCollection(searchParams.network,
                    searchParams.collectionAdd)
                setType('collection')

            } else {
                setType('default')
            }
            setLoading(false);
            return data
        } catch (error) {
            console.error("Error fetching data:", error)
            setType('error')
            return null
        }
    }

    // const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        //fetch everytime search provider param is changed
        //change based on searchParams availability
        const fetchData = async () => {
            const data = await fetchServer(searchParams);
            setApiRes(data); // Set the resolved data
        };

        // Call the async function
        fetchData();
    }, [searchParams]);

    // useEffect(() => {
    //     console.log(apiRes)
    // }, [apiRes])



    return (
        <>
            <Pane>
                <Overlay isShown={loading}>
                    <Spinner marginX="auto" marginY={120} />
                </Overlay>
            </Pane >
            {(type === "default") ?
                <Pane>DEFAULT</Pane> :
                <Display apiRes={apiRes} type={type} />
            }
        </>
    );
}

export default Search;