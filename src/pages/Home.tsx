import React, { useEffect, useState, useRef } from "react";
import BlueButton from "../components/BlueButton";
import ImageCarousel from "../components/ImageCarousel";

import { getBinary as getBinaryApi } from "../api/binaryApi";
import { getCategories as getCateogiesApi } from "../api/categoryApi";
import { getProducts as getProductsApi } from "../api/productApi";
import { Binary, Category, Product } from "../types/global";

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [binaries, setBinaries] = useState<Record<string, Binary>>({});
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const cats = await getCateogiesApi();
      const prods = await getProductsApi();
      setCategories(cats);
      setProducts(prods);
      setLoaded(true);

      // Fetch binary data asynchronously
      const binaryPromises = prods.flatMap((product) =>
        product.image_id.map((id) => getBinaryApi({ _id: id }))
      );
      const binaryResults = await Promise.all(binaryPromises);
      const binaryMap = binaryResults.reduce((acc, binary) => {
        acc[binary._id] = binary;
        return acc;
      }, {} as Record<string, Binary>);
      setBinaries(binaryMap);
    };
    fetchData();
  }, []); // Empty dependency array

  return !loaded ? null : (
    <div>
      <section>
        <img src="/banner.jpg" alt="Banner" />
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
                  const productBinaries = product.image_id
                    .map((id) => binaries[id])
                    .filter((binary): binary is Binary => binary !== undefined);

                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-64"
                    >
                      <div className="flex-shrink-0">
                        <ImageCarousel
                          binaries={productBinaries}
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
                          <BlueButton className="w-full">
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
