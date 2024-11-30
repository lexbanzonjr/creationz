import axios from "axios";
import { Type } from "../types/Type";

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
