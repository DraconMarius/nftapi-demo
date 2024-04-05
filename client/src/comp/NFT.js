import React, { useState, useEffect } from 'react';

import {
    Pane,
    Card,
    Heading,
    Image,
    Paragraph,
    Strong,
    Table
} from 'evergreen-ui';

function Nft({ apiRes }) {
    console.log("test", apiRes)
    const network = Object.keys(apiRes)[0];
    console.log(network)


    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(249, 250, 252, 0.9)',
        zIndex: 0
    };

    const titleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px', // Adjust the height as needed
        background: 'rgba(249, 250, 252, 0.8)',
        borderTopLeftRadius: '5px', // Match your theme's border radius
        borderTopRightRadius: '5px',
    };

    // Style for the table background opacity
    const tableStyle = {
        backgroundColor: 'rgba(249, 250, 252, 0.4)',
    };

    return (
        <Pane display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
            background={`url('${apiRes[network].nft.collection.bannerImageUrl}')`}
            backgroundPosition="center"
            position="relative" >
            <div style={overlayStyle} /> {/* Overlay */}
            <Card
                elevation={4}
                padding={20}
                margin={20}
                display="flex"
                tint="2"
                flexDirection="column"
                alignItems="center"
                zIndex="1"
            >
                <Pane
                    width="100%"
                    height="auto"

                >
                    <Heading size={800}>
                        {apiRes[network].nft.name}
                    </Heading>
                    <Paragraph> -  {apiRes[network].nft.collection.name}</Paragraph>
                </Pane>

                <Image
                    src={apiRes[network].nft.image.cachedUrl}
                    alt={apiRes[network].nft.name}
                    marginTop={16}
                    width="50%"
                />
                <Pane width="100%" marginTop="16">
                    <Pane style={titleStyle}>
                        <Strong>NFT Metadata:</Strong>
                    </Pane>
                    <Table >
                        <Table.Body >
                            <Table.Row style={tableStyle}>
                                <Table.TextCell>Contract Address</Table.TextCell>
                                <Table.TextCell isSelectable>{apiRes[network].nft.contract.address}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle} >
                                <Table.TextCell>Token ID</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.tokenId}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell>Token Type</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.tokenType}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell style={tableStyle}>Last Updated:</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.timeLastUpdated}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell style={tableStyle}>Total Supply:</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.contract.totalSupply}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell style={tableStyle}>Network</Table.TextCell>
                                <Table.TextCell>{network}</Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Pane>
            </Card>
        </Pane>
    );
}


export default Nft;