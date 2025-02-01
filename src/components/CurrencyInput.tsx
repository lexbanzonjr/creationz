import React, { useState } from "react";

const CurrencyInput = ({
  name,
  value,
  onChange: handleChange,
}: {
  name?: string;
  value?: string;
  onChange?: (param: any) => void;
}) => {
  const [inputValue, setInputValue] = useState(value);

  const formatCurrency = (inputValue: string) => {
    // Check if input ends with a "." or has invalid multiple decimals
    if (inputValue === "" || inputValue === "$") {
      return "";
    }
    if (inputValue === ".") {
      return "$0.";
    }

    // Remove non-numeric characters except "."
    const numericValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Format integer part with commas
    const formattedInteger = parseInt(integerPart || "0", 10).toLocaleString();

    // Handle decimal part if it exists
    if (decimalPart === undefined) {
      return `$${formattedInteger}`;
    } else if (decimalPart.length === 0) {
      return `$${formattedInteger}.`; // Allow the user to type the decimal point
    } else {
      return `$${formattedInteger}.${decimalPart.slice(0, 2)}`; // Limit to 2 decimal places
    }
  };

  return (
    <div>
      <label
        htmlFor="currencyInput"
        className="block mr-4 font-bold text-[#34495e]"
      >
        Enter Amount:
      </label>
      <input
        name={name}
        ref={(ref: HTMLInputElement | null) => {
          if (!ref) {
            return;
          }
          ref.onkeydown = (e) => {
            e.stopPropagation();
          };
        }}
        id="currencyInput"
        type="text"
        value={formatCurrency(inputValue!)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value;
          const formattedValue = formatCurrency(rawValue);
          setInputValue(formattedValue);
          if (handleChange) {
            e.target.value = formattedValue;
            handleChange(e);
          }
        }}
        placeholder="$0.00"
        className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
      />
    </div>
  );
};

export default CurrencyInput;
