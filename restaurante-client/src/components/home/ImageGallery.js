import ImageGallery from 'react-image-gallery';

import React from "react";

class ImageGalleryComponent extends React.Component {

  render() {

    const images = [
      {
        original: 'http://www.realdetroitweekly.com/wp-content/uploads/2017/06/Restaurants.jpg',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'https://static.pexels.com/photos/239975/pexels-photo-239975.jpeg',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'https://www.wien.info/media/images/41993-das-loft-sofitel-19to1.jpeg',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ];

    return (
        <div style={{height:"300px"}}>
      <ImageGallery items={images} showBullets={false} 
      lazyLoad={true} showThumbnails={false} 
      showPlayButton={false} autoPlay={true}
      showNav={false} showFullscreenButton={false}/></div>
    );
  }

}

export default ImageGalleryComponent;