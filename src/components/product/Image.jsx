import { useState } from "react";

const Image = (props) => {
  const [isValidURL, setIsValidURL] = useState(true);

  const handleImageURLError = () => {
    setIsValidURL(false);
  }

  return isValidURL ?
      <img {...props} onError={handleImageURLError} />
      : 
      <img {...props} src={'/assets/products/placeholder.jpg'} />
}

export default Image;