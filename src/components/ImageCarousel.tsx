import React, { useState } from "react";
import ImagePreview from "./ImagePreview";
import { Binary } from "../types/global";

interface ImageCarouselProps {
  binaries: Binary[];
  className?: string;
  onImageDelete?: (binary: Binary) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  binaries,
  className,
  onImageDelete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!binaries.length) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? binaries.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === binaries.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <ImagePreview
        binary={binaries[currentIndex]}
        className={className}
        onImageDelete={onImageDelete}
      />
      {binaries.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
          >
            →
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {binaries.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
