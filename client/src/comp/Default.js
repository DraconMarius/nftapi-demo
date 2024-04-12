import React from 'react';
import { Pane, Card, Heading, Paragraph, Image, Button } from 'evergreen-ui';

import tour from '../assets/tour.gif'
import page from '../assets/page.gif'
import nft from '../assets/NFT.gif'


const Default = () => {

    const items = [
        {
            title: 'Need Some help to get started?',
            description: 'please press the info icon on your top right',
            gif: tour
        },
        {
            title: 'What is this?',
            description: 'A demo utilizing Alchemy\'s NFT Api SDK and endpoints to query and explore NFTs in a wallet or collectionsn in different networks with ease',
            gif: page
        },
        {
            title: 'This demo currently supports the following endpoints: \n ',
            description: `getNFTsForOwner, getNFTsForContract, getNftMetadata \n `,
            link: 'https://docs.alchemy.com/reference/nft-api-endpoints',
            gif: nft
        }
    ];

    return (
        <Pane display="flex" flexDirection="column" alignItems="center" padding={16}>
            {items.map((item, index) => (
                <Card
                    key={index}
                    backgroundColor="rgba(249, 250, 252, 0.9)"
                    elevation={1}
                    hoverElevation={2}
                    activeElevation={3}
                    margin={24}
                    padding={16}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width='100%'
                >
                    <Heading size={600}>{item.title}</Heading>
                    <Paragraph size={400} textAlign="center" marginBottom={16}>
                        {item.description}
                    </Paragraph>
                    {item.link ?

                        < Paragraph size={400} textAlign="center" marginBottom={16}>
                            For more information, please refer the Alchey Documentation
                            <a src={item.link} >
                                <Button alignItems='center' appearance="minimal" color="blue" marginBottom={1}>
                                    Here
                                </Button>
                            </a>
                        </Paragraph>
                        : <></>}

                    <Image src={item.gif} alt={item.title} maxWidth="100%" />
                </Card>
            ))
            }
        </Pane >
    );
};

export default Default;