import { useState } from "react";

import TypeForm from "../../components/admin/TypeForm";
import TypeList from "../../components/admin/TypeList";
import TypeProperties from "../../components/admin/TypeProperties";
import { useAuth } from "../../context/AuthContext";
import { addType, addTypeOption, deleteType } from "../../api/typeApi";
import useStore from "../../hooks/useAdminStore";
import { Option, Type } from "../../types/global";

export type IHandleAddTypeOption = (option: Option) => Promise<void>;

const blankType: Type = {
  _id: "",
  name: "",
  options: [],
};

const TypePage = () => {
  const { getAccessToken } = useAuth();
  const [type, setType] = useState<Type>(blankType);
  const { types, setTypes } = useStore();

  const handleAddType = async (type: Type) => {
    const newType = (await addType({ accessToken: getAccessToken, type })).type;
    setTypes([...types, newType]);
    setType(type);
    return type;
  };

  const handleAddTypeOption: IHandleAddTypeOption = async (option: Option) => {
    const newOption = await addTypeOption({
      accessToken: getAccessToken,
      type,
      option,
    });
    const copyType = type;
    copyType.options.push(newOption);
    setType(copyType);
  };

  const handleDeleteType = async (type: Type) => {
    deleteType({ accessToken: getAccessToken, type });
    setTypes(types.filter((prod) => prod._id !== type._id));
  };

  return (
    <div>
      <div className="type-form float-left w-[475px] h-[800px] mx-auto bg-white p-5 rounded-lg shadow-md ">
        <TypeForm
          types={types}
          addType={handleAddType}
          deleteType={handleDeleteType}
        />
        <br />
        <TypeList
          types={types}
          deleteType={handleDeleteType}
          setType={setType}
        />
      </div>
      <div className="block w-[800px] h-[800px] mx-auto bg-white p-5 rounded-lg shadow-md ml-[500px]">
        <TypeProperties addTypeOption={handleAddTypeOption} type={type} />
      </div>
    </div>
  );
};

export default TypePage;
