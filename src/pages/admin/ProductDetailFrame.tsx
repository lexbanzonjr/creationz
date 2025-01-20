import { useState } from "react";
import GreenButton from "../../components/GreenButton";
import { Product } from "../../types/global";
import ImagePreview from "../../components/ImagePreview";
import CurrencyInput from "../../components/CurrencyInput";

const ProductDetailFrame = ({
  product,
  updateProduct,
}: {
  product: Product;
  updateProduct: (product: any) => void;
}) => {
  const [state, setState] = useState<{
    changed: boolean;
    description: string;
    name: string;
    image_file: File[];
  }>({
    changed: false,
    description: product.description,
    name: product.name,
    image_file: [],
  });

  const handleChange = (param: any) => {
    const targetName = param.target.name;
    const value = param.target.value;
    if (targetName === "name") {
      setState((prevState) => ({
        ...prevState,
        changed: true,
        name: value,
      }));
    } else if (targetName === "description") {
      setState((prevState) => ({
        ...prevState,
        changed: true,
        description: value,
      }));
    } else if (targetName === "file" && param.target.files[0]!) {
      const files = param.target.files;
      setState((prevState) => ({
        ...prevState,
        changed: true,
        image_file: [...prevState.image_file, ...files],
      }));
    }
  };

  const handleClick = () => {
    updateProduct({
      name: state.name,
      description: state.description,
    });
    setState((prevState) => ({ ...prevState, changed: false }));
  };

  const handleImageDelete = (file: File) => {
    setState((prevState) => ({
      ...prevState,
      image_file: prevState.image_file.filter((item) => item !== file),
    }));
  };

  const handleRef = (ref: HTMLInputElement | null) => {
    if (!ref) {
      return;
    }
    ref.onkeydown = (e) => {
      e.stopPropagation();
    };
  };

  return (
    <div>
      <div>
        <label className="block mr-4 font-bold text-[#34495e]">Name:</label>
        <input
          ref={handleRef}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
          required
        />
      </div>
      <div>
        <label className="block mr-4 font-bold text-[#34495e]">
          Description:
        </label>
        <input
          ref={handleRef}
          type="text"
          name="description"
          value={state.description}
          onChange={handleChange}
          className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm"
          required
        />
      </div>
      <div>
        <CurrencyInput className="w-full p-2.5 border border-[#bdc3c7] rounded-md text-sm" />
      </div>
      <div>
        <label className="block mr-4 font-bold text-[#34495e]">Images:</label>

        {state.image_file.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {state.image_file.map((file, index) => (
              <ImagePreview
                key={index}
                handleImageDelete={handleImageDelete}
                file={file}
                className="h-48"
              />
            ))}
          </div>
        )}

        <div>
          <label
            htmlFor="file"
            className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600"
          >
            Select image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            multiple
          />
        </div>
        <label>Upload file</label>
        <input
          type="submit"
          //  onClick={this.handleSubmitFile} value="Submit"
        />
      </div>
      <GreenButton
        className="rounded-md"
        type="button"
        onClick={handleClick}
        disabled={!state.changed}
      >
        Save changes
      </GreenButton>
    </div>
  );
};

export default ProductDetailFrame;
