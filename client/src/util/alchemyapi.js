//fetch request that uses the alchemy-sdk in the backend

// fetch request for /nft/waller/address & /token/wallet/address

export const getNFTsForOwner = async (address) => {

    try {
        const response = await fetch(`/nft/wallet/${address}`);
        if (!response.ok) throw new Error('nft wallet fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch NFTs '${address}'`, err)
    }

}

export const getTokenBalnce = async (address) => {
    try {
        const response = await fetch(`/token/wallet/${address}`);
        if (!response.ok) throw new Error('token fetch error');

        const data = await response.json();

        return data;
    } catch (err) {
        console.error(`Failed to fetch token balance for '${address}'`, err)
    }


}



/**
 * 
 * @param {default = false, contract adress} contract 
 * @param {default = false, OpenSea slug} slug 
 * figure out if either contract or slug is provided, then use the provided input to fetch server API for result
 * 
 * https://docs.alchemy.com/reference/getnftsforcollection-v3
 * ^^ above example return error if both address and slug are both specified
 * hence additional logic to handle which route provided
 */
export const getNFTsForCollection = async (contractAdd = false, slug = false) => {

    

    switch (contractAdd, slug) {
        //case 1, if provided contractAdd, slug == false, default
        case (slug == false):
            try {
                const response = await fetch(`/nft/collection/${contractAdd}`);
                if (!response.ok) throw new Error('nft collection fetch response error');

                const data = await response.json();

                return data;
            } catch (err) {
                console.error(`Failed to fetch NFTs for Collection Address '${contractAdd}'`, err)
            }
            break;

        case (contractAdd === false):

            try {
                const response = await fetch(`/nft/collection/${slug}`);
                if (!response.ok) throw new Error('nft slug fetch response error');

                const data = await response.json();

                return data;
            } catch (err) {
                console.error(`Failed to fetch NFTs for Collection Slug named '${contractAdd}'`, err)
            }
            break;

        //probably will never pass both address and slug, handle if both a deault = false
        case ((contractAdd === false) && (slug === false)):

            Alert("No Contract Address nor Slug Name Provided")
            break;

        default:
            Alert("Please only provide either Contract Address or Slug Name, not both")
            break;
    };

    // if (slug == false){
    //     try (
    //         const response = await fetch(`/nft/collection/${contract}`)
    //     )catch (err) {
    //         console.error(`Failed to fetch NFT from contract $`)
    //     }
    // }
}
