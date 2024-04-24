import React, { useState, useEffect } from 'react';
// import { Alchemy, Network } from 'alchemy-sdk';

import Display from './Disp';
import Default from '../comp/Default'

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

    const determineFetchType = (params) => {
        // Check for specific combinations of parameters
        if (params.walletAdd && !params.network && !params.collectionAdd && !params.tokenId && !(params.pageKey || params.prevKeys[0])) {
            return 'walletAdd';
        } else if (params.collectionAdd && params.network && !params.tokenId &&
            !(params.pageKey || params.prevKeys[0])) {
            return 'collection';
        } else if (params.tokenId && params.network && params.contractAdd) {
            return 'NFT';
        } else if ((params.network && params.walletAdd && (params.pageKey || params.prevKeys[0])) ||
            (params.network && params.collectionAdd && (params.pageKey || params.prevKeys[0])) || (params.network && params.walletAdd)) {
            return 'page';
        }
        // Add more conditions as needed for different fetch scenarios

        return 'default'; // Default fetchType if none of the above conditions are met
    }


    // const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        console.log(searchParams)
        const fetchServer = async (searchParams) => {
            try {
                let data;
                let fetchType = determineFetchType(searchParams);

                console.log('Fetch Type:', fetchType); // Debug the fetchType value

                switch (fetchType) {
                    case 'walletAdd':
                        data = await getNFTsForOwner(searchParams.walletAdd, searchParams.spam);
                        setType(data ? 'wallet' : 'error');
                        break;
                    case 'collection':
                        data = await getNFTsCollection(searchParams.network, searchParams.collectionAdd);
                        setType(data ? 'collection' : 'error');
                        break;
                    case 'NFT':
                        data = await getNFT(searchParams.network, searchParams.tokenId, searchParams.contractAdd);
                        setType(data ? 'NFT' : 'error');
                        break;
                    case 'page':
                        const pageType = searchParams.collectionAdd ? "collectionP" : "walletP"

                        if (pageType === "walletP") {

                            data = await getNFTsPage(searchParams.network, searchParams.walletAdd, searchParams.pageKey, searchParams.spam);
                        }
                        if (pageType === "collectionP") {
                            data = await getNFTsCollection(searchParams.network, searchParams.collectionAdd, searchParams.pageKey)
                        }
                        setType(await data ? pageType : 'error');
                        break;
                    default:
                        setType('default');
                }

                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
                setType('error');
                return null;
            }
        };
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
        // if (!apiRes || !type) {
        //     setType('error');
        // } else {
        //     setType(type)
        // }
    }, [apiRes, type])



    return (
        <Pane>
            <Pane>
                <Overlay isShown={loading}>
                    <Spinner marginX="auto" marginY={450} />
                </Overlay>
            </Pane >
            {((type === "default") && (loading === false) && !apiRes) ?
                <Pane display="flex"
                    justifyContent="center" alignItems="center" marginTop={16}>
                    <Pane display="flex" flexDirection="column" alignItems="center">
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
                        <Default />
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
        </Pane>
    );
}

export default Search;