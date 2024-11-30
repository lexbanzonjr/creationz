import RedButton from "./RedButton";
import RemoveIcon from "@mui/icons-material/Remove";

const RemoveButton: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <RedButton onClick={onClick}>
      <RemoveIcon
        style={{ color: "white" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#dc2626"; // Tailwind's red-600
          e.currentTarget.style.borderRadius = "50%"; // Ensures it stays circular on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ef4444"; // Tailwind's red-500
          e.currentTarget.style.borderRadius = "50%"; // Reapply to ensure consistent style
        }}
      />
    </RedButton>
  );
};

export default RemoveButton;
