import React, { useState, useEffect } from 'react';
import { useSearch } from '../cont/searchContex'
import {
    Pane,
    Card,
    Heading,
    Image,
    Paragraph,
    Strong,
    Table,
    CircleArrowRightIcon,
    CircleArrowLeftIcon,
    Button
} from 'evergreen-ui';

function Nft({ apiRes }) {
    console.log("test", apiRes)
    const network = Object.keys(apiRes)[0];
    console.log(network)

    const { setSearchParams, resetSearchParams } = useSearch();
    const handleCollection = (collectionAdd, net) => {
        resetSearchParams();
        setSearchParams("network", net);
        setSearchParams("collectionAdd", collectionAdd)
    };

    const handleNext = (contractAdd, net, id) => {
        parseInt(id)
        console.log(id)
        const nextId = id++
        console.log(nextId)
        resetSearchParams();
        setSearchParams("network", net);
        setSearchParams("contractAdd", contractAdd)
        setSearchParams("tokenId", id)
    };

    const handlePrev = (contractAdd, net, id) => {
        parseInt(id)
        console.log(id)
        const nextId = id--
        console.log(nextId)
        resetSearchParams();
        setSearchParams("network", net);
        setSearchParams("contractAdd", contractAdd)
        setSearchParams("tokenId", id)
    };

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
            background={`url('${apiRes[network]?.nft?.collection?.bannerImageUrl || apiRes[network].nft.image.cachedUrl}')`}
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
                    <Paragraph> -  {apiRes[network]?.nft?.collection?.name || apiRes[network]?.nft?.name}</Paragraph>
                </Pane>

                <Image
                    src={apiRes[network].nft.image.cachedUrl}
                    alt={apiRes[network].nft.name}
                    marginTop={16}
                    width="50%"
                    elevation="4"
                />
                <Pane width="100%" marginTop="16">
                    <Pane style={titleStyle}>
                        <Strong>NFT Metadata:</Strong>
                    </Pane>
                    <Table >
                        <Table.Body >
                            <Table.Row style={tableStyle} onClick={() => handleCollection(apiRes[network].nft.contract.address, network)}>
                                <Table.TextCell>Contract Address</Table.TextCell>
                                <Table.TextCell isSelectable>
                                    <Button backgroundColor="rgba(249, 250, 252, 0.9)">
                                        {apiRes[network].nft.contract.address}
                                    </Button>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle} display="flex" alignContent="center">
                                <Table.TextCell>Token ID</Table.TextCell>
                                <Table.TextCell>
                                    <Button appearance="minimal">
                                        <CircleArrowLeftIcon onClick={() => handlePrev(apiRes[network].nft.contract.address, network, apiRes[network].nft.tokenId)} />
                                    </Button>
                                    <Strong>{apiRes[network].nft.tokenId}</Strong>
                                    <Button appearance="minimal">
                                        <CircleArrowRightIcon onClick={() => handleNext(apiRes[network].nft.contract.address, network, apiRes[network].nft.tokenId)} />
                                    </Button>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell>Token Type</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.tokenType}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell >Last Updated:</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.timeLastUpdated}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell >Total Supply:</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.contract.totalSupply}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle} >
                                <Table.TextCell >Network</Table.TextCell>
                                <Table.TextCell>{network}</Table.TextCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Pane>
            </Card >
        </Pane >
    );
}


export default Nft;