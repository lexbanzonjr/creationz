import React, { useState, useEffect, useRef } from "react";

import { Category } from "../../types/global";
import GreenButton from "../GreenButton";
import RedButton from "../RedButton";
import TextInput from "../TextInput";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, description: string) => void;
  category?: Category; // Optional - if provided, we're editing; if not, we're adding
  title?: string; // Optional custom title
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  onConfirm,
  category,
  title,
}) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!category;
  const displayTitle =
    title || (isEditing ? "Edit Category" : "Add New Category");

  // Reset form when modal opens/closes or category changes
  useEffect(() => {
    if (isOpen) {
      // Populate form based on mode
      setName(category ? category.name : "");
      setDescription(category ? category.description : "");
      setHasChanges(false);

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
  }, [isOpen, category]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (name.trim() && (isEditing ? hasChanges : true)) {
      onConfirm(name.trim(), description.trim());
      // Form will be reset by the useEffect when modal closes
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
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
    const newName = e.target.value;
    setName(newName);
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
        className="bg-white rounded-lg p-6 w-96 max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">{displayTitle}</h2>

        <div className="space-y-4">
          <TextInput
            name="name"
            label="Category Name"
            required={true}
            value={name}
            onChange={handleNameChange}
            ref={nameInputRef}
          />

          <TextInput
            name="description"
            label="Description"
            required={false}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <RedButton onClick={handleCancel} className="px-4 py-2">
            Cancel
          </RedButton>
          <GreenButton
            onClick={handleConfirm}
            className="px-4 py-2"
            disabled={!name.trim() || (isEditing && !hasChanges)}
          >
            {isEditing ? "Save Changes" : "OK"}
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
