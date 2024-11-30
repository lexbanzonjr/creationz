import EditIcon from "@mui/icons-material/Edit";
import GreenButton from "./GreenButton";

const EditButton: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <GreenButton className="rounded-full" onClick={onClick}>
      <EditIcon className="text-white " />
    </GreenButton>
  );
};

export default EditButton;
