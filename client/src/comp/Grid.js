import React, { useState, useEffect } from 'react';
import {
    Pane, Card, Tooltip,
} from 'evergreen-ui';
import { useSearch } from '../cont/searchContex';


function Grid({ imageUrl, fallbackUrl, name, contractAdd, net, id }) {
    const { updateSearchParams } = useSearch();
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
    useEffect(() => {
        setCurrentImageUrl(imageUrl); // This will trigger a re-render when imageUrl prop changes
    }, [imageUrl]);
    const handleImageError = () => {
        setCurrentImageUrl(fallbackUrl);
    };

    const handleClick = (contractAdd, net, id) => {
        console.log(id)
        updateSearchParams({
            "walletAdd": '',
            "collectionAdd": '',
            "contractAdd": contractAdd,
            "network": net,
            "tokenId": id,
            "pageKey": '',
            "prevKeys": []
        });
    };


    return (

        <Tooltip content={name}>
            <Card
                elevation={3}
                width={200}
                height={200}
                margin={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                position="relative"
                backgroundSize="cover"
                onClick={() => handleClick(contractAdd, net, id)}
            >
                <Pane width={200} height={200} overflow="hidden">
                    <img
                        src={currentImageUrl}
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={handleImageError} />
                </Pane>
            </Card>
        </Tooltip >
    );
}

export default Grid;