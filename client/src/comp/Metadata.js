import React from 'react';
import {
    Pane,
    Badge,
    Pill
} from 'evergreen-ui';

import Marquee from "react-fast-marquee"

function Metadata({ type, net, name, symbol, openSeaMetadata, validAt, totalCount, walletAdd }) {
    const openSeaExtra = openSeaMetadata ? Object.entries(openSeaMetadata) : null
    // console.log(openSeaExtra)
    // console.log(walletAdd)


    return (
        <Pane width="100%" flex={1}>
            <Marquee
                pauseOnHover={true}
                gradient={true}
                gradientColor='248,251,253'
                gradientWidth={200}
            >
                <Badge color='neutral'>Network:</Badge>
                <Badge color='purple' marginRight={16}>{net}</Badge>

                {type === "wal" && (
                    <>
                        <Badge colo='green'>walletAddress:</Badge>
                        <Pill color='orange' marginRight={16}>{walletAdd}</Pill>
                        <Badge color='blue'>totalCount:</Badge>
                        <Pill color="yellow" marginRight={16}>{totalCount}</Pill>
                        <Badge color="teal">blockHash:</Badge>
                        <Pill color="red" marginRight={16}>{validAt?.blockHash || null}</Pill>
                    </>
                )}

                {type === 'col' && (
                    <>
                        <Badge color='blue'>Name:</Badge>
                        <Pill color='yellow'>{name}</Pill>
                        <Pill color='yellow' marginRight={16}>{symbol}</Pill>

                        {openSeaExtra && openSeaExtra.map(([key, val], index) => (
                            <React.Fragment key={index} >
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