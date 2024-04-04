import React, { useState } from 'react';

import {
    Pane
} from 'evergreen-ui';

import Collections from '../comp/Collections';
import NFT from '../comp/NFT';
import Wallet from '../comp/Wallet';

function Display({ apiRes, type }) {
    // conditionally render based on type

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
                                <>LOADING...</>
                    }
                </Pane> : <>loading</>
            }
        </>
    )

}

export default Display;