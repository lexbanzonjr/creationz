import axios from "axios";
import { Option, Type } from "../types/global";

export const addType = async ({
  token,
  type,
}: {
  token: string;
  type: Type;
}) => {
  const response = await axios.post("https://localhost:5000/type", type, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return response.data.type as Type;
};

export const addTypeOption = async (
  token: string,
  type: Type,
  option: Option
) => {
  const response = await axios.post(
    `https://localhost:5000/type/${type._id}/option`,
    { option },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  return response.data.option as Option;
};

export const deleteType = async ({
  token,
  type,
}: {
  token: string;
  type: Type;
}) => {
  try {
    await axios.delete("https://localhost:5000/type", {
      params: { _id: type._id },
      headers: {
        Authorization: `Basic ${token}`,
      },
    });
  } catch (error: any) {}
};

export const getTypes = async (
  props: { token: string; populate: boolean } = {
    token: "",
    populate: false,
  }
) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/type", {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
      params: {
        populate: props.populate,
      },
    });
    return response.data.types as Type[];
  } catch (err: any) {}
  return [];
};
