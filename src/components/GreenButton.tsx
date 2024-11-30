import { ReactNode } from "react";

const GreenButton: React.FC<{
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}> = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`block px-1 py-1 bg-green-500 text-white text-base cursor-pointer hover:bg-green-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default GreenButton;
