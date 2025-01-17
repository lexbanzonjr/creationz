import React, { useRef } from "react";

import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";
import GreenButton from "../GreenButton";

const CategoryForm = () => {
  const {
    activeCategory,
    addCategory,
    resetActiveCategory,
    setActiveCategory,
  } = useStore();
  const { getAccessToken } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddCategoryBtnClick = () => {
    addCategory(getAccessToken, activeCategory);
    resetActiveCategory();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setActiveCategory({
      ...activeCategory,
      [name]: value,
    });
  };

  return (
    <div>
      <div id="add-category">
        <h2 className="text-center text-black font-bold text-xl mb-5">
          Add Category
        </h2>
        <label className="block my-2 font-bold text-[#34495e]">
          Name: <br />
          <small className="text-gray-500">
            A category are used to group products together.
            <br />
            For example: t-shirts, sashes, headbands, bags
          </small>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            ref={inputRef}
            required
            className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm"
          />
        </label>
        <GreenButton
          className="rounded-md"
          onClick={handleAddCategoryBtnClick}
          type="button"
          disabled={inputRef.current ? inputRef.current.value === "" : true}
        >
          Add type
        </GreenButton>
      </div>
    </div>
  );
};

export default CategoryForm;
