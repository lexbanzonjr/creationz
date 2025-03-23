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
              <h2>{category.name}</h2>
              {products.map((product) => {
                if (product.category_id !== category._id) {
                  return <></>;
                }
                const productBinaries = product.image_id
                  .map((id) => binaries[id])
                  .filter((binary): binary is Binary => binary !== undefined);

                return productBinaries.length > 0 ? (
                  <div>
                    <ImageCarousel
                      binaries={productBinaries}
                      className="h-48"
                    />
                    <h3>{product.name}</h3>
                    <h4>{product.description}</h4>
                    <p>{product.cost}</p>
                    <BlueButton>Add to Cart</BlueButton>
                  </div>
                ) : null;
              })}
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Home;
