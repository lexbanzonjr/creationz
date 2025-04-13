import axios from "axios";
import { Binary, Image } from "../types/global";
import { blankBinary } from "../types/blank";
import parseContentDisposition from "./utils/parseContentDisposition";

export const addBinary = async ({
  accessToken,
  binary,
}: {
  accessToken: string;
  binary: Binary;
}) => {
  const formData = new FormData();
  formData.append("binary", binary.data!);

  const response = await axios.post("https://localhost:5000/binary", formData, {
    headers: {
      Authorization: `Basic ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.binary as Binary;
};

export const deleteBinary = async ({
  accessToken,
  binary,
}: {
  accessToken: string;
  binary: Binary;
}) => {
  try {
    await axios.delete("https://localhost:5000/binary", {
      params: { _id: binary._id },
      headers: {
        Authorization: `Basic ${accessToken}`,
      },
    });
  } catch (error: any) {}
};

export const getBinary = async ({
  accessToken,
  _id,
}: {
  accessToken?: string;
  _id: string;
}) => {
  const binary = { ...blankBinary };
  try {
    const response = await axios.get(`https://localhost:5000/binary/${_id}`, {
      responseType: "blob", // Ensure the response is a Blob
      headers: !accessToken
        ? {}
        : {
            Authorization: `Basic ${accessToken}`,
          },
    });

    const contentDisposition: Record<string, string> = parseContentDisposition(
      response.headers["content-disposition"]
    );

    // Setup binary object
    binary._id = contentDisposition["id"];
    binary["content-type"] = response.headers[
      "content-type"
    ]?.toString() as string;
    binary.name = contentDisposition["filename"];
    binary.data = new File([response.data], binary.name, {
      type: binary["content-type"],
    });
  } catch (error: any) {}
  return binary;
};

export const getImage = async ({
  accessToken,
  _id,
}: {
  accessToken?: string;
  _id: string;
}) => {
  const binary = await getBinary({
    accessToken,
    _id,
  });

  return binary as Image;
};
