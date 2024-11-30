import { ReactNode } from "react";

const RedButton: React.FC<{
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}> = ({ children, className = "", type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`block px-1 py-1 bg-red-500 text-white text-base cursor-pointer hover:bg-red-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default RedButton;
