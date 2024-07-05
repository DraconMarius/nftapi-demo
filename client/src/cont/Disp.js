import React, { useState, useEffect } from 'react';

import {
    Pane,
    Alert,
    Portal,
    Button,
    Card,
    Strong,
    Text,
    Badge,
    Pill
} from 'evergreen-ui';

import Marquee from "react-fast-marquee"

import Collections from './Collections';
import Wallet from './Wallet';
import Tabs from '../comp/Tabs'
import NFT from '../comp/NFT';

import { useSearch } from '../cont/searchContex';

import ethereumIcon from '../assets/etherscan-logo.png'
import arbitrumIcon from '../assets/arbitrum-logo.png'
import optimismIcon from '../assets/optimism-logo.png'
import polygonIcon from '../assets/polygon-logo.png'


function Display({ apiRes, type }) {
    const [displayType, setType] = useState(type)

    const { searchParams, updateSearchParams } = useSearch();

    //show `reset` when no prev data, show `back` when data
    const [backBtn, setBackBtn] = useState(false)

    const [paramsDisp, setParamDisp] = useState([])

    const [icon, setIcon] = useState()

    const blankState = {
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: '',
        prevKeys: [],
        currentKey: '',
        back: {}
    }

    const labels = {
        walletAdd: 'Wallet_Address',
        collectionAdd: 'Collection_Address',
        contractAdd: 'Contract_Address',
        network: 'Network',
        tokenId: 'Token_ID'
    };

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





    }, [apiRes, type]);

    useEffect(() => {
        const isBack = (params) => Object.keys(params).length === 0;

        (!(searchParams.back) || (isBack(searchParams.back))) ? setBackBtn(false) : setBackBtn(true);

        const filteredParams = {}

        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) {  // Check if the value is not an empty string
                filteredParams[key] = value;
            }
        });

        setParamDisp(filteredParams);
    }, [searchParams])

    useEffect(() => {

        if (searchParams.tokenId) {
            if (searchParams.network === "Polygon") {
                setIcon(polygonIcon)
            } else if (searchParams.network === "Arbitrum") {
                setIcon(arbitrumIcon)
            } else if (searchParams.network === "Optimism") {
                setIcon(optimismIcon)
            } else {
                setIcon(ethereumIcon)
            }
        }

    }, [searchParams.network, searchParams.tokenId]);

    return (

        <>
            {apiRes ?
                <Pane >
                    {(displayType === "wallet") ?
                        <Wallet apiRes={apiRes} type={type} /> :
                        (displayType === "collection") ?
                            <Collections apiRes={apiRes} type={type} /> :
                            (displayType === "NFT") ?
                                <NFT apiRes={apiRes} type={type} icon={icon} /> :
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
                    <Portal>
                        <Pane
                            height="auto"
                            width="12.6%"
                            position="fixed"
                            paddingTop={8}
                            paddingBottom={8}
                            bottom={0}
                            left={0}
                            zIndex="3"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"  >
                            <Pane width="100%" flex={1} padding={8}>
                                <Strong>Displaying:</Strong>

                                {Object.entries(labels).map(([key, label]) => {
                                    const val = paramsDisp[key]

                                    return val ? (
                                        <Pane key={key}
                                        >
                                            <Badge color="green" >{label}: </Badge>
                                            <Pill color='orange'>{val}</Pill>

                                        </Pane>

                                    ) : null;
                                })}

                                <Pane paddingTop={8} zIndex="1">

                                    {!backBtn ?

                                        <Button intent="danger" onClick={() => handleBack(backBtn)}>Reset</Button> :

                                        <Button onClick={() => handleBack(backBtn)} >Back</Button>
                                    }
                                </Pane>
                            </Pane >
                        </Pane>
                    </Portal >
                </Pane >
                : <Alert intent="danger"
                    title="Error Display Data"
                >
                    Error fetching data from server, NFT data undefined
                </Alert>

            }

        </>
    )

}

export default Display;