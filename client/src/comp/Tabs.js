import React, { useState, useEffect } from 'react';
import {
    Pane,
    Tablist,
    Tab
} from 'evergreen-ui';

import Grid from './Grid';
import Metadata from "./Metadata"

function Tabs({ apiRes, type }) {
    console.log(apiRes)


    //conditionally render chunk based on the response from server
    const [displayType, setType] = useState("wallet")
    useEffect(() => {
        // console.log(apiRes.Eth.totalCount)
        console.log(type)
        setType(type)
    }, [apiRes, type])

    // useEffect(() => {
    //     console.log(type)
    // }, [type])

    // console.log("eth:", apiRes.Eth.nfts.totalCount)
    const [selectedIndex, setSelectedIndex] = useState(0);

    const networks = Object.keys(apiRes);
    // console.log(networks)
    // console.log(apiRes.Eth.nfts.length)
    return (
        <Pane display="flex" width="100%">
            {/* if type is wallet */}
            {(apiRes && (displayType === "wallet")) ? (
                <Pane display="flex" width="100%">
                    <Tablist display="flex" flexDirection="column" marginRight={8}>
                        {networks.map((network, index) => (
                            <Tab
                                key={network}
                                id={network}
                                onSelect={() => setSelectedIndex(index)}
                                isSelected={index === selectedIndex}
                                aria-controls={`panel-${network}`}
                            >
                                {network} ({apiRes[network].totalCount || " null "})
                            </Tab>
                        ))}
                    </Tablist>
                    <Pane padding={8} flex="1">
                        {networks.map((network, index) => (
                            <Pane
                                key={network}
                                id={`panel-${network}`}
                                role="tabpanel"

                                aria-labelledby={network}
                                aria-hidden={index !== selectedIndex}
                                display={index === selectedIndex ? 'grid' : 'none'}
                            >
                                <Metadata
                                    type={"wal"}
                                    net={network}
                                    validAt={apiRes[network]?.validAt}
                                    totalCount={apiRes[network]?.totalCount}
                                />
                                <Pane flex="1" justifyContent="center" display="grid"
                                    gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
                                    padding={8}
                                >

                                    {apiRes[network]?.okNfts?.map((item, itemIndex) => {
                                        return (

                                            < Grid
                                                key={itemIndex}
                                                imageUrl={item.image.cachedUrl || item.image.thumbnailUrl || item.image.pngUrl}
                                                fallbackUrl={item.contract.openSeaMetadata.imageUrl || "https://placehold.co/200x200"}
                                                name={item.title || item.raw.metadata.name}
                                                contractAdd={item.contract.address}
                                                id={item.tokenId}
                                                net={network} />

                                        )
                                    })}
                                </Pane>
                            </Pane>
                        ))}
                    </Pane>
                </Pane>) : (apiRes && (type === "collection")) ?
                // {/* if type is collections */ }
                (
                    <Pane display="flex" width="100%">
                        <Tablist display="flex" flexDirection="column" marginRight={8}>
                            {networks.map((network, index) => (
                                <Tab
                                    key={network}
                                    id={network}
                                    onSelect={() => setSelectedIndex(index)}
                                    isSelected={index === selectedIndex}
                                    aria-controls={`panel-${network}`}
                                >
                                    {network} ({apiRes[network]?.okNfts[0]?.contract?.symbol})
                                </Tab>
                            ))}
                        </Tablist>
                        <Pane padding={8} flex="1">
                            {networks.map((network, index) => (
                                <Pane
                                    key={network}
                                    id={`panel-${network}`}
                                    role="tabpanel"
                                    aria-labelledby={network}
                                    aria-hidden={index !== selectedIndex}
                                    display={index === selectedIndex ? 'grid' : 'none'}
                                >
                                    <Metadata

                                        type={"col"}
                                        net={network}
                                        name={apiRes[network]?.okNfts[0]?.collection?.name || apiRes[network]?.contract?.name || apiRes[network]?.raw?.name}
                                        symbol={apiRes[network]?.okNfts[0]?.contract?.symbol}
                                        openSeaMetadata={(apiRes[network]?.okNfts[0]?.contract?.openSeaMetadata) || "null"}
                                    />
                                    <Pane flex="1" justifyContent="center" display="grid"
                                        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
                                        padding={8}
                                    >
                                        {apiRes[network]?.okNfts.map((item, itemIndex) => (
                                            <Grid
                                                key={itemIndex}
                                                imageUrl={item.image.cachedUrl || item.image.thumbnailUrl || item.image.pngUrl}
                                                fallbackUrl={item.contract.openSeaMetadata.imageUrl || "https://placehold.co/200x200"}
                                                name={item.name || item.raw.metadata.name}
                                                contractAdd={item.contract.address}
                                                id={item.tokenId}
                                                net={network} />

                                        ))}
                                    </Pane>
                                </Pane>
                            ))}
                        </Pane>
                    </Pane>) : <Pane />
            }
        </Pane>
    );
}

export default Tabs;