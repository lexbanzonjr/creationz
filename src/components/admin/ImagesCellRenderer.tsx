import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useAuthStore } from "../../hooks/useAuthStore";
import useStore from "../../hooks/useAdminStore";
import { Binary } from "../../types/global";

interface RowData {
  product?: any;
  expanded: boolean;
}

interface ImagesCellRendererProps {
  data: RowData;
}

const ImagesCellRenderer: React.FC<ImagesCellRendererProps> = ({ data }) => {
  const { token } = useAuthStore();
  const { getBinary } = useStore();

  const [images, setImages] = useState<Binary[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const [isHovered, setIsHovered] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const cellRef = useRef<HTMLDivElement>(null);

  const currentProduct = data.product!;

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: Binary[] = [];
      const urls: Record<string, string> = {};

      for (const id of currentProduct.image_id) {
        const binary = await getBinary(id);
        loadedImages.push(binary);

        // Create object URL for File data
        if (binary.data) {
          const url = URL.createObjectURL(binary.data);
          urls[binary._id] = url;
        }
      }

      setImages(loadedImages);
      setImageUrls(urls);
    };

    if (currentProduct.image_id.length > 0) {
      loadImages();
    }

    // Cleanup function to revoke object URLs
    return () => {
      Object.values(imageUrls).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [currentProduct.image_id, getBinary, token, imageUrls]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Calculate popup position based on mouse position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom + 10; // 10px below the cell

    setPopupPosition({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        ref={cellRef}
        className="p-1 relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="text-blue-600 hover:text-blue-800">
          {currentProduct.image_id.length} image
          {currentProduct.image_id.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Hover popup with images - rendered via portal */}
      {isHovered &&
        images.length > 0 &&
        createPortal(
          <div
            className="fixed z-[9999] bg-white border border-gray-300 rounded-lg shadow-xl p-4 min-w-[300px] max-w-[500px]"
            style={{
              top: popupPosition.y,
              left: popupPosition.x,
              transform: "translateX(-50%)",
              maxHeight: "400px",
              overflowY: "auto",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-sm font-medium text-gray-700 mb-3 border-b pb-2">
              {currentProduct.name} - Images ({images.length})
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div key={image._id} className="relative">
                  {imageUrls[image._id] ? (
                    <img
                      src={imageUrls[image._id]}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded border hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-24 bg-gray-200 rounded border flex items-center justify-center text-gray-500 text-xs">
                      Loading...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ImagesCellRenderer;
