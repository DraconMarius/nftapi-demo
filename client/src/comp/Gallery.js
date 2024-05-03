import React, { useState } from 'react';
import {
    Pane,
    Button,
    majorScale,
    Strong,
    CircleArrowLeftIcon,
    CircleArrowRightIcon,
    Tooltip,
    Position
} from 'evergreen-ui';
import { useSearch } from '../cont/searchContex';

function Gallery({ images, net }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { updateSearchParams } = useSearch();

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
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
                    <Tooltip
                        position={Position.TOP}
                        key={index}
                        content={img.name || img.raw.metadata.name}
                    >
                        <img
                            key={index}
                            src={img.image.cachedUrl || img.image.thumbnailUrl || img.contract.openSeaMetadata.imageUrl || "https://placehold.co/200x200"}
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
                            onClick={() => handleClick(img.contract.address, net, img.tokenId)}
                        />
                    </Tooltip>
                );
            })}



            <Pane display="flex" position="absolute" bottom={majorScale(1)}>
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