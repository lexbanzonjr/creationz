import { useState } from "react";
import GreenButton from "../../components/GreenButton";
import { Category } from "../../types/global";

const CategoryDetailFrame = ({
  category,
  updateCategory,
}: {
  category: Category;
  updateCategory: (category: any) => void;
}) => {
  const [changed, setChanged] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(category.description);
  const [name, setName] = useState<string>(category.name);

  const handleChange = (param: any) => {
    const targetName = param.target.name;
    const value = param.target.value;
    if (targetName === "name") {
      setName(value);
    }
    if (targetName === "description") {
      setDescription(value);
    }
    setChanged(true);
  };

  const handleClick = () => {
    updateCategory({
      name,
      description,
    });
    setChanged(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <label className="block mr-4 font-bold text-[#34495e]">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
          required
        />
        <br />
      </div>
      <div className="flex items-center justify-center my-4">
        <label className="block mr-4 font-bold text-[#34495e]">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
          className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
          required
        />
        <br />
      </div>

      <GreenButton
        className="rounded-md"
        type="button"
        onClick={handleClick}
        disabled={!changed}
      >
        Save changes
      </GreenButton>
    </div>
  );
};

export default CategoryDetailFrame;
