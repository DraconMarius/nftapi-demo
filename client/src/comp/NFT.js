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
        setSearchParams({
            "collectionAdd": collectionAdd,
            "network": net,
        });
    };

    const handleNext = (contractAdd, net, id) => {
        parseInt(id)
        console.log(id)
        const nextId = parseInt(id) + 1
        console.log(nextId)
        setSearchParams({
            "contractAdd": contractAdd,
            "network": net,
            "tokenId": nextId
        });
    };

    const handlePrev = (contractAdd, net, id) => {
        parseInt(id)
        console.log(id)
        const prevId = parseInt(id) - 1
        console.log(prevId)
        setSearchParams({
            "contractAdd": contractAdd,
            "network": net,
            "tokenId": prevId
        })
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
        height: '48px',
        background: 'rgba(249, 250, 252, 0.8)',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    };

    // Style for the table background opacity
    const tableStyle = {
        backgroundColor: 'rgba(249, 250, 252, 0.4)',
    };


    return (
        <Pane display="flex"
            justifyContent="center"

            background={`url('${apiRes[network]?.nft?.collection?.bannerImageUrl || apiRes[network].nft.image.cachedUrl}')`}
            backgroundPosition="center"
            position="relative" >
            <Pane style={overlayStyle} /> {/* Overlay */}
            <Card
                elevation={4}
                padding={16}
                margin={24}
                width="100%"
                maxWidth={960}
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
                    <Strong size={800}>
                        {apiRes[network]?.nft?.name}
                    </Strong>
                    <Paragraph> -  {apiRes[network]?.nft?.collection?.name || apiRes[network]?.nft?.name}</Paragraph>
                </Pane>
                <Pane>
                    <Image
                        src={apiRes[network].nft.image.cachedUrl}
                        alt={apiRes[network].nft.name}
                        marginTop={16}
                        marginBottom={16}
                        width={600}
                    />
                </Pane>
                <Pane width="100%" marginTop="32">
                    <Pane style={titleStyle} >
                        <Strong>NFT Metadata:</Strong>
                    </Pane>
                    <Table  >
                        <Table.Body >
                            <Table.Row style={tableStyle} onClick={() => handleCollection(apiRes[network].nft.contract.address, network)}>
                                <Table.TextCell>Contract Address</Table.TextCell>
                                <Table.TextCell isSelectable>
                                    <Button backgroundColor="rgba(249, 250, 252, 0.9)">
                                        {apiRes[network].nft.contract.address}
                                    </Button>
                                </Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle} >
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
                            <Table.Row style={tableStyle} height="auto" display="flex">
                                <Table.TextCell>Description</Table.TextCell>
                                <Table.TextCell textProps={{
                                    whiteSpace: 'unset',
                                    maxWidth: 'auto',
                                    overflow: "auto",
                                }}><Pane display="flex" >{apiRes[network].nft.description || apiRes[network].nft.contract.openSeaMetadata.description}</Pane></Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell>Token Type</Table.TextCell>
                                <Table.TextCell >{apiRes[network].nft.tokenType}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell >Last Updated:</Table.TextCell>
                                <Table.TextCell >{apiRes[network].nft.timeLastUpdated}</Table.TextCell>
                            </Table.Row>
                            <Table.Row style={tableStyle}>
                                <Table.TextCell >Total Supply:</Table.TextCell>
                                <Table.TextCell>{apiRes[network].nft.contract.totalSupply || null}</Table.TextCell>
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