const router = require("express").Router();
const { Alchemy } = require('alchemy-sdk');

// Configuration settings for each network
const configs = {
    Eth: {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: 'eth-mainnet',
    },
    Polygon: {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: 'polygon-mainnet'
    },
    Aritrum: {
        apiKey: process.env.ALCHEMY_API_KEY,
        network: "arbitrum-mainnet"
    },
    Optimism: {
        apiKey: process.env.ALCHEMY_API_KEY,
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

    const fetchNFTperNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        let options = {
            omitMetadata: true
        }
        try {
            // use interator version to get back all nfts with paging
            const nftsIterator = alchemy.nft.getNftsForOwnerIterator(address, options);
            let nfts = [];
            //for each page push to array
            for await (const item of nftsIterator) {
                nfts.push(item);
            }

            console.log(`completed ${net}`)
            console.log(`total item in ${net}, ${nfts.length}`)
            return { [net]: nfts };
        } catch (err) {
            console.error(`Failed to fetch NFT for ${net} network`)
            return { [net]: { error: `Failed to fetch NFT for ${net} network`, details: err.message } }
        };
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



// router.get('nft/collection:contractAdd?:slug?', async (req, res) => {
//     console.log('==============/NFT/collection==============')

//     const contractAdd = req.params.contractAdd
//     const slug = req.params.slug

//     const fetchNFTperNetwork = async (net, config, address) => {
//         const alchemy = new Alchemy(config);
//         try {
//             const nfts = await alchemy.nft.getNftsForOwner(address);
//             console.log(`completed ${net}`)
//             return { [net]: nfts };
//         } catch (err) {
//             console.error(`Failed to fetch NFT for ${net} network`)
//             return { [net]: { error: `Failed to fetch NFT for ${net} network`, details: err.message } }
//         };
//     };

//     // check to make sure that only 1 optional param is passed
//     //please see https://docs.alchemy.com/reference/getnftsforcollection-v3
//     //if both slug name and address is provided, return 400 error
//     if ((contractAdd && slug) || (!contractAdd) && (!slug)) {
//         return res.status(400).json({ err: 'Please provide only contract OR slug' })
//     }

//     try {
//         if (contractAdd) {
//             nfts = await alchemy.nft.get
//         }
//     }





// })

module.exports = router;