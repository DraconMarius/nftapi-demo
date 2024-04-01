import React, { useState, useEffect } from 'react';
import {
    Pane,
    Tablist,
    Tab,
    Paragraph,
    Card
} from 'evergreen-ui';

function Tabs({ apiRes }) {

    //conditionally render chunk based on the response from server
    const [type, setType] = useState("wallet")
    useEffect(() => {
        !apiRes.Eth.nfts.totalCount ? setType("collection") : setType("wallet")
    }, [apiRes])

    useEffect(() => {
        console.log(type)
    }, [apiRes])
    // console.log("eth:", apiRes.Eth.nfts.totalCount)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const networks = Object.keys(apiRes);
    console.log(networks)
    console.log(apiRes.Eth.nfts.length)
    return (
        <Pane display="flex" width="100%">
            {/* if type is wallet */}
            {(type === "wallet") ? (
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
                                {network} ({apiRes[network].nfts.totalCount})
                            </Tab>
                        ))}
                    </Tablist>
                    <Pane padding={16} flex="1">
                        {networks.map((network, index) => (
                            <Pane
                                key={network}
                                id={`panel-${network}`}
                                role="tabpanel"
                                aria-labelledby={network}
                                aria-hidden={index !== selectedIndex}
                                display={index === selectedIndex ? 'block' : 'none'}
                            >
                                <Paragraph display='flex'>Total: {apiRes[network]?.nfts?.totalCount || 0}</Paragraph>
                                {apiRes[network]?.nfts?.ownedNfts?.map((item, itemIndex) => (

                                    <img
                                        key={itemIndex}
                                        src={item.image.pngUrl}
                                        alt={item.title || 'NFT Image'}
                                        style={{ width: 100, height: 100, margin: 10 }}
                                    />
                                ))}
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
                                    {network} ({apiRes[network].nfts.length})
                                </Tab>
                            ))}
                        </Tablist>
                        <Pane padding={16} flex="1">
                            {networks.map((network, index) => (
                                <Pane
                                    key={network}
                                    id={`panel-${network}`}
                                    role="tabpanel"
                                    aria-labelledby={network}
                                    aria-hidden={index !== selectedIndex}
                                    display={index === selectedIndex ? 'block' : 'none'}
                                >
                                    <Paragraph display='flex'>Total: {apiRes[network].nfts.length || 0}</Paragraph>
                                    {apiRes[network]?.nfts.map((item, itemIndex) => (

                                        <img
                                            key={itemIndex}
                                            src={item.imageUrl}
                                            alt={item.name || 'NFT Image'}
                                            style={{ width: 100, height: 100, margin: 10 }}
                                        />
                                    ))}
                                </Pane>
                            ))}
                        </Pane>
                    </Pane>)
            }
        </Pane>
    );
}

export default Tabs;