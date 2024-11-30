import RemoveIcon from "@mui/icons-material/Remove";
import RedButton from "./RedButton";

const RemoveButton: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <RedButton className="rounded-full" onClick={onClick}>
      <RemoveIcon className="text-white" />
    </RedButton>
  );
};

export default RemoveButton;
