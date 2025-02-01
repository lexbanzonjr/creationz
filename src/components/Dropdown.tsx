import React from "react";

const Dropdown = ({
  items,
  label,
  name,
}: {
  items: { key: string; value: string; text: string }[];
  label: string;
  name: string;
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mr-4 font-bold text-[#34495e]">
        {label}
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        id={name}
        ref={(ref: HTMLSelectElement | null) => {
          if (!ref) {
            return;
          }
          ref.onkeydown = (e) => {
            e.stopPropagation();
          };
        }}
        value={""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const value = event.target.value;
          console.log("Selected value:", value); // Log the selected value
        }}
      >
        <option disabled value="">
          Select an option
        </option>
        {items.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
