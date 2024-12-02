import axios from "axios";
import { Type } from "../types/Type";
import { Option } from "../types/Option";

export const addType = async ({
  accessToken,
  type,
}: {
  accessToken: string;
  type: Type;
}) => {
  const response = await axios.post("https://localhost:5000/type", type, {
    headers: {
      Authorization: `Basic ${accessToken}`,
    },
  });

  return response.data;
};

export const addTypeOption = async ({
  accessToken,
  type,
  option,
}: {
  accessToken: string;
  type: Type;
  option: Option;
}) => {
  const response = await axios.post(
    `https://localhost:5000/type/${type._id}/option`,
    { option },
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const deleteType = async ({
  accessToken,
  type,
}: {
  accessToken: string;
  type: Type;
}) => {
  try {
    await axios.delete("https://localhost:5000/type", {
      params: { _id: type._id },
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    });
  } catch (error: any) {}
};

export const getTypes = async (props: { accessToken: string }) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/type", {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    });
    return response.data.types as Type[];
  } catch (err: any) {}
  return [];
};
