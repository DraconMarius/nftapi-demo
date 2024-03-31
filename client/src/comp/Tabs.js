import React, { useState } from 'react';
import {
    Pane,
    Tablist,
    Tab,
    Paragraph
} from 'evergreen-ui';

function Tabs({ apiRes }) {
    // console.log(apiRes)
    console.log("eth:", apiRes.Eth.nfts.totalCount)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const networks = Object.keys(apiRes);
    // console.log(networks)

    return (
        <Pane display="flex" width="100%">
            <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
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
                        <Paragraph>Total: {apiRes[network].nfts.totalCount}</Paragraph>
                        {apiRes[network].nfts.ownedNfts.map((item, itemIndex) => (
                            <img key={itemIndex} src={item.image.pngUrl} alt={item.title || 'NFT Image'}
                                style={{ width: 100, height: 100, margin: 10 }} />
                        ))}
                    </Pane>
                ))}
            </Pane>
        </Pane>
    );
}

export default Tabs;