const router = require("express").Router();
const { Alchemy, Network, NftFilters } = require('alchemy-sdk');
const axios = require('axios')

const Key = process.env.ALCHEMY_API_KEY

// Configuration settings for each network
//**
//Polygon's setting using sdk is listed as Network.POLYGONZKEVM_MAINNET
//using it causes an 400 error 
//                     400: Specified chain [POLYGONZEVM] not supported
// and POLYGON_MAINNET does not exists within Network. but string works: `polygon-mainnet`
const configs = {
    Eth: {
        apiKey: Key,
        network: Network.ETH_MAINNET
    },
    Polygon: {
        apiKey: Key,
        network: 'polygon-mainnet'
    },
    Arbitrum: {
        apiKey: Key,
        network: Network.ARB_MAINNET
    },
    Optimism: {
        apiKey: Key,
        network: Network.OPT_MAINNET
    },

    Base: {
        apiKey: Key,
        network: Network.BASE_MAINNET
    }
};


// api/nft/0xe785E82358879F061BC3dcAC6f0444462D4b5330
router.get('/nft/:net/:id/:address', async (req, res) => {
    console.log('==============/NFT==============')
    const net = req.params.net
    const tokenId = req.params.id
    const address = req.params.address;
    // console.log(net)

    const config = configs[net]

    const alchemy = new Alchemy(config)

    try {
        const nft = await alchemy.nft.getNftMetadata(address, tokenId)

        console.log(`Retrieved: ${nft.contract.name}`)
        const finalRes = {
            [net]: {
                nft
            }
        }

        res.json(finalRes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };

})

//testing


// api/balance/wallet/0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE
router.get('/balance/wallet/:address', async (req, res) => {
    console.log('==============/Token/wallet==============')
    const address = req.params.address

    const fetchTokenNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        try {

            const balances = await alchemy.core.getTokensForOwner(address)

            // console.log(balances)
            // Remove tokens with zero balance, loop thru to get meta data and render it human-readable
            //(https://docs.alchemy.com/docs/how-to-get-all-tokens-owned-by-an-address)
            const nonZeroBalances = balances.tokens.filter((token) => {
                const isNonZero = BigInt(token.rawBalance) > 0n;

                if (!isNonZero) {
                    console.log("Filtered out zero balance:", token.name);
                }
                console.log("has balance", token.name);
                return isNonZero
            });
            console.log(nonZeroBalances)
            let res = nonZeroBalances.map(token => {
                // Convert balance to a human-readable format considering the token's decimals
                let balance = Number(token.rawBalance) / Math.pow(10, token.decimals);
                balance = balance.toFixed(3); // Keep two decimal places
                return `${token.name}: ${balance} ${token.symbol}`;
            });

            return {
                [net]: res
            }
        } catch (err) {
            console.error(`Failed to fetch Balance for ${net} network`);
            return { [net]: { error: `Failed to fetch Balance for ${net} network`, details: err.message } };
        }
    };
    try {
        const results = await Promise.all(
            //await results from fetch per network
            Object.entries(configs).map(([net, config]) =>
                fetchTokenNetwork(net, config, address)
            )
        );
        // Combine the results into a single array
        const combinedResults = results.reduce((net, result) => ({ ...net, ...result }), {});
        console.log(combinedResults)
        res.json(combinedResults);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

// /api/nft/wallet/Eth/0xe785E82358879F061BC3dcAC6f0444462D4b5330/page?pgKey=``
router.get('/nft/wallet/:net/:address/page', async (req, res) => {
    console.log('==============/NFT/page==============')
    const address = req.params.address
    const net = req.params.net
    const pgKey = req.query.pgKey
    console.log(pgKey)
    const config = configs[net]


    const pageNFT = async (config, address, pgKey) => {

        const alchemy = new Alchemy(config);
        let options = {
            pageKey: pgKey,
            excludeFilters: [NftFilters.SPAM],
            pageSize: 30
        }

        try {
            const nfts = await alchemy.nft.getNftsForOwner(address, options)
            console.log(`completed ${net}, totalCount: ${nfts.totalCount}`);
            const okNfts = nfts.ownedNfts.filter(nft => {
                return nft.image && typeof nft.image.cachedUrl === 'string' && nft.image.cachedUrl.startsWith('http');
            });
            //returning an object for each network, including res, pulled out totalCount and pageKey for easier access
            return {
                [net]: {
                    okNfts,
                    "totalCount": okNfts.totalCount,
                    "pageKey": okNfts.pageKey || "end of page",
                    "validAt": okNfts.validAt,
                    "walletAdd": address
                }
            };
        } catch (err) {
            console.error(`Failed to fetch next page for ${net} network`, err);
            return { [net]: { error: `Failed to fetch next page for ${net} network`, details: err.message } };
        }
    }
    try {
        const result = await pageNFT(config, address, pgKey);

        // Check if an error was returned and respond accordingly
        if (result.error) {
            console.error('Error fetching NFT:', result.details);
            return res.status(500).json(result.details); // Send back the structured error
        }

        console.log('Result:', result);
        res.json(result); // Send success response
    } catch (err) {
        console.error('Unexpected error:', err);
        // Respond with generic error message if not already sent
        if (!res.headersSent) {
            res.status(500).json({
                error: true,
                message: 'An unexpected error occurred.',
                details: err.message
            });
        }
    }

});

//get all nft owned by an address
//
router.get('/nft/wallet/:address', async (req, res) => {
    console.log('==============/NFT/wallet==============')
    const address = req.params.address

    // const fetchNFTperNetwork = async (net, config, address) => {
    //     const alchemy = new Alchemy(config);
    //     let options = {
    //         omitMetadata: true
    //     }
    //     try {
    //         // use interator version to get back all nfts with paging
    //         const nftsIterator = alchemy.nft.getNftsForOwnerIterator(address, options);
    //         let nfts = [];
    //         //for each entry push to array
    //         for await (const item of nftsIterator) {
    //             nfts.push(item);
    //         }

    //         console.log(`completed ${net}`)
    //         console.log(`total item in ${net}, ${nfts.length}`)
    //         return { [net]: nfts };
    //     } catch (err) {
    //         console.error(`Failed to fetch NFT for ${net} network`)
    //         return { [net]: { error: `Failed to fetch NFT for ${net} network`, details: err.message } }
    //     };
    // };

    //spam filter 
    // { excludeFilters: [NftFilters.SPAM] }

    const fetchNFTperNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        // console.log(config);
        let options = {
            excludeFilters: [NftFilters.SPAM],
            pageSize: 30
        }
        try {
            const nfts = await alchemy.nft.getNftsForOwner(address, options);
            console.log(`completed ${net}, totalCount: ${nfts.totalCount}`);
            // console.log(`${net}, pageKey: ${nfts.pageKey}`)
            //returning an object for each network, including res, pulled out totalCount and pageKey for easier access
            const okNfts = nfts.ownedNfts.filter(nft => {
                return nft.image && typeof nft.image.cachedUrl === 'string' && nft.image.cachedUrl.startsWith('http');
            });
            return {
                [net]: {
                    okNfts,
                    "totalCount": nfts.totalCount,
                    "pageKey": nfts.pageKey,
                    "validAt": nfts.validAt,
                    "walletAdd": address
                }
            };
        } catch (err) {
            console.error(`Failed to fetch NFT for ${net} network`);
            return { [net]: { error: `Failed to fetch NFT for ${net} network`, details: err.message } };
        }
    };

    try {
        const results = await Promise.all(
            //await results from fetch per network
            Object.entries(configs).map(([net, config]) =>
                fetchNFTperNetwork(net, config, address)
            )
        );
        // Combine the results into a single array
        const combinedResults = results.reduce((net, result) => ({ ...net, ...result }), {});

        res.json(combinedResults);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


//get NFT given contract address or slug name
router.get('/nft/collection/:net/', async (req, res) => {
    console.log('==============/NFT/collection==============')
    console.log(` network selcted: ${req.params.net}  `)

    //use query param to pass thru
    // api/nft/collection/eth?contractAdd=x&slug=y

    const input = {
        contractAdd: req.query.contractAdd,
        pageKey: req.query.pageKey,
        slug: req.query.slug
    }
    console.log(input)

    const fetchNFTCollection = async (net, configs, input) => {
        //using the network param passed to decide which setting to use
        const config = { ...configs[net] }
        console.log(config)

        // let finalInput = input.contractAdd ?
        //     `contractAddress=${input.contractAdd}` :
        //     `collectionSlug=${input.slug}`;

        let finalInput = `contractAddress=${input.contractAdd}`;
        let pgKey = input.pageKey ? `&startToken=${input.pageKey}` : ''

        //sdk doesn't support slug name? using axios to fetch the collection endpoint which support slug names
        const options = {
            method: 'GET',
            url: `https://${config.network}.g.alchemy.com/nft/v3/${Key}/getNFTsForContract?` +
                `${finalInput}` + `&withMetadata=true` + `${pgKey}&limit=30`,
            headers: { accept: 'application/json' }
        };

        try {
            console.log('url', options.url)
            const nfts = await axios.request(options);
            // console.log(nfts.data.nfts[0].image)
            console.log(`completed ${net}`)
            console.log(`got item in Collection - ${finalInput}, ${nfts.data.nfts.length}`)
            const okNfts = nfts.data.nfts.filter(nft => {
                return nft.image && typeof nft.image.cachedUrl === 'string' && nft.image.cachedUrl.startsWith('http');
            });
            // console.log(okNfts)
            return {
                [net]: {
                    okNfts,
                    pageKey: nfts.data.pageKey
                }
            }
        } catch (err) {
            console.error(`Failed to fetch NFT for ${finalInput} for ${net} network`, err)
            return { error: `Failed to fetch NFT for ${net} network`, details: err.message }
        };
    };
    //check to make sure that only 1 optional param is passed
    //please see https://docs.alchemy.com/reference/getnftsforcollection-v3
    //if both slug name and address is provided, return 400 error
    if ((input.contractAdd && input.slug) || (!input.contractAdd) && (!input.slug)) {
        return res.status(400).json({ err: 'Please provide only contract OR slug' })
    }
    try {
        const results = await fetchNFTCollection(req.params.net, configs, input)


        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };

})



module.exports = router;