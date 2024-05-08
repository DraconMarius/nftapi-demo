import React, { useState, useEffect } from 'react';

import {
    Pane,
    Alert,
    Portal,
    Button,
    Card,
    Text
} from 'evergreen-ui';

import Collections from './Collections';
import Wallet from './Wallet';
import Tabs from '../comp/Tabs'
import NFT from '../comp/NFT';

import { useSearch } from '../cont/searchContex';

function Display({ apiRes, type }) {
    const [displayType, setType] = useState(type)

    const { searchParams, updateSearchParams } = useSearch();

    //show `reset` when no prev data, show `back` when data
    const [backBtn, setBackBtn] = useState(false)

    const [paramsDisp, setParamDisp] = useState({
        "walletAdd": searchParams.walletAdd,
        "collectionAdd": searchParams.collectionAdd,
        "contractAdd": searchParams.contractAdd,
        "network": searchParams.network,
        "tokenId": searchParams.tokenId
    })

    const blankState = {
        "walletAdd": '',
        "collectionAdd": '',
        "contractAdd": '',
        "network": '',
        "tokenId": '',
        "pageKey": '',
        "prevKeys": [],
        "back": {}
    }

    const handleBack = (backBtn) => {
        if (backBtn) {
            updateSearchParams({
                ...searchParams.back,
            })
        } else {
            updateSearchParams(blankState)
        }
    }

    useEffect(() => {
        if (!apiRes || !type) {
            setType('error');
        } else {
            console.log('display', type)
            setType(type)
        };
        const isBack = (params) => Object.keys(params).length === 0;

        (!(searchParams.back) || (isBack(searchParams.back))) ? setBackBtn(false) : setBackBtn(true);

    }, [apiRes, type]);

    useEffect(() => {
        console.log(backBtn)
    }, [backBtn])


    return (

        <>
            {apiRes ?
                <Pane >
                    <Portal>
                        <Pane background="rgba(249, 250, 252, 0.9)" padding={24} position="fixed" bottom={0} left={0}>
                            {!backBtn ?
                                <Button onClick={() => handleBack(backBtn)}>Reset</Button> :
                                <Pane display="flex" flexDirection="column">
                                    <Text>Currently Displaying</Text>
                                    <Text>       network: {searchParams.network}</Text>
                                    <Text>        walletAdd: {searchParams.walletAdd}</Text>
                                    <Text>      collectionAdd: {searchParams.collectionAdd}</Text>
                                    <Text>       contractAdd: {searchParams.contractAdd}</Text>
                                    <Text>         tokenId: {searchParams.tokenId}</Text>
                                    <Button onClick={() => handleBack(backBtn)} >Back</Button>
                                </Pane>
                            }
                        </Pane>
                    </Portal>
                    {(displayType === "wallet") ?
                        <Wallet apiRes={apiRes} type={type} /> :
                        (displayType === "collection") ?
                            <Collections apiRes={apiRes} type={type} /> :
                            (displayType === "NFT") ?
                                <NFT apiRes={apiRes} type={type} /> :
                                (displayType === "collectionP") ?
                                    <Tabs apiRes={apiRes} type={type} /> :
                                    (displayType === "walletP") ?
                                        <Tabs apiRes={apiRes} type={type} /> :
                                        (displayType === "error") ?
                                            <Alert intent="danger"
                                                title="Error Display Data"
                                            >
                                                Error displaying data
                                            </Alert> :
                                            <>LOADING...</>
                    }
                </Pane> : <Alert intent="danger"
                    title="Error Display Data"
                >
                    Error fetching data from server, NFT data undefined
                </Alert>
            }
        </>
    )

}

export default Display;