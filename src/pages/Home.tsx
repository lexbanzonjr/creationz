import React, { useEffect, useState, useRef } from "react";
import BlueButton from "../components/BlueButton";
import ImageCarousel from "../components/ImageCarousel";

import { getImage as getImageApi } from "../api/binaryApi";
import { getCategories as getCateogiesApi } from "../api/categoryApi";
import { getProducts as getProductsApi } from "../api/productApi";
import { Category, Image, Product } from "../types/global";
import useCart from "./../hooks/useCart";
import { useAuth } from "../hooks/useAuthStore";

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<Record<string, Image>>({});
  const hasFetched = useRef(false);
  const { addItem: addItemToCart } = useCart();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const cats = await getCateogiesApi();
      const prods = await getProductsApi();
      setCategories(cats);
      setProducts(prods);
      setLoaded(true);

      // Fetch image data asynchronously
      const imagePromises = prods.flatMap((product) =>
        product.image_id.map((id) => getImageApi({ _id: id }))
      );
      const imageResults = await Promise.all(imagePromises);
      const imageMap = imageResults.reduce((acc, image) => {
        acc[image._id] = image;
        return acc;
      }, {} as Record<string, Image>);
      setImages(imageMap);
    };
    fetchData();
  }, []); // Empty dependency array

  return !loaded ? null : (
    <div>
      <section className="flex justify-center">
        <img src="/banner.jpg" alt="Banner" className="max-w-full h-auto" />
      </section>
      {/* Featured Products */}
      <>
        {categories.map((category) => {
          return (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {category.name}
              </h2>
              <div className="flex flex-wrap gap-4">
                {products.map((product) => {
                  if (product.category_id !== category._id) {
                    return null;
                  }
                  const productImages = product.image_id
                    .map((id) => images[id])
                    .filter((image): image is Image => image !== undefined);

                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-64"
                    >
                      <div className="flex-shrink-0">
                        <ImageCarousel
                          images={productImages}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <div className="mt-auto">
                          <p className="text-lg font-bold text-blue-600 mb-4">
                            ${product.cost.toFixed(2)}
                          </p>
                          <BlueButton
                            className="w-full"
                            onClick={() => {
                              addItemToCart({
                                accessToken: getAccessToken,
                                product: product,
                                quantity: 1,
                              });
                            }}
                          >
                            Add to Cart
                          </BlueButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Home;
