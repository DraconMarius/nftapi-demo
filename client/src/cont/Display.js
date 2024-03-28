import React, { useState, useEffect } from 'react';

import {
    Pane,
    Button,
    Overlay,
    Spinner,
    Position,
    Paragraph,
    ZoomOutIcon,
    ZoomInIcon,
    IconButton

} from 'evergreen-ui';

import Collections from '../comp/Collections';
import NFT from '../comp/NFT';
import Wallet from '../comp/Wallet';

function Display({ res, type }) {
    console.log("apiResponse:", res)

    return (
        <>
            <Pane>
                {type}
            </Pane>
        </>
    )

}

export default Display;