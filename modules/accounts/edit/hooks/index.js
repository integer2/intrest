import { useRef, useState, useMemo } from 'react';

export const useNewImage = () => {
  const newImageRef = useRef(null);
  const [newImage, setNewImage] = useState(null);

  return { newImageRef, setNewImage, newImage };
};
