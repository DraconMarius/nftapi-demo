import React, { useState, useEffect } from 'react';

import {
    Pane,
    Alert
} from 'evergreen-ui';

import Collections from './Collections';
import Wallet from './Wallet';
import Page from './Page'
import NFT from '../comp/NFT';

function Display({ apiRes, type }) {
    const [displayType, setType] = useState(type)

    useEffect(() => {
        if (!apiRes || !type) {
            setType('error');
        } else {
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
                                (displayType === "page") ?
                                    <Page apiRes={apiRes} type={type} /> :
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