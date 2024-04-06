import React, { useState, useEffect } from 'react';
// import { Alchemy, Network } from 'alchemy-sdk';

import Display from './Disp';

import { useSearch } from './searchContex'

import {
    getNFTsForOwner,
    getNFTsCollection,
    getNFTsPage,
    getTokenBalance,
    getNFT
} from '../util/alchemyapi';

import {
    Pane,
    Select,
    SearchInput,
    Button,
    Overlay,
    Spinner,
    Alert
} from 'evergreen-ui';

import Typewriter from 'typewriter-effect';


function Search() {
    const { searchParams } = useSearch()
    const [apiRes, setApiRes] = useState({});
    const [loading, setLoading] = useState(false)
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [type, setType] = useState("default")
    //storing pgKey response
    const [pgKey, setPgKey] = useState([]);

    const fetchServer = async (searchParams) => {

        let data

        try {
            if (searchParams.walletAdd) {
                data = await getNFTsForOwner(searchParams.walletAdd);
                // getTokenBalance(searchCriteria.walletAdd)
                data ?
                    setType('wallet') :
                    setType('error')

            } else if (searchParams.collectionAdd) {
                data = await getNFTsCollection(searchParams.network,
                    searchParams.collectionAdd)
                data ?
                    setType('collection') :
                    setType('error')

            } else if (searchParams.tokenId) {
                data = await getNFT(searchParams.network,
                    searchParams.tokenId, searchParams.contractAdd)
                data ?
                    setType('NFT') :
                    setType('error')

            } else {
                setType('default')
            }

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
            setLoading(true)
            const data = await fetchServer(searchParams);
            setApiRes(data); // Set the resolved data
            setLoading(false);
        };

        // Call the async function
        fetchData();


    }, [searchParams]);

    useEffect(() => {
        console.log(apiRes)
        // try {
        //     if (apiRes === undefined) {
        //         setType("error")
        //     }
        //     // if (searchParams.walletAdd) {
        //     //     setType('wallet')

        //     // } else if (searchParams.collectionAdd) {
        //     //     setType('collection')

        //     // } else if (searchParams.tokenId) {
        //     //     setType('NFT')
        //     // } else {
        //     //     setType('default')
        //     // }
        // } catch (err) {
        //     console.error("Error fetching data:", err)
        //     setType('error')
        //     return null
        // }

    }, [apiRes])
    const overflow = {
        overflow: 'wrap',
    }



    return (
        <>
            <Pane style={overflow}>
                <Overlay isShown={loading}>
                    <Spinner marginX="auto" marginY={120} />
                </Overlay>
            </Pane >
            {((type === "default") && (loading === false) && !apiRes) ?
                <Pane display="flex"
                    justifyContent="center" alignItems="center" marginTop={16}>
                    <Pane display="flex" flexDirection="column">
                        <Typewriter options={{
                            loop: true,
                            skipAddStyles: true,
                        }}
                            onInit={(typewriter) => {
                                typewriter.typeString('You can see all NFT owned by a wallet address')
                                    .pauseFor(800)
                                    .deleteChars(37)
                                    .pauseFor(1600)
                                    .typeString('checkout a specific Collection')
                                    .pauseFor(2400)
                                    .deleteChars(21)
                                    .pauseFor(2400)
                                    .typeString('an individual NFT')
                                    .pauseFor(2400)
                                    .deleteAll()
                                    .start()
                            }}
                        />
                    </Pane>
                </Pane>
                : (loading === true) ?
                    <>l-o-a-d-i-n-g</> : (apiRes && type && (loading === false)) ?
                        < Display apiRes={apiRes} type={type} /> : <Pane>
                            <Alert intent="danger"
                                title="Error Display Data"
                            >
                                Error fetching data from server, NFT data undefined
                            </Alert>
                        </Pane>
            }
        </>
    );
}

export default Search;