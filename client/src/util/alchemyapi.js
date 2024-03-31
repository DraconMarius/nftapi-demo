//fetch request that uses alchemy in the backend



export const getNFTsForOwner = async (address) => {

    try {
        const response = await fetch(`/api/nft/wallet/${address}`);
        if (!response.ok) throw new Error('nft wallet fetch error', response.error);

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch NFTs '${address}'`, err)
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
        const response = await fetch(`/api/nft/wallet/${net}/${address}/${pgKey}`);
        if (!response.ok) throw new Error('page fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}'`, err)
    }
}

export const getNFTsCollection = async (net, address) => {
    try {
        const response = await fetch(`/api/nft/collection/${net}?contractAdd=${address}`)

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch NFT for ${address}, on ${net}`, err)
    }
}

// export const getNFT = async (net, address) => {
//     try {
//         const response = await fetch(`/api/nft/${net}`)
//     }
// }