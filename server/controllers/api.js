const router = require("express").Router();
const { Alchemy } = require('alchemy-sdk');
const axios = require('axios')

const Key = process.env.ALCHEMY_API_KEY

// Configuration settings for each network
const configs = {
    Eth: {
        apiKey: Key,
        network: 'eth-mainnet',
    },
    Polygon: {
        apiKey: Key,
        network: 'polygon-mainnet'
    },
    Aritrum: {
        apiKey: Key,
        network: "arbitrum-mainnet"
    },
    Optimism: {
        apiKey: Key,
        network: "optimism-mainnet"
    }
};


// // testing
// router.get('/testing/:address', async (req, res) => {
//     console.log('===test===')
//     const address = req.params.address;

//     const config = {
//         apiKey: process.env.ALCHEMY_API_KEY,
//         network: 'eth-mainnet'
//     }

//     const alchemy = new Alchemy(config)

//     let options = {
//         omitMetadata: true
//     }

//     for await (const nft of alchemy.nft.getNftsForOwnerIterator(address)) {
//         console.log('ownedNft:', nft);
//     }
// })

// //testing

router.get('/balance/wallet/:address', async (req, res) => {
    console.log('==============/Token/wallet==============')
    const address = req.params.address

    const fetchTokenNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        try {
            const balance = await alchemy.core.getTokensForOwner(address);
            console.log(`completed ${net}`)
            return { [net]: balance };
        } catch (err) {
            console.error(`Failed to fetch Balance for ${net} network`)
            return { [net]: { error: `Failed to fetch Balance for ${net} network`, details: err.message } }
        };
    };

    try {
        const results = await Promise.all(
            //await result from each network
            Object.entries(configs).map(([net, config]) =>
                fetchTokenNetwork(net, config, address)
            )
        )
        // Combine the results into a single array
        const combinedResults = results.reduce((acc, result) => ({ ...acc, ...result }), {});
        res.json([combinedResults]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})


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

    const fetchNFTperNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        console.log(config);
        try {
            const nfts = await alchemy.nft.getNftsForOwner(address);
            console.log(`completed ${net}, totalCount: ${nfts.totalCount}`);
            //returning an object for each network, including res, pulled out totalCount and pageKey for easier access
            return {
                [net]: {
                    nfts,
                    "totalCount": nfts.totalCount,
                    "pageKey": nfts.pageKey
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
        const combinedResults = results.reduce((acc, result) => ({ ...acc, ...result }), {});

        res.json([combinedResults]);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});



router.get('/nft/collection/:net', async (req, res) => {
    console.log('==============/NFT/collection==============')
    console.log(` network selcted: ${req.params.net}  `)

    //use query param to pass thru
    // api/nft/collection/eth?contractAdd=x&slug=y

    const input = {
        contractAdd: req.query.contractAdd,
        slug: req.query.slug
    }
    console.log(input)

    const fetchNFTCollection = async (net, configs, input) => {
        //using the network param passed to decide which setting to use
        const config = { ...configs[net] }
        console.log(config)

        let finalInput = input.contractAdd ?
            `contractAddress=${input.contractAdd}` :
            `collectionSlug=${input.slug}`;

        //sdk doesn't support slug name? using axios to fetch the collection endpoint which support slug names
        const options = {
            method: 'GET',
            url: `https://${config.network}.g.alchemy.com/nft/v3/${Key}/getNFTsForContract?` +
                `${finalInput}` + `&withMetadata=true`,
            headers: { accept: 'application/json' }
        };

        try {
            console.log('url', options.url)
            const nfts = await axios.request(options);
            console.log(`completed ${net}`)
            console.log(`total item in Collection - ${finalInput}, ${nfts.data.nfts.length}`)
            return { ...nfts.data }
        } catch (err) {
            console.error(`Failed to fetch NFT for ${finalInput} for ${net} network`)
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