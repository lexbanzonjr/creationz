import React, { useState } from "react";

const Dropdown = ({
  items,
  label,
  name,
  value,
  onValueChange,
}: {
  items: { key: string; value: string; text: string }[];
  label: string;
  name: string;
  value: () => string;
  onValueChange: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

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
        value={selectedValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const newvalue = event.target.value;
          setSelectedValue(newvalue);
          onValueChange(newvalue);
        }}
      >
        <option value="">None</option>
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
