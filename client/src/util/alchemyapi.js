//fetch request that uses alchemy in the backend



export const getNFTsForOwner = async (address, spam) => {
    console.log(spam, "spam?")
    if ((spam === false) || (spam === "false")) {
        console.log(`spam = false ${spam}`)
        try {
            const response = await fetch(`/api/nft/wallet/${address}/?spam=false`);
            if (!response.ok) throw new Error('nft wallet fetch error', response.error);

            const data = await response.json();

            return data;
        } catch (err) {
            console.error(`Failed to fetch NFTs '${address}'`, err)
        }
    } else if (!spam || (spam !== false) || (spam !== "false")) {
        console.log(`spam = true ${spam}`)
        try {
            const response = await fetch(`/api/nft/wallet/${address}`);
            if (!response.ok) throw new Error('nft wallet fetch error', response.error);

            const data = await response.json();

            return data;
        } catch (err) {
            console.error(`Failed to fetch NFTs '${address}'`, err)
        }
    }

}

export const getTokenBalance = async (address) => {
    try {
        const response = await fetch(`/api/token/wallet/${address}`);
        if (!response.ok) throw new Error('token fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}'`, err)
    }
}

export const getNFTsPage = async (net, address, pgKey) => {
    try {
        const response = await fetch(`/api/nft/wallet/${net}/${address}/page?pgKey=${pgKey}`);
        if (!response.ok) throw new Error('page fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}'`, err)
    }
}

export const getNFTsCollection = async (net, address, pageKey) => {
    const page = pageKey ? true : false
    const fetchURL = page ? `/api/nft/collection/${net}/${address}?pgKey=${pageKey}` :
        `/api/nft/collection/${net}/${address}`

    try {

        const response = await fetch(fetchURL)
        if (!response.ok) throw new Error('collection fetch error', `Page=${page}`);
        const data = await response.json();

        return data

    } catch (err) {
        console.error(`Failed to fetch NFT for ${address}, on ${net}`, err)
    }
}

export const getNFT = async (net, tokenId, address) => {
    try {
        const response = await fetch(`/api/nft/${net}/${tokenId}/${address}`)
        if (!response.ok) throw new Error('collection fetch error')
        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch NFT${address},id:${tokenId} on ${net}`, err)
    }
}