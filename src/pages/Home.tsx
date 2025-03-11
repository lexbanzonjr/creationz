import React, { useEffect, useState } from "react";
import BlueButton from "../components/BlueButton";
import { getCategories as getCateogiesApi } from "../api/categoryApi";
import { getProducts as getProductsApi } from "../api/productApi";
import { Category, Product } from "../types/global";

const Home: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getCateogiesApi());
      setProducts(await getProductsApi());
    };
    if (!loaded) {
      fetchData();
      setLoaded(true);
    }
  }, [loaded]);

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
                if (product.category_id !== category._id) return <></>;
                return (
                  <div>
                    {/* <img src={product.image_id} alt="Classic Tee" /> */}
                    <h3>{product.name}</h3>
                    <h4>{product.description}</h4>
                    <p>{product.cost}</p>
                    <BlueButton>Add to Cart</BlueButton>
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Home;
