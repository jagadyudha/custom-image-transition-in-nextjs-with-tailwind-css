import React, { useState } from "react";
import NextImage from "next/image";

const Image = ({ src, ...props }) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      objectFit="cover"
      src={src}
      className={`bg-gray-400 transition duration-1000 ${
        isReady ? "blur-0 scale-100" : "blur-2xl scale-120"
      }`}
      {...props}
      onLoadingComplete={onLoadCallback}
      layout="responsive"
    />
  );
};

export default Image;
