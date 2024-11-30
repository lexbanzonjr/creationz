import axios from "axios";
import { Type } from "../types/Type";

export const addType = async ({
  accessToken,
  type,
}: {
  accessToken: string;
  type: Type;
}) => {
  let addedType;
  try {
    const response = await axios.post("https://localhost:5000/type", type, {
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    });

    addedType = response.data.type as Type;
  } catch (error: any) {}

  return addedType;
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
