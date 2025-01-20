import { useEffect, useState } from "react";

const ImagePreview = ({
  file,
  className,
  handleImageDelete,
}: {
  file: File;
  className?: string;
  handleImageDelete: (file: File) => void;
}) => {
  const [objectURL, setObjectURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);

      return () => {
        // Clean up when the component unmounts
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  return objectURL ? (
    <div className="relative  max-w-sm">
      <img
        src={objectURL}
        alt="Preview"
        className={`rounded shadow ${className}`}
      />
      <button
        onClick={() => handleImageDelete(file)}
        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        X
      </button>
    </div>
  ) : null;
};

export default ImagePreview;
