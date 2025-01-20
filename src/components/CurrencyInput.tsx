import React, { useState } from "react";

const CurrencyInput = ({ className }: { className?: string }) => {
  const [value, setValue] = useState("");

  const formatCurrency = (inputValue: string) => {
    // Check if input ends with a "." or has invalid multiple decimals
    if (inputValue === "" || inputValue === "$") return "";
    if (inputValue === ".") return "$0.";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatCurrency(rawValue);
    setValue(formattedValue);
  };

  const handleRef = (ref: HTMLInputElement | null) => {
    if (!ref) {
      return;
    }
    ref.onkeydown = (e) => {
      e.stopPropagation();
    };
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
        ref={handleRef}
        id="currencyInput"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="$0.00"
        className={`${className}`}
      />
    </div>
  );
};

export default CurrencyInput;
