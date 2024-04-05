import React, { useState, useEffect } from 'react';

import {
    Pane,
    Alert
} from 'evergreen-ui';

import Collections from './Collections';
import NFT from '../comp/NFT';
import Wallet from './Wallet';

function Display({ apiRes, type }) {
    const { displayType, setDisplay } = useState('default')

    useEffect(() => {
        if (apiRes === undefined) {
            type = 'error'
        }
    }, [apiRes])
    return (

        <>
            {apiRes ?
                <Pane>
                    {(type === "wallet") ?
                        <Wallet apiRes={apiRes} type={type} /> :
                        (type === "collection") ?
                            <Collections apiRes={apiRes} type={type} /> :
                            (type === "NFT") ?
                                <NFT apiRes={apiRes} type={type} /> :
                                (type === "error") ?
                                    <Alert intent="danger"
                                        title="Error Display Data"
                                    >
                                        Error displaying data
                                    </Alert> :
                                    <>LOADING...</>
                    }
                </Pane> : <>  <Alert intent="danger"
                    title="Error Display Data"
                >
                    Error fetching data from server, NFT data undefined
                </Alert> </>
            }
        </>
    )

}

export default Display;