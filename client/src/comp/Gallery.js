import React, { useState } from 'react';
import { Pane, Button, majorScale, Strong, CircleArrowLeftIcon, CircleArrowRightIcon } from 'evergreen-ui';

function Gallery({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <Pane position="relative" width="100%" height="500px" overflow="hidden" display="flex" alignItems="center" justifyContent="center">

            {images.map((img, index) => {
                const offsetIndex = (index - currentIndex + images.length) % images.length;
                const isCenter = offsetIndex === 0;
                const distance = Math.min(offsetIndex, images.length - offsetIndex);
                const scale = isCenter ? 1 : 0.8 - 0.05 * distance;
                const opacity = isCenter ? 1 : 0.6 - 0.1 * distance;
                const zIndex = isCenter ? 100 : 100 - distance;

                // Calculate position for symmetry
                const positionOffset = (index - currentIndex) * 15; // Adjust this to change the spacing between images

                return (
                    <img
                        key={index}
                        src={img.image.cachedUrl || img.image.thumbnailUrl || img.image.pngUrl}
                        alt={`NFT Display ${index + 1}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            transition: 'all 0.5s ease',
                            transform: `translateX(${positionOffset}%) scale(${Math.max(scale, 0.4)})`,
                            position: 'absolute',
                            opacity: Math.max(opacity, 0.2),
                            zIndex
                        }}
                    />
                );
            })}

            <Pane display="flex" position="absolute" bottom={majorScale(2)}>
                <Button onClick={prevImage} disabled={images.length <= 1}>
                    <CircleArrowLeftIcon />
                </Button>
                <Strong margin={8}>
                    {currentIndex + 1} of {images.length}
                </Strong>
                <Button onClick={nextImage} disabled={images.length <= 1}>
                    <CircleArrowRightIcon />
                </Button>
            </Pane>
        </Pane>
    );
}

export default Gallery;