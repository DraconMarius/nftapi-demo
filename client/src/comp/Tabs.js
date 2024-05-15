import React, { useState, useEffect } from 'react';
import {
    Pane,
    Tablist,
    Tab,
    Button, CircleArrowRightIcon,
    CircleArrowLeftIcon,
    Badge,
    Pill,
    SearchIcon,
    Switch,
    Paragraph
} from 'evergreen-ui';


import Grid from './Grid';
import Gallery from './Gallery'
import Metadata from "./Metadata"
import { useSearch } from '../cont/searchContex';

function Tabs({ apiRes, type }) {
    // console.log(apiRes)
    //now storing prev/page Key in contex
    const { searchParams, updateSearchParams } = useSearch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [checked, setChecked] = useState(searchParams.spam);
    const [isGallery, setGallery] = useState(false)

    const networks = Object.keys(apiRes);
    // Calculate firstPage and lastPage based on current apiRes and searchParams
    const isFirstPage = (searchParams.prevKeys && (searchParams.prevKeys.length === 0) && !searchParams.currentKey);
    const isLastPage = network => !apiRes[network]?.pageKey;

    console.log(`first page:${isFirstPage}, last page:${isLastPage("Eth")}`)

    const address = searchParams.walletAdd || searchParams.contractAdd || searchParams.collectionAdd

    const etherscanURL = `https://etherscan.io/address/${address}`

    //pagekey logic is within searchContext, 
    const handlePageChange = (network, isNext) => {
        console.log(isNext, "isNext?")
        // console.log(network, "network")
        if (isNext) {
            // Move to the next page
            const nextPageKey = apiRes[network]?.pageKey;
            console.log("test page Key", nextPageKey)
            //if going to 2nd page, no prev key, nor current key
            if (nextPageKey) {
                console.log('going to 2nd page')
                updateSearchParams({
                    ...searchParams,
                    "network": network,
                    "pageKey": `${nextPageKey}`,
                    "currentKey": nextPageKey,
                    isPrevPage: false,
                    isNew: false
                });
                //
            }
        } else {
            console.log("prev")
            // Move to the previous page

            updateSearchParams({
                ...searchParams,
                "network": network,
                isPrevPage: true,
                isNew: false
            })


        }
    };

    const spamToggle = (e) => {
        //everytime spam checked toggle change
        setChecked(e)

        updateSearchParams({
            ...searchParams,
            spam: e
        })
    }



    return (
        <Pane display="flex" width="auto">

            {/* if type is wallet */}
            {(apiRes && ((type === "wallet") || (type === "walletP"))) ? (
                <Pane display="flex" width="100%" flexDirection="column">
                    {networks.map((network, index) => (
                        <Pane
                            key={network}
                            aria-labelledby={network}
                            aria-hidden={index !== selectedIndex}
                            display={index === selectedIndex ? 'block' : 'none'}
                        >
                            <Metadata
                                type={"wal"}
                                walletAdd={apiRes[network]?.walletAdd}
                                net={network}
                                validAt={apiRes[network]?.validAt}
                                totalCount={apiRes[network]?.totalCount}
                            />

                        </Pane>
                    ))}
                    <Pane display="flex">
                        <Tablist display="flex" flexDirection="column" marginRight={8} >
                            {networks.map((network, index) => (
                                <Tab
                                    key={network}
                                    id={network}
                                    onSelect={() => setSelectedIndex(index)}
                                    isSelected={index === selectedIndex}
                                    aria-controls={`panel-${network}`}
                                    marginBottom={8}
                                    marginTop={8}
                                    direction="vertical"
                                >
                                    <Pane display="flex" >

                                        <Badge color='blue'>{network}</Badge>
                                        <Pill color="yellow">
                                            ({apiRes[network].totalCount || " null "})
                                        </Pill>
                                    </Pane>
                                </Tab>
                            ))}
                        </Tablist>
                        <Pane padding={8} flex="1" background="rgba(249, 250, 252, 0.9)" marginBottom={16}>
                            {networks.map((network, index) => (

                                <Pane

                                    key={network}
                                    id={`panel-${network}`}
                                    role="tabpanel"

                                    aria-labelledby={network}
                                    aria-hidden={index !== selectedIndex}
                                    display={index === selectedIndex ? 'grid' : 'none'}

                                >
                                    <Pane display="flex" alignItems="center" justifyContent="center" >
                                        <Paragraph>
                                            Spam Protection:
                                        </Paragraph>
                                        <Switch checked={checked} onChange={(e) => spamToggle(e.target.checked)} padding={8} />
                                    </Pane>
                                    <Pane display="flex" alignItems="center" justifyContent="center" >
                                        <Paragraph>
                                            Gallery View?:
                                        </Paragraph>
                                        <Switch checked={isGallery} onChange={(e) => setGallery(e.target.checked)} padding={8} />
                                    </Pane>
                                    <Pane display="flex" justifyContent="space-between" alignItems="center" padding={8}>
                                        <Button
                                            iconBefore={CircleArrowLeftIcon}
                                            onClick={() => handlePageChange(network, false)}
                                            disabled={isFirstPage} // Disable the button on the first page
                                        >
                                            Prev
                                        </Button>
                                        <a href={etherscanURL}
                                        >

                                            <Button
                                                appearance='minimal'
                                                color="grey"
                                            >
                                                <SearchIcon />
                                                EtherScan
                                            </Button>
                                        </a>
                                        <Button
                                            iconAfter={CircleArrowRightIcon}
                                            onClick={() => handlePageChange(network, true)}
                                            disabled={isLastPage(network)} // Disable the button on the last page
                                        >
                                            Next
                                        </Button>
                                    </Pane>

                                    {!isGallery ? ( // if not gallery, iterate grid, if not send array to gallery
                                        < Pane
                                            className="gridDisplay"
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
                                        </Pane>) : (<Gallery images={apiRes[network]?.okNfts} net={network} />)}
                                </Pane>
                            ))}
                        </Pane>
                    </Pane></Pane>) : (apiRes && ((type === "collection") || (type === "collectionP"))) ?

                (
                    <Pane display="flex" width="100%" flexDirection="column" >
                        {networks.map((network, index) => (
                            <Metadata
                                key={index}
                                type={"col"}
                                net={network}
                                name={apiRes[network]?.okNfts[0]?.collection?.name || apiRes[network]?.contract?.name || apiRes[network]?.raw?.name}
                                symbol={apiRes[network]?.okNfts[0]?.contract?.symbol}
                                openSeaMetadata={(apiRes[network]?.okNfts[0]?.contract?.openSeaMetadata) || "null"}
                            />))}
                        <Pane display="flex" >
                            <Tablist display="flex" flexDirection="column" marginRight={8} >
                                {networks.map((network, index) => (
                                    <Tab
                                        key={network}
                                        id={network}
                                        onSelect={() => setSelectedIndex(index)}
                                        isSelected={index === selectedIndex}
                                        aria-controls={`panel-${network}`}
                                        marginBottom={8}
                                        marginTop={8}
                                        direction="vertical"
                                    >
                                        <Pane display="flex" >
                                            <Badge color='purple'>{network}</Badge>
                                            <Pill color="teal">
                                                {apiRes[network]?.okNfts[0]?.contract?.symbol}
                                            </Pill>
                                        </Pane>
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
                                        <Pane display="flex" alignItems="center" justifyContent="center" >
                                            <Paragraph>
                                                Gallery View?:
                                            </Paragraph>
                                            <Switch checked={isGallery} onChange={(e) => setGallery(e.target.checked)} padding={8} />
                                        </Pane>
                                        <Pane display="flex" justifyContent="space-between" padding={16}>
                                            <Button
                                                iconBefore={CircleArrowLeftIcon}
                                                onClick={() => handlePageChange(network, false)}
                                                disabled={isFirstPage} // Disable the button on the first page
                                            >
                                                Prev
                                            </Button>
                                            <a href={etherscanURL}
                                            >

                                                <Button
                                                    appearance='minimal'
                                                    color="grey"
                                                >
                                                    <SearchIcon />
                                                    EtherScan
                                                </Button>
                                            </a>
                                            <Button
                                                iconAfter={CircleArrowRightIcon}
                                                onClick={() => handlePageChange(network, true)}
                                                disabled={isLastPage(network)} // Disable the button on the last page
                                            >
                                                Next
                                            </Button>
                                        </Pane>
                                        {!isGallery ? ( // if not gallery, iterate grid, if not send array to gallery
                                            < Pane flex="1" justifyContent="center" display="grid"
                                                gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr)) "
                                                padding={8}
                                            >
                                                {apiRes[network]?.okNfts.map((item, itemIndex) => (
                                                    <Grid
                                                        key={itemIndex}
                                                        imageUrl={item.image.cachedUrl || item.image.thumbnailUrl || item.image.pngUrl || item.contract.openSeaMetadata.imageUrl || "https://placehold.co/200x200"}
                                                        fallbackUrl={item.contract.openSeaMetadata.imageUrl || "https://placehold.co/200x200"}
                                                        name={item.name || item.raw.metadata.name}
                                                        contractAdd={item.contract.address}
                                                        id={item.tokenId}
                                                        net={network} />
                                                ))}
                                            </Pane>) : (<Gallery images={apiRes[network]?.okNfts} net={network} />)}
                                    </Pane>
                                ))}
                            </Pane>
                        </Pane >
                    </Pane>) : <Pane />
            }
        </Pane >
    );
}

export default Tabs;