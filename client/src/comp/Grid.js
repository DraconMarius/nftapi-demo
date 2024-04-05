import React, { useState, useEffect } from 'react';
import '../assets/Grid.css'
import { Card, Paragraph, Tooltip, Strong } from 'evergreen-ui';
import { useSearch } from '../cont/searchContex'

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


            <Card
                elevation={1}
                width={200}
                height={200}
                margin={12}
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
                <Paragraph
                    size={300}
                    position="absolute"
                    bottom={0}
                    width="100%"
                    textAlign="center"
                    background="rgba(0, 0, 0, 0.7)"
                    color="white"
                    paddingY={8}
                    style={{ display: 'none', transition: '0.3s' }}
                    className="card-text"
                >
                    {name}
                </Paragraph>
            </Card>
        </Tooltip>
    );
}

export default Grid;