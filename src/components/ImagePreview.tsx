import { useEffect, useState, useRef } from "react";
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
  const urlCache = useRef<Record<string, string>>({});

  useEffect(() => {
    if (binary.data) {
      // Check if we already have a URL for this binary
      if (urlCache.current[binary._id]) {
        setObjectURL(urlCache.current[binary._id]);
        return;
      }

      // Create new URL if not cached
      const url = URL.createObjectURL(binary.data);
      urlCache.current[binary._id] = url;
      setObjectURL(url);

      return () => {
        // Only revoke URL if it's not in the cache
        if (!urlCache.current[binary._id]) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [binary._id, binary.data]);

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
          onClick={() => handleImageDelete(binary)}
        >
          X
        </button>
      )}
    </div>
  ) : null;
};

export default ImagePreview;
