import { ReactNode } from "react";

const GreenButton: React.FC<{
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}> = ({ children, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="block w-full px-4 py-2 bg-green-500 text-white border-none rounded-md text-base cursor-pointer hover:bg-green-600"
    >
      {children}
    </button>
  );
};

export default GreenButton;
