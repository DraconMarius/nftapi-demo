import React, { useState, useEffect } from 'react';

import {
    Pane,
    Alert
} from 'evergreen-ui';

import Collections from './Collections';
import Wallet from './Wallet';
import Tabs from '../comp/Tabs'
import NFT from '../comp/NFT';

function Display({ apiRes, type }) {
    const [displayType, setType] = useState(type)

    useEffect(() => {
        if (!apiRes || !type) {
            setType('error');
        } else {
            console.log('display', type)
            setType(type)
        }
    }, [apiRes, type]);
    return (

        <>
            {apiRes ?
                <Pane >
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