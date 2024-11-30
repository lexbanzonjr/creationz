import axios from "axios";
import { useState } from "react";

import TypeForm from "../../components/admin/TypeForm";
import TypeProperties from "../../components/admin/TypeProperties";
import { useAuth } from "../../context/AuthContext";
import { Type } from "../../types/Type";

interface TypePageProps {
  types: Type[];
  setTypes: React.Dispatch<React.SetStateAction<Type[]>>;
}

const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};

const TypePage: React.FC<TypePageProps> = (props) => {
  const { getAccessToken } = useAuth();
  const [type, setType] = useState<Type>(blankType);

  const handleAddType = async (type: Type) => {
    try {
      await axios.post("https://localhost:5000/type", type, {
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    props.setTypes((prevTypes) => [...prevTypes, type]);
    setType(type);
    return type;
  };

  const handleDeleteType = async (type: Type) => {
    try {
      await axios.delete("https://localhost:5000/type", {
        params: { _id: type._id },
        headers: {
          Authorization: `Basic ${getAccessToken}`,
        },
      });
    } catch (error: any) {
      if (error.response.status !== 200)
        alert(
          "Status code: " +
            error.response.status +
            ". " +
            error.response.data.error
        );
    }

    props.setTypes((prevTypes) =>
      prevTypes.filter((prod) => prod._id !== type._id)
    );
  };

  return (
    <div>
      <TypeForm
        types={props.types}
        addType={handleAddType}
        deleteType={handleDeleteType}
      />
      <TypeProperties type={type} />
    </div>
  );
};

export default TypePage;
