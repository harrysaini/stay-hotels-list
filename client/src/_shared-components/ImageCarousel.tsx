import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

interface Props {
  images: any[];
}

const ImageCarousel = (props: Props) => {

  const images = props.images.map((image, index) => {
    return (
    <Carousel.Item key={index}>
      <img
        className="img-fluid w-100 c-image"
        src={image.url}
        alt="Image"
      />
      </Carousel.Item>
    );
  })

  return (
    <Carousel interval={null}>
      {images}
    </Carousel>
  )
}

export default ImageCarousel;
