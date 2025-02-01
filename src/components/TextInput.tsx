import React from "react";

const handleRef = (ref: HTMLInputElement | null) => {
  if (!ref) {
    return;
  }
  ref.onkeydown = (e) => {
    e.stopPropagation();
  };
};

const TextInput = ({
  name,
  label,
  required,
  value,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mr-4 font-bold text-[#34495e]">
        {label}
      </label>
      <input
        className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
        id={name}
        name={name}
        ref={handleRef}
        required={required ? false : required}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
