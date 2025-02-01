import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Binary } from "../types/global";
import ImagePreview from "./ImagePreview";
import { blankBinary } from "../types/blank";

export interface ImageListEditorProps {
  images: Binary[];
  onChange?: (props: ImageListEditorOnChangeProps) => void;
}

export interface ImageListEditorHandle {
  getImages?: () => {
    current_images: Binary[];
    new_images: Binary[];
    remove_images: Binary[];
  };
}

export interface ImageListEditorOnChangeProps {
  current_images: Binary[];
  new_images: Binary[];
  remove_images: Binary[];
}

const ImageListEditor = forwardRef<ImageListEditorHandle, ImageListEditorProps>(
  ({ images: currImages = [], onChange = null }, ref) => {
    const [state, setState] = useState<{
      loaded: boolean;
      images: {
        current_images: Binary[];
        new_images: Binary[];
        remove_images: Binary[];
      };
    }>({
      loaded: false,
      images: { current_images: currImages, new_images: [], remove_images: [] },
    });

    useEffect(() => {
      if (!state.loaded) {
        setState((prevState) => ({
          ...prevState,
          loaded: true,
          images: { ...prevState.images, current_images: currImages },
        }));
      }
    }, [currImages, state.loaded]);

    useImperativeHandle(ref, () => ({
      getImages: () => {
        return state.images;
      },
    }));

    const handleImageDelete = (binary: Binary) => {
      // If id doesn't exist, then the image is in the new_images list
      if ("" === binary._id) {
        setState((prevState) => ({
          ...prevState,
          changed: true,
          images: {
            ...prevState.images,
            current_images: prevState.images.current_images.filter(
              (b) => b !== binary
            ),
            new_images: prevState.images.new_images.filter((b) => b !== binary),
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          changed: true,
          images: {
            ...prevState.images,
            current_images: prevState.images.current_images.filter(
              (b) => b !== binary
            ),
            remove_images: [...prevState.images.remove_images, binary],
          },
        }));
      }

      if (onChange) {
        onChange(state.images);
      }
    };

    return !state.loaded ? null : (
      <div>
        <label className="block mr-4 font-bold text-[#34495e]" htmlFor="images">
          Images:
        </label>

        {(state.images.current_images.length > 0 ||
          state.images.new_images.length > 0) && (
          <div className="flex flex-wrap gap-4">
            {state.images.current_images.map((binary) => (
              <ImagePreview
                binary={binary}
                className="h-48"
                id="images"
                key={binary._id}
                onImageDelete={handleImageDelete}
              />
            ))}
            {state.images.new_images.map((binary) => (
              <ImagePreview
                key={binary._id}
                onImageDelete={handleImageDelete}
                binary={binary}
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
            Select images
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={(param: React.ChangeEvent<HTMLInputElement>) => {
              if (param.target.files?.length! <= 0) {
                return;
              }

              const newFiles: Binary[] = [];
              const files = Array.from(param.target.files!);
              files.forEach((file) => {
                let binary = { ...blankBinary };
                binary.data = file;
                binary.name = file.name;
                binary["content-type"] = file.type;
                newFiles.push(binary);
              });

              setState((prevState) => ({
                ...prevState,
                changed: true,
                images: {
                  ...prevState.images,
                  new_images: [...prevState.images.new_images, ...newFiles],
                },
              }));

              if (onChange) {
                onChange(state.images);
              }
            }}
            multiple
          />
        </div>
      </div>
    );
  }
);

export default ImageListEditor;
