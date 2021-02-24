import { useState, useCallback } from 'react'

import ReactCrop from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css";

function CropImage({ image, handleCrop, imgRef })
{
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });

  const onLoad = useCallback((img) =>
  {
    imgRef.current = img;
  }, []);

  return (

    <ReactCrop
      src={image}
      crop={crop}
      onChange={c => setCrop(c)}
      onComplete={c => handleCrop(c)}
      onImageLoaded={onLoad}
      crossorigin="Anonymous"
    />

  );
}

export default CropImage;