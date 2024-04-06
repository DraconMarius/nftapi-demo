import React, { useState, useEffect } from 'react';
import {
    Pane,
    Badge,
    Pill
} from 'evergreen-ui';

import Marquee from "react-fast-marquee"

function Metadata({ type, net, name, symbol, openSeaMetadata, validAt, totalCount }) {
    const openSeaExtra = openSeaMetadata ? Object.entries(openSeaMetadata) : null
    // console.log(openSeaExtra)

    return (
        <Pane>
            <Marquee>
                <Badge color='neutral'>Network:</Badge>
                <Badge color='purple' marginRight={16}>{net}</Badge>

                {type === "wal" && (
                    <>
                        <Badge color='blue'>Total Count:</Badge>
                        <Pill color="yellow" marginRight={16}>{totalCount}</Pill>
                        <Badge color="teal">Valid At: blockHash</Badge>
                        <Pill color="red" marginRight={16}>{validAt?.blockHash || null}</Pill>
                    </>
                )}

                {type === 'col' && (
                    <>
                        <Badge color='blue'>Name:</Badge>
                        <Pill color='yellow'>{name}</Pill>
                        <Pill color='yellow' marginRight={16}>{symbol}</Pill>

                        {openSeaExtra && openSeaExtra.map(([key, val], index) => (
                            <React.Fragment key={key}>
                                <Badge color='teal'>{key}:</Badge>
                                <Pill color='red' marginRight={16}>{val || 'N/A'}</Pill>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </Marquee>
        </Pane>
    );
}

export default Metadata;