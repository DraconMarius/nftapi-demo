import React, { useState, useEffect } from 'react';
import '../assets/Grid.css'
import { Card, Paragraph } from 'evergreen-ui';


function Grid({ imageUrl, fallbackUrl, name }) {

    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
    useEffect(() => {
        setCurrentImageUrl(imageUrl); // This will trigger a re-render when imageUrl prop changes
    }, [imageUrl]);
    const handleImageError = () => {
        setCurrentImageUrl(fallbackUrl);
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
    );
}

export default Grid;