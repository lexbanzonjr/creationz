import { useEffect, useState } from "react";
import { Binary } from "../types/global";

const ImagePreview = ({
  binary,
  className,
  id,
  onImageDelete: handleImageDelete,
}: {
  binary: Binary;
  className?: string;
  id?: string;
  onImageDelete?: (binary: Binary) => void;
}) => {
  const [objectURL, setObjectURL] = useState<string | null>(null);

  useEffect(() => {
    if (binary.data) {
      const url = URL.createObjectURL(binary.data);
      setObjectURL(url);
      return () => {
        // Clean up when the component unmounts
        URL.revokeObjectURL(url);
      };
    }
  }, [binary.data]);

  return objectURL ? (
    <div className="relative  max-w-sm">
      <img
        alt="Preview"
        className={`rounded shadow ${className}`}
        id={id}
        src={objectURL}
      />
      {handleImageDelete && (
        <button
          className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          id={id}
          ref={(ref: HTMLButtonElement | null) => {
            if (!ref) {
              return;
            }
            ref.onkeydown = (e) => {
              e.stopPropagation();
            };
          }}
          onClick={() => handleImageDelete(binary)}
        >
          X
        </button>
      )}
    </div>
  ) : null;
};

export default ImagePreview;
