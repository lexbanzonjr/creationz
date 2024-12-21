import axios from "axios";
import { Option, Type } from "../types/global";

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

  return response.data.type as Type;
};

export const addTypeOption = async (
  accessToken: string,
  type: Type,
  option: Option
) => {
  const response = await axios.post(
    `https://localhost:5000/type/${type._id}/option`,
    { option },
    {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    }
  );

  return response.data.option as Option;
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

export const getTypes = async (
  props: { accessToken: string; populate: boolean } = {
    accessToken: "",
    populate: false,
  }
) => {
  try {
    // API call to register the account
    const response = await axios.get("https://localhost:5000/type", {
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
      params: {
        populate: props.populate,
      },
    });
    return response.data.types as Type[];
  } catch (err: any) {}
  return [];
};
