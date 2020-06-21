import React, { useState, useCallback } from "react"
import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"

export default function ImageGallery({ photos }: { photos: {
  src: string;
  width: number;
  height: number;
}[] }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const navButtonStyles = base => ({
    ...base,
    backgroundColor: 'white',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.18)',
    color: '#6B778C',
  
    '&:hover, &:active': {
      backgroundColor: 'white',
      color: '#091E42',
      opacity: 1,
    },
    '&:active': {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.14)',
      transform: 'scale(0.96)',
    },
  });

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal 
            onClose={closeLightbox}
            styles={{
              blanket: base => ({
                ...base,
                backgroundColor: 'rgba(255,255,255,0.85)',
              }),
            }}
          >
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({source: x.src}))}
              styles={{
                container: base => ({
                  ...base,
                  height: '100vh',
                }),
                view: base => ({
                  ...base,
                  alignItems: 'center',
                  display: 'flex ',
                  height: '100vh',
                  justifyContent: 'center',

                  '& > img': {
                    maxHeight: '100vh',
                  },
                }),
                navigationPrev: navButtonStyles,
                navigationNext: navButtonStyles,
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
