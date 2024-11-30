import axios from "axios";
import { useState } from "react";

import TypeForm from "../../components/admin/TypeForm";
import TypeList from "../../components/admin/TypeList";
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
      <div className="type-form float-left w-[475px] h-[800px] mx-auto bg-white p-5 rounded-lg shadow-md">
        <TypeForm
          types={props.types}
          addType={handleAddType}
          deleteType={handleDeleteType}
        />
        <br />
        <TypeList types={props.types} deleteType={handleDeleteType} />
      </div>
      <div className="block w-[800px] h-[800px] mx-auto bg-white p-5 rounded-lg shadow-md ml-[500px]">
        <TypeProperties type={type} />
      </div>
    </div>
  );
};

export default TypePage;
