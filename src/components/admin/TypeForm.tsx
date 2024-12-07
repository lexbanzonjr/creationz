import React, { useState } from "react";

import { Type } from "../../types/global";
import GreenButton from "../GreenButton";

interface TypeFormProps {
  types: Type[];

  addType: (type: Type) => Promise<Type>;
  deleteType: (type: Type) => void;
}

const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};

const TypeForm: React.FC<TypeFormProps> = (props) => {
  const [type, setType] = useState<Type>(blankType);

  const handleAddTypeBtnClick = () => {
    props.addType(type);
    setType(blankType);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setType((prev) => ({
        ...prev,
        name: value,
      }));
    }
  };

  return (
    <div>
      <h2 className="text-center text-black font-bold text-xl mb-5">
        Add type
      </h2>
      <small>
        Configure types to describe characteristic values that your customers
        will use when you add designs to your product.
        <br />
        For example: <br />
        Name: Shirt sizes
        <br />
        Options: small, medium, large <br />
        <br />
        Name: Shirt color <br />
        Options: red, blue, green, yellow, white <br />
        <br />
      </small>
      <form>
        <div>
          <label className="block my-2 font-bold text-[#34495e]">
            Name: <br />
            <small className="text-gray-500">Enter a name for the type</small>
            <input
              type="text"
              name="name"
              value={type.name}
              onChange={handleChange}
              className="w-full p-2.5 mb-4 border border-[#bdc3c7] rounded-md text-sm"
              required
            />
          </label>
          <GreenButton
            className="rounded-md"
            onClick={handleAddTypeBtnClick}
            type="button"
          >
            Add type
          </GreenButton>
        </div>
      </form>
    </div>
  );
};

export default TypeForm;
