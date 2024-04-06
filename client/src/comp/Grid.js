import React, { useState, useEffect } from 'react';
import {
    Card, Tooltip,
} from 'evergreen-ui';
import { useSearch } from '../cont/searchContex';


function Grid({ imageUrl, fallbackUrl, name, contractAdd, net, id }) {
    const { setSearchParams, resetSearchParams } = useSearch();
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
    useEffect(() => {
        setCurrentImageUrl(imageUrl); // This will trigger a re-render when imageUrl prop changes
    }, [imageUrl]);
    const handleImageError = () => {
        setCurrentImageUrl(fallbackUrl);
    };

    const handleClick = (contractAdd, net, id) => {
        resetSearchParams();
        setSearchParams("network", net);
        setSearchParams("contractAdd", contractAdd)
        setSearchParams("tokenId", id)
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
                overflow="hidden"
                backgroundSize="cover"
                onClick={() => handleClick(contractAdd, net, id)}
            >
                <img
                    src={currentImageUrl}
                    alt={name}
                    style={{ width: '100%', height: 'auto' }}
                    onError={handleImageError} />
            </Card>
        </Tooltip>
    );
}

export default Grid;