import { useEffect, useRef, useState } from "react";
import GreenButton from "../../components/GreenButton";
import { Binary, Product } from "../../types/global";
import CurrencyInput from "../../components/CurrencyInput";
import useStore from "../../hooks/useAdminStore";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../../components/TextInput";
import Dropdown from "../../components/Dropdown";
import ImageListEditor, {
  ImageListEditorHandle,
} from "../../components/ImageListEditor";

const ProductDetailFrame = ({
  product,
  show,
  updateProduct,
}: {
  product: Product;
  show: boolean;
  updateProduct: (product: Product) => Promise<void>;
}) => {
  const [state, setState] = useState<{
    fetch: boolean;
    changed: boolean;
    product: Product;
    images: Binary[];
    new_images: Binary[];
    remove_images: Binary[];
  }>({
    fetch: false,
    changed: false,
    product,
    images: [],
    new_images: [],
    remove_images: [],
  });
  const { categories, addBinary, deleteBinary, getBinary } = useStore();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const goFetch = async () => {
      const images: Binary[] = [];

      for (const id of state.product.image_id) {
        images.push(await getBinary(getAccessToken, id));
      }
      setState((prevState) => ({ ...prevState, fetch: true, images }));
    };
    if (!state.fetch && show) {
      // clear out the lists
      setState((prevState) => ({
        ...prevState,
        images: [],
        new_images: [],
        remove_images: [],
      }));
      goFetch();
    }
  }, [state.fetch, state.product.image_id, show, getBinary, getAccessToken]);
  const imageRef = useRef<ImageListEditorHandle>(null);

  return !state.fetch ? null : (
    <div>
      <TextInput
        label="Name:"
        name="name"
        required
        value={state.product.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState((prevState) => ({
            ...prevState,
            changed: true,
            product: { ...prevState.product, name: e.target.value },
          }));
        }}
      />
      <Dropdown
        items={categories.map((category) => {
          return {
            key: category._id,
            value: category._id,
            text: category.name,
          };
        })}
        label="Category:"
        name="category"
        value={() => state.product.category_id ?? ""}
        onValueChange={(value: string) => {
          setState((prevState) => ({
            ...prevState,
            changed: true,
            product: { ...prevState.product, category_id: value },
          }));
        }}
      />
      <TextInput
        label="Description:"
        name="description"
        value={state.product.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setState((prevState) => ({
            ...prevState,
            changed: true,
            product: { ...prevState.product, description: e.target.value },
          }));
        }}
      />
      <div>
        <CurrencyInput
          name="cost"
          value={String(state.product.cost)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
              ...prevState,
              changed: true,
              product: {
                ...product,
                cost: Number(
                  Number(e.target.value.replace(/[^0-9.]/g, "")).toFixed(2)
                ),
              },
            }));
          }}
        />
      </div>
      <ImageListEditor
        images={state.images}
        ref={imageRef}
        onChange={() => {
          setState((prevState) => ({
            ...prevState,
            changed: true,
          }));
        }}
      />
      <GreenButton
        className="rounded-md"
        disabled={!state.changed}
        name="save changes"
        type="button"
        onClick={async () => {
          // Copy product
          const saveProduct = { ...state.product };

          const images = imageRef.current?.getImages?.();

          // Delete images from remove list
          for (const binary of images!.remove_images) {
            await deleteBinary(getAccessToken, binary);

            // Remove binary
            saveProduct.image_id = saveProduct.image_id.filter(
              (ids) => ids !== binary._id
            );
          }

          // Save all new images
          for (const binary of images!.new_images) {
            const newBinary = await addBinary(getAccessToken, binary);

            // Add binary
            saveProduct.image_id.push(newBinary._id);
          }

          // Set category_id to undefined if it is empty
          if (saveProduct.category_id === "") {
            saveProduct.category_id = null;
          }

          await updateProduct(saveProduct);
          setState((prevState) => ({
            ...prevState,
            product: saveProduct,
            changed: false,
            fetch: false,
          }));
        }}
      >
        Save changes
      </GreenButton>
    </div>
  );
};

export default ProductDetailFrame;
