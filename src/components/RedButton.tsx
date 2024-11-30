import { ReactNode } from "react";

const RedButton: React.FC<{
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}> = ({ children, type = "button", onClick }) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#ef4444", // Tailwind's red-500
    border: "none",
    borderRadius: "50%", // Rounded-full equivalent
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white", // text-white
    fontSize: "16px", // text-base
    transition: "background-color 300ms ease-in-out", // Tailwind's transition duration-300 ease-in-out
  };

  return (
    <button
      type={type}
      onClick={onClick}
      // ag grid cellrender doesn't support tailwind css
      className="w-[25px] h-[25px] bg-red-500 hover:bg-red-600 border-none rounded-full flex items-center justify-center cursor-pointer text-white text-base transition duration-300 ease-in-out"
      // inline css for ag grid
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#dc2626"; // Tailwind's red-600
        e.currentTarget.style.borderRadius = "50%"; // Ensures it stays circular on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#ef4444"; // Tailwind's red-500
        e.currentTarget.style.borderRadius = "50%"; // Reapply to ensure consistent style
      }}
    >
      {children}
    </button>
  );
};

export default RedButton;
