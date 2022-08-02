import React from 'react';

const ImageContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4 md:gap-6 lg:gap-8">
      {children}
    </div>
  );
};

export default ImageContainer;
