import React, { useState, useEffect } from 'react';
import {
    Pane,
    Tablist,
    Tab,
    Paragraph,
} from 'evergreen-ui';

import Grid from './Grid';

function Tabs({ apiRes, type }) {
    // console.log(apiRes)


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
    console.log(networks)
    // console.log(apiRes.Eth.nfts.length)
    return (
        <Pane display="flex" width="100%">
            {/* if type is wallet */}
            {(displayType === "wallet") ? (
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
                                {network} ({apiRes[network].totalCount || "null"})
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
                                <Paragraph  >Total: {apiRes[network]?.totalCount || " null"}</Paragraph>
                                <Pane flex="1" justifyContent="center" display="grid"
                                    gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
                                    padding={8}
                                >

                                    {apiRes[network]?.okNfts?.map((item, itemIndex) => {
                                        return (

                                            < Grid
                                                key={itemIndex}
                                                imageUrl={item.image.cachedUrl}
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
                </Pane>) :
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
                                    <Paragraph >Collection: {apiRes[network]?.okNfts[0]?.collection?.name || "null"}</Paragraph>
                                    <Pane flex="1" justifyContent="center" display="grid"
                                        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
                                        padding={8}
                                    >
                                        {apiRes[network]?.okNfts.map((item, itemIndex) => (
                                            <Grid
                                                key={itemIndex}
                                                imageUrl={item.image.cachedUrl || item.image.pngUrl}
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
                    </Pane>)
            }
        </Pane>
    );
}

export default Tabs;