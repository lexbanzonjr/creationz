import { Binary, Image } from "../types/global";
import { blankBinary } from "../types/blank";
import parseContentDisposition from "./utils/parseContentDisposition";
import { httpClient } from "../httpClient";

export const addBinary = async ({ binary }: { binary: Binary }) => {
  const formData = new FormData();
  formData.append("binary", binary.data!);

  const response = await httpClient.post("/binary", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.binary as Binary;
};

export const deleteBinary = async ({ binary }: { binary: Binary }) => {
  try {
    await httpClient.delete("/binary", {
      params: { _id: binary._id },
    });
  } catch (error: any) {}
};

export const getBinary = async ({ _id }: { _id: string }) => {
  const binary = { ...blankBinary };
  try {
    const response = await httpClient.get(`/binary/${_id}`, {
      responseType: "blob", // Ensure the response is a Blob
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

export const getImage = async ({ _id }: { _id: string }) => {
  const binary = await getBinary({
    _id,
  });

  return binary as Image;
};
