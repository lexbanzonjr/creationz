import { ReactNode } from "react";

const GreenButton: React.FC<{
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}> = ({
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`block px-1 py-1 bg-green-500 text-white text-base cursor-pointer hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default GreenButton;
