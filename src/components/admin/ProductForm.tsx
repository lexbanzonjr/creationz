import React, { useState, useEffect, useRef } from "react";
import TextInput from "../TextInput";
import GreenButton from "../GreenButton";
import RedButton from "../RedButton";
import CurrencyInput from "../CurrencyInput";
import ImageListEditor, { ImageListEditorHandle } from "../ImageListEditor";
import { Product, Binary, Category } from "../../types/global";
import useStore from "../../hooks/useAdminStore";
import { useAuthStore } from "../../hooks/useAuthStore";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  product?: Product; // Optional - if provided, we're editing; if not, we're adding
  title?: string; // Optional custom title
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  title,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("0.00");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<Binary[]>([]);

  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<ImageListEditorHandle>(null);

  const { categories, addBinary, deleteBinary, getBinary } = useStore();
  const { token } = useAuthStore();

  const isEditing = !!product;
  const displayTitle =
    title || (isEditing ? "Edit Product" : "Add New Product");

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);

      // Populate form based on mode      setName(product ? product.name : "");
      setDescription(product ? product.description : "");
      setCost(product ? String(product.cost) : "0.00");
      setSelectedCategories(product ? product.categories : []);
      setHasChanges(false);

      if (product) {
        // Load existing images for editing mode
        const loadImages = async () => {
          const loadedImages: Binary[] = [];

          // Filter out undefined, null, or empty image IDs before making API calls
          const validImageIds = product.image_id.filter(
            (id) => id && id.trim() !== ""
          );
          for (const id of validImageIds) {
            loadedImages.push(await getBinary(id));
          }
          setImages(loadedImages);
          setIsLoading(false);
        };
        loadImages();
      } else {
        // Clear images for adding mode
        setImages([]);
        setIsLoading(false);
      }

      // Focus on name input when modal opens
      setTimeout(() => nameInputRef.current?.focus(), 100);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore body scroll
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, product, getBinary, token]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    onClose();
  };
  const handleCategoryToggle = (category: Category) => {
    const isSelected = selectedCategories.some(
      (cat) => cat._id === category._id
    );
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat._id !== category._id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setHasChanges(true);
  };
  const handleConfirm = async () => {
    if (name.trim() && (isEditing ? hasChanges : true)) {
      // Create the product object
      const productData: Partial<Product> = {
        name: name.trim(),
        description: description.trim(),
        cost: Number(cost),
        categories: selectedCategories,
        image_id: [],
      };

      if (isEditing && product) {
        // For editing, include the existing _id
        productData._id = product._id;
        productData.image_id = [...product.image_id];
      }

      // Handle image changes if editing
      if (imageRef.current) {
        const imageChanges = imageRef.current.getImages?.();

        // Delete removed images
        for (const binary of imageChanges!.remove_images) {
          await deleteBinary(binary);
          productData.image_id = productData.image_id!.filter(
            (id) => id !== binary._id
          );
        }

        // Add new images
        for (const binary of imageChanges!.new_images) {
          const newBinary = await addBinary(binary);
          productData.image_id!.push(newBinary._id);
        }
      }

      onConfirm(productData as Product);
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCost = Number(
      Number(e.target.value.replace(/[^0-9.]/g, "")).toFixed(2)
    );
    setCost(String(newCost));
    setHasChanges(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setHasChanges(true);
  };

  const handleImagesChange = () => {
    setHasChanges(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim() && (isEditing ? hasChanges : true)) {
      handleConfirm();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-lg p-6 w-[600px] max-w-[90vw] max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">{displayTitle}</h2>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            <TextInput
              name="name"
              label="Product Name"
              required={true}
              value={name}
              onChange={handleNameChange}
              ref={nameInputRef}
            />

            <div>
              <label className="block mr-4 font-bold text-[#34495e] mb-2">
                Categories
              </label>
              <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
                {categories.map((category) => {
                  const isSelected = selectedCategories.some(
                    (cat) => cat._id === category._id
                  );
                  return (
                    <div
                      key={category._id}
                      className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                        isSelected ? "bg-blue-100 border border-blue-300" : ""
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-3"
                      />
                      <span
                        className={
                          isSelected ? "font-semibold text-blue-700" : ""
                        }
                      >
                        {category.name}
                      </span>
                    </div>
                  );
                })}
                {categories.length === 0 && (
                  <div className="text-gray-500 p-2">
                    No categories available
                  </div>
                )}
              </div>
            </div>

            <TextInput
              name="description"
              label="Description"
              required={false}
              value={description}
              onChange={handleDescriptionChange}
            />

            <CurrencyInput
              name="cost"
              value={cost}
              onChange={handleCostChange}
            />

            <div>
              <label className="block mr-4 font-bold text-[#34495e] mb-2">
                Images
              </label>
              <ImageListEditor
                images={images}
                ref={imageRef}
                onChange={handleImagesChange}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <RedButton onClick={handleCancel} className="px-4 py-2">
            Cancel
          </RedButton>
          <GreenButton
            onClick={handleConfirm}
            className="px-4 py-2"
            disabled={!name.trim() || (isEditing && !hasChanges) || isLoading}
          >
            {isEditing ? "Save Changes" : "OK"}
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
