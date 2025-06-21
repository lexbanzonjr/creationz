import React, { forwardRef } from "react";

const handleRef = (ref: HTMLInputElement | null) => {
  if (!ref) {
    return;
  }
  ref.onkeydown = (e) => {
    e.stopPropagation();
  };
};

interface TextInputProps {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, label, required, value, onChange }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="block mr-4 font-bold text-[#34495e]">
          {label}
        </label>
        <input
          className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
          id={name}
          name={name}
          ref={(inputRef) => {
            // Handle both the forwarded ref and the internal ref logic
            if (typeof ref === "function") {
              ref(inputRef);
            } else if (ref) {
              ref.current = inputRef;
            }
            handleRef(inputRef);
          }}
          required={required ? false : required}
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
