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



router.get('/nft/', async (req, res) => {
    res.json("test")
})


router.get('/nft/wallet/:address', async (req, res) => {
    console.log('==============/api/wallet==============')
    const address = req.params.address

    const fetchNFTperNetwork = async (net, config, address) => {
        const alchemy = new Alchemy(config);
        try {
            const nfts = await alchemy.nft.getNftsForOwner(address);
            console.log(`completed ${net}`)
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


module.exports = router;