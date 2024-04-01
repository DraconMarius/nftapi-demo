import React from 'react';

import {
    Pane
} from 'evergreen-ui';

import Collections from '../comp/Collections';
import NFT from '../comp/NFT';
import Wallet from '../comp/Wallet';

function Display({ apiRes, type }) {
    // conditionally render based on type
    // console.log(apiRes)
    return (

        <>
            {apiRes ?

                <Pane>
                    {(type === "wallet") ?
                        <Wallet apiRes={apiRes} /> :
                        (type === "collection") ?
                            <Collections apiRes={apiRes} /> :

                            (type === "NFT") ?
                                <NFT apiRes={apiRes} /> :
                                <>Loading...</>
                    }
                </Pane> : <>loading</>
            }
        </>
    )

}

export default Display;