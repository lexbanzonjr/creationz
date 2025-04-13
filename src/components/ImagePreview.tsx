import { useEffect, useState, useRef } from "react";
import { Image } from "../types/global";

const ImagePreview = ({
  image,
  className,
  id,
  onImageDelete: handleImageDelete,
}: {
  image: Image;
  className?: string;
  id?: string;
  onImageDelete?: (binary: Image) => void;
}) => {
  const [objectURL, setObjectURL] = useState<string | null>(null);
  const urlCache = useRef<Record<string, string>>({});

  useEffect(() => {
    if (image.data) {
      // Check if we already have a URL for this binary
      if (urlCache.current[image._id]) {
        setObjectURL(urlCache.current[image._id]);
        return;
      }

      // Create new URL if not cached
      const url = URL.createObjectURL(image.data);
      urlCache.current[image._id] = url;
      setObjectURL(url);

      // Capture the current value of the cache for cleanup
      const currentCache = urlCache.current;

      return () => {
        // Only revoke URL if it's not in the cache
        if (!currentCache[image._id]) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [image._id, image.data]);

  return objectURL ? (
    <div className="relative max-w-sm">
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
          onClick={() => handleImageDelete(image)}
        >
          X
        </button>
      )}
    </div>
  ) : null;
};

export default ImagePreview;
